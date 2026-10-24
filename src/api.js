// Cliente da API: sempre JSON, cookies de sessão incluídos.

export class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

async function request(method, path, data) {
  let res
  try {
    res = await fetch(`/api/${path}`, {
      method,
      credentials: 'same-origin',
      headers: data ? { 'Content-Type': 'application/json' } : undefined,
      body: data ? JSON.stringify(data) : undefined,
    })
  } catch {
    throw new ApiError(0, 'Sem conexão. Verifique sua internet.')
  }
  let payload = {}
  try {
    payload = await res.json()
  } catch {
    // resposta sem JSON
  }
  if (!res.ok) throw new ApiError(res.status, payload.error || 'Algo deu errado.')
  return payload
}

export const api = {
  get: (path) => request('GET', path),
  post: (path, data) => request('POST', path, data ?? {}),
  patch: (path, data) => request('PATCH', path, data ?? {}),
  del: (path) => request('DELETE', path),
}
