import { neon } from '@neondatabase/serverless'
import { SCHEMA } from './schema.js'

let client
let schemaReady

// Conexão HTTP do Neon: ideal para funções serverless (sem pool para gerenciar).
// Aceita DATABASE_URL (padrão) ou POSTGRES_URL (nome usado por algumas integrações).
export function db() {
  if (!client) {
    const url = process.env.DATABASE_URL || process.env.POSTGRES_URL
    if (!url) throw new Error('DATABASE_URL não configurada')
    client = neon(url)
  }
  return client
}

/** Cria as tabelas na primeira requisição de cada instância (comandos idempotentes). */
export function ensureSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      for (const statement of SCHEMA) await db().query(statement)
    })().catch((err) => {
      schemaReady = null
      throw err
    })
  }
  return schemaReady
}
