import { SignJWT, jwtVerify } from 'jose'

const COOKIE = 'lu_session'
const MAX_AGE = 60 * 60 * 24 * 60 // 60 dias

function secret() {
  const value = process.env.AUTH_SECRET
  if (!value || value.length < 32) throw new Error('AUTH_SECRET ausente ou curto demais')
  return new TextEncoder().encode(value)
}

function readCookie(req, name) {
  const header = req.headers?.cookie || ''
  for (const part of header.split(';')) {
    const [key, ...rest] = part.trim().split('=')
    if (key === name) return decodeURIComponent(rest.join('='))
  }
  return null
}

export async function getUserId(req) {
  const token = readCookie(req, COOKIE)
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secret())
    const id = Number(payload.sub)
    return Number.isInteger(id) ? id : null
  } catch {
    return null
  }
}

function cookieFlags(req) {
  const host = req.headers?.host || ''
  const local = host.startsWith('localhost') || host.startsWith('127.0.0.1')
  return `Path=/; HttpOnly; SameSite=Lax${local ? '' : '; Secure'}`
}

export async function startSession(req, res, userId) {
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(String(userId))
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret())
  res.setHeader('Set-Cookie', `${COOKIE}=${token}; Max-Age=${MAX_AGE}; ${cookieFlags(req)}`)
}

export function endSession(req, res) {
  res.setHeader('Set-Cookie', `${COOKIE}=; Max-Age=0; ${cookieFlags(req)}`)
}
