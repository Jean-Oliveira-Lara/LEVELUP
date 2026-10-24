import { getUserId } from './auth.js'
import { ensureSchema } from './db.js'

export class HttpError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

export function send(res, status, data) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(data))
}

export function body(req) {
  if (!req.body) return {}
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      throw new HttpError(400, 'JSON inválido')
    }
  }
  return req.body
}

export function query(req) {
  if (req.query) return req.query
  const url = new URL(req.url, 'http://localhost')
  return Object.fromEntries(url.searchParams)
}

const DAY_RE = /^\d{4}-\d{2}-\d{2}$/

// O app manda o "hoje" no fuso do aparelho, para o dia virar à meia-noite local.
export function requireDay(value) {
  if (typeof value !== 'string' || !DAY_RE.test(value) || Number.isNaN(Date.parse(value))) {
    throw new HttpError(400, 'Data inválida (use AAAA-MM-DD)')
  }
  return value
}

/**
 * Monta um handler a partir de um mapa { GET: fn, POST: fn }.
 * Com { auth: true }, a função recebe o id do usuário logado.
 */
export function route(handlers, { auth = true } = {}) {
  return async function handler(req, res) {
    try {
      const fn = handlers[req.method]
      if (!fn) throw new HttpError(405, 'Método não permitido')
      await ensureSchema()
      let userId = null
      if (auth) {
        userId = await getUserId(req)
        if (!userId) throw new HttpError(401, 'Faça login para continuar')
      }
      const result = await fn({ req, res, userId, body: body(req), query: query(req) })
      if (!res.writableEnded) send(res, 200, result ?? { ok: true })
    } catch (err) {
      if (err instanceof HttpError) return send(res, err.status, { error: err.message })
      console.error(err)
      send(res, 500, { error: 'Erro interno. Tente de novo.' })
    }
  }
}
