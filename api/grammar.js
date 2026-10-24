import { db } from './_lib/db.js'
import { HttpError, route } from './_lib/http.js'
import { ALL_TOPICS } from '../shared/grammar.js'

const TOPIC_IDS = new Set(ALL_TOPICS.map((t) => t.id))

export default route({
  async GET({ userId }) {
    const results = await db()`
      SELECT topic_id, best, last, total, attempts FROM grammar_results WHERE user_id = ${userId}
    `
    return { results }
  },

  // Salva o resultado de uma rodada de exercícios: { topicId, correct, total }
  async POST({ userId, body }) {
    const topicId = String(body.topicId || '')
    const correct = Number(body.correct)
    const total = Number(body.total)
    if (!TOPIC_IDS.has(topicId)) throw new HttpError(400, 'Tema desconhecido')
    if (!Number.isInteger(total) || total < 1 || !Number.isInteger(correct) || correct < 0 || correct > total) {
      throw new HttpError(400, 'Resultado inválido')
    }
    const [result] = await db()`
      INSERT INTO grammar_results (user_id, topic_id, best, last, total)
      VALUES (${userId}, ${topicId}, ${correct}, ${correct}, ${total})
      ON CONFLICT (user_id, topic_id) DO UPDATE SET
        best = GREATEST(grammar_results.best, EXCLUDED.last),
        last = EXCLUDED.last,
        total = EXCLUDED.total,
        attempts = grammar_results.attempts + 1,
        updated_at = now()
      RETURNING topic_id, best, last, total, attempts
    `
    return { result }
  },
})
