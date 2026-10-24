// Cria as tabelas no banco apontado por DATABASE_URL.
// A API já faz isso sozinha na primeira requisição; este script é para rodar à mão se quiser.
// Uso: DATABASE_URL=... npm run db:schema
import { neon } from '@neondatabase/serverless'
import { SCHEMA } from '../api/_lib/schema.js'

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL
if (!url) {
  console.error('Defina DATABASE_URL antes de rodar.')
  process.exit(1)
}

const sql = neon(url)
for (const statement of SCHEMA) await sql.query(statement)
console.log(`Schema aplicado (${SCHEMA.length} comandos).`)
