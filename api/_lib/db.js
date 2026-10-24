import { neon } from '@neondatabase/serverless'

let client

// Conexão HTTP do Neon: ideal para funções serverless (sem pool para gerenciar).
export function db() {
  if (!client) {
    if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL não configurada')
    client = neon(process.env.DATABASE_URL)
  }
  return client
}
