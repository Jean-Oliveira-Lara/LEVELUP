import { db } from './_lib/db.js'
import { HttpError, requireDay, route } from './_lib/http.js'
import { addDays, schedule } from '../shared/srs.js'
import { STARTER_WORDS } from '../shared/starterWords.js'

const CARD_FIELDS = 'id, front, back, example, source, starter_index, ease, interval_days, reps, lapses, due::text AS due'

function clean(value, max) {
  const text = String(value ?? '').trim()
  return text ? text.slice(0, max) : null
}

async function counts(userId, day) {
  const [row] = await db()`
    SELECT
      COUNT(*) FILTER (WHERE due <= ${day})::int AS due,
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE starter_index IS NOT NULL)::int AS starter,
      COUNT(*) FILTER (WHERE created_at::date = ${day}::date)::int AS added_today
    FROM cards WHERE user_id = ${userId}
  `
  return { ...row, starterTotal: STARTER_WORDS.length }
}

async function addStarter(userId, day, count) {
  const n = Math.min(Math.max(Number(count) || 10, 1), 30)
  const used = await db()`
    SELECT starter_index FROM cards WHERE user_id = ${userId} AND starter_index IS NOT NULL
  `
  const taken = new Set(used.map((r) => r.starter_index))
  const next = []
  for (let i = 0; i < STARTER_WORDS.length && next.length < n; i++) {
    if (!taken.has(i)) next.push(i)
  }
  if (!next.length) throw new HttpError(409, 'Você já adicionou todo o pacote inicial. Agora é com as suas palavras!')

  const fronts = next.map((i) => STARTER_WORDS[i][0])
  const backs = next.map((i) => STARTER_WORDS[i][1])
  const examples = next.map((i) => STARTER_WORDS[i][2])
  const added = await db()`
    INSERT INTO cards (user_id, front, back, example, source, starter_index, due)
    SELECT ${userId}, f, b, e, 'Pacote inicial', i, ${day}::date
    FROM unnest(${fronts}::text[], ${backs}::text[], ${examples}::text[], ${next}::int[]) AS t(f, b, e, i)
    ON CONFLICT (user_id, starter_index) DO NOTHING
    RETURNING id
  `
  return added.length
}

export default route({
  async GET({ userId, query }) {
    const day = requireDay(query.day)
    if (query.view === 'all') {
      const cards = await db()`
        SELECT ${db().unsafe(CARD_FIELDS)} FROM cards
        WHERE user_id = ${userId}
        ORDER BY created_at DESC, id DESC
        LIMIT 1000
      `
      return { cards, counts: await counts(userId, day) }
    }
    const cards = await db()`
      SELECT ${db().unsafe(CARD_FIELDS)} FROM cards
      WHERE user_id = ${userId} AND due <= ${day}
      ORDER BY due, reps DESC, id
      LIMIT 300
    `
    return { cards, counts: await counts(userId, day) }
  },

  async POST({ userId, body, query }) {
    const day = requireDay(body.day)
    const action = query.action

    if (action === 'add') {
      const front = clean(body.front, 200)
      const back = clean(body.back, 300)
      if (!front || !back) throw new HttpError(400, 'Preencha a palavra e o significado')
      const [card] = await db()`
        INSERT INTO cards (user_id, front, back, example, source, due)
        VALUES (${userId}, ${front}, ${back}, ${clean(body.example, 500)}, ${clean(body.source, 120)}, ${day})
        RETURNING ${db().unsafe(CARD_FIELDS)}
      `
      return { card, counts: await counts(userId, day) }
    }

    if (action === 'starter') {
      const added = await addStarter(userId, day, body.count)
      return { added, counts: await counts(userId, day) }
    }

    if (action === 'review') {
      const grade = Number(body.grade)
      const [card] = await db()`
        SELECT ease, interval_days, reps, lapses FROM cards WHERE id = ${body.cardId} AND user_id = ${userId}
      `
      if (!card) throw new HttpError(404, 'Card não encontrado')
      let next
      try {
        next = schedule(card, grade)
      } catch {
        throw new HttpError(400, 'Nota inválida')
      }
      const due = addDays(day, next.interval_days)
      const [updated] = await db()`
        UPDATE cards SET ease = ${next.ease}, interval_days = ${next.interval_days},
          reps = ${next.reps}, lapses = ${next.lapses}, due = ${due}
        WHERE id = ${body.cardId} AND user_id = ${userId}
        RETURNING ${db().unsafe(CARD_FIELDS)}
      `
      await db()`
        INSERT INTO reviews (user_id, card_id, grade, day) VALUES (${userId}, ${body.cardId}, ${grade}, ${day})
      `
      return { card: updated }
    }

    throw new HttpError(400, 'Ação desconhecida')
  },

  async PATCH({ userId, body }) {
    const front = clean(body.front, 200)
    const back = clean(body.back, 300)
    if (!front || !back) throw new HttpError(400, 'Preencha a palavra e o significado')
    const [card] = await db()`
      UPDATE cards SET front = ${front}, back = ${back}, example = ${clean(body.example, 500)}
      WHERE id = ${body.id} AND user_id = ${userId}
      RETURNING ${db().unsafe(CARD_FIELDS)}
    `
    if (!card) throw new HttpError(404, 'Card não encontrado')
    return { card }
  },

  async DELETE({ userId, query }) {
    const rows = await db()`DELETE FROM cards WHERE id = ${query.id} AND user_id = ${userId} RETURNING id`
    if (!rows.length) throw new HttpError(404, 'Card não encontrado')
    return { ok: true }
  },
})
