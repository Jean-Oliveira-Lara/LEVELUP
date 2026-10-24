import bcrypt from 'bcryptjs'
import { db } from './_lib/db.js'
import { endSession, getUserId, startSession } from './_lib/auth.js'
import { HttpError, requireDay, route } from './_lib/http.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function loadUser(id) {
  const [user] = await db()`
    SELECT id, email, name, start_date::text AS start_date FROM users WHERE id = ${id}
  `
  return user ?? null
}

async function register({ req, res, body }) {
  const email = String(body.email || '').trim().toLowerCase()
  const name = String(body.name || '').trim()
  const password = String(body.password || '')
  if (!EMAIL_RE.test(email)) throw new HttpError(400, 'E-mail inválido')
  if (name.length < 2) throw new HttpError(400, 'Digite seu nome')
  if (password.length < 8) throw new HttpError(400, 'A senha precisa ter pelo menos 8 caracteres')
  const startDate = body.startDate ? requireDay(body.startDate) : null

  const hash = await bcrypt.hash(password, 10)
  const rows = await db()`
    INSERT INTO users (email, name, password_hash, start_date)
    VALUES (${email}, ${name}, ${hash}, COALESCE(${startDate}::date, CURRENT_DATE))
    ON CONFLICT (email) DO NOTHING
    RETURNING id
  `
  if (!rows.length) throw new HttpError(409, 'Esse e-mail já tem conta. Faça login.')
  await startSession(req, res, rows[0].id)
  return { user: await loadUser(rows[0].id) }
}

async function login({ req, res, body }) {
  const email = String(body.email || '').trim().toLowerCase()
  const password = String(body.password || '')
  const [row] = await db()`SELECT id, password_hash FROM users WHERE email = ${email}`
  const ok = row && (await bcrypt.compare(password, row.password_hash))
  if (!ok) throw new HttpError(401, 'E-mail ou senha incorretos')
  await startSession(req, res, row.id)
  return { user: await loadUser(row.id) }
}

export default route(
  {
    async GET({ req }) {
      const id = await getUserId(req)
      const user = id ? await loadUser(id) : null
      if (!user) throw new HttpError(401, 'Sem sessão')
      return { user }
    },

    async POST(ctx) {
      const action = ctx.query.action
      if (action === 'register') return register(ctx)
      if (action === 'login') return login(ctx)
      if (action === 'logout') {
        endSession(ctx.req, ctx.res)
        return { ok: true }
      }
      throw new HttpError(400, 'Ação desconhecida')
    },

    // Atualiza nome ou data de início do intensivo
    async PATCH({ req, body }) {
      const id = await getUserId(req)
      if (!id) throw new HttpError(401, 'Faça login para continuar')
      const name = body.name !== undefined ? String(body.name).trim() : null
      const startDate = body.startDate !== undefined ? requireDay(body.startDate) : null
      if (name !== null && name.length < 2) throw new HttpError(400, 'Nome curto demais')
      await db()`
        UPDATE users SET
          name = COALESCE(${name}, name),
          start_date = COALESCE(${startDate}::date, start_date)
        WHERE id = ${id}
      `
      return { user: await loadUser(id) }
    },
  },
  { auth: false },
)
