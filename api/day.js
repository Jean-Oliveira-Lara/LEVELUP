import { db } from './_lib/db.js'
import { HttpError, requireDay, route } from './_lib/http.js'
import { dayPlan, minutesFor } from '../shared/plan.js'

async function startDateOf(userId) {
  const [row] = await db()`SELECT start_date::text AS start_date FROM users WHERE id = ${userId}`
  return row.start_date
}

async function loadLog(userId, day) {
  const [log] = await db()`
    SELECT done, minutes, note FROM day_logs WHERE user_id = ${userId} AND day = ${day}
  `
  return log ?? { done: [], minutes: 0, note: null }
}

export default route({
  // Registro do dia: tarefas feitas e minutos
  async GET({ userId, query }) {
    const day = requireDay(query.day)
    return { day, ...(await loadLog(userId, day)) }
  },

  // Marca/desmarca uma tarefa: { day, taskId, done }
  async POST({ userId, body }) {
    const day = requireDay(body.day)
    const startDate = await startDateOf(userId)
    const plan = dayPlan(startDate, day)
    const valid = new Set(plan.blocks.flatMap((b) => b.tasks.map((t) => t.id)))
    if (!valid.has(body.taskId)) throw new HttpError(400, 'Tarefa não faz parte do plano desse dia')

    const current = new Set((await loadLog(userId, day)).done)
    if (body.done) current.add(body.taskId)
    else current.delete(body.taskId)
    const done = [...current].filter((id) => valid.has(id))
    const minutes = minutesFor(startDate, day, done)

    const [log] = await db()`
      INSERT INTO day_logs (user_id, day, done, minutes, updated_at)
      VALUES (${userId}, ${day}, ${done}, ${minutes}, now())
      ON CONFLICT (user_id, day) DO UPDATE
        SET done = EXCLUDED.done, minutes = EXCLUDED.minutes, updated_at = now()
      RETURNING done, minutes, note
    `
    return { day, ...log }
  },
})
