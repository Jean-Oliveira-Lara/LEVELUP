import { db } from './_lib/db.js'
import { HttpError, requireDay, route } from './_lib/http.js'
import { addDays } from '../shared/srs.js'
import { DAILY_GOAL_MINUTES } from '../shared/plan.js'
import { weekNumber } from '../shared/dates.js'

const LEVELS = ['A1', 'A2', 'A2+', 'B1', 'B1+', 'B2', 'B2+', 'C1', 'C2']

/** Dias seguidos com estudo, terminando hoje (ou ontem, se hoje ainda não começou). */
export function computeStreak(studiedDays, today) {
  const set = new Set(studiedDays)
  let cursor = set.has(today) ? today : addDays(today, -1)
  let streak = 0
  while (set.has(cursor)) {
    streak += 1
    cursor = addDays(cursor, -1)
  }
  return streak
}

export function bestStreak(studiedDays) {
  const sorted = [...new Set(studiedDays)].sort()
  let best = 0
  let run = 0
  let prev = null
  for (const day of sorted) {
    run = prev && addDays(prev, 1) === day ? run + 1 : 1
    best = Math.max(best, run)
    prev = day
  }
  return best
}

export default route({
  async GET({ userId, query }) {
    const today = requireDay(query.day)
    const sql = db()

    const [[user], logs, [cards], [reviewsToday], grammar, tests] = await Promise.all([
      sql`SELECT start_date::text AS start_date FROM users WHERE id = ${userId}`,
      sql`SELECT day::text AS day, minutes, cardinality(done)::int AS tasks
          FROM day_logs WHERE user_id = ${userId} AND minutes > 0 ORDER BY day`,
      sql`SELECT COUNT(*)::int AS total,
                 COUNT(*) FILTER (WHERE interval_days >= 21)::int AS mastered,
                 COUNT(*) FILTER (WHERE reps > 0)::int AS learning,
                 COUNT(*) FILTER (WHERE due <= ${today})::int AS due
          FROM cards WHERE user_id = ${userId}`,
      sql`SELECT COUNT(*)::int AS count FROM reviews WHERE user_id = ${userId} AND day = ${today}`,
      sql`SELECT COUNT(*)::int AS topics, COALESCE(SUM(best), 0)::int AS correct, COALESCE(SUM(total), 0)::int AS total
          FROM grammar_results WHERE user_id = ${userId}`,
      sql`SELECT id, day::text AS day, week, level, notes FROM level_tests WHERE user_id = ${userId} ORDER BY day DESC, id DESC`,
    ])

    const studied = logs.map((l) => l.day)
    const totalMinutes = logs.reduce((s, l) => s + l.minutes, 0)
    const byDay = new Map(logs.map((l) => [l.day, l.minutes]))

    // Últimos 14 dias para o gráfico
    const last14 = Array.from({ length: 14 }, (_, i) => {
      const day = addDays(today, i - 13)
      return { day, minutes: byDay.get(day) ?? 0 }
    })

    return {
      startDate: user.start_date,
      week: weekNumber(user.start_date, today),
      streak: computeStreak(studied, today),
      bestStreak: bestStreak(studied),
      daysStudied: studied.length,
      fullDays: logs.filter((l) => l.minutes >= DAILY_GOAL_MINUTES).length,
      totalMinutes,
      todayMinutes: byDay.get(today) ?? 0,
      last14,
      cards: { ...cards, reviewsToday: reviewsToday.count },
      grammar: grammar[0],
      tests,
    }
  },

  // Registra o resultado do teste de nível: { day, level, notes }
  async POST({ userId, body }) {
    const day = requireDay(body.day)
    const level = String(body.level || '').trim().toUpperCase()
    if (!LEVELS.includes(level)) throw new HttpError(400, `Nível inválido. Use: ${LEVELS.join(', ')}`)
    const notes = String(body.notes || '').trim().slice(0, 2000) || null
    const [user] = await db()`SELECT start_date::text AS start_date FROM users WHERE id = ${userId}`
    const week = weekNumber(user.start_date, day)
    const [test] = await db()`
      INSERT INTO level_tests (user_id, day, week, level, notes)
      VALUES (${userId}, ${day}, ${week}, ${level}, ${notes})
      RETURNING id, day::text AS day, week, level, notes
    `
    return { test }
  },

  async DELETE({ userId, query }) {
    const rows = await db()`DELETE FROM level_tests WHERE id = ${query.id} AND user_id = ${userId} RETURNING id`
    if (!rows.length) throw new HttpError(404, 'Teste não encontrado')
    return { ok: true }
  },
})
