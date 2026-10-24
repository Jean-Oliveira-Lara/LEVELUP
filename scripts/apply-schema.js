// Aplica db/schema.sql no banco apontado por DATABASE_URL.
// Uso: DATABASE_URL=... npm run db:schema
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) {
  console.error('Defina DATABASE_URL antes de rodar.')
  process.exit(1)
}

const sql = neon(process.env.DATABASE_URL)
const file = fileURLToPath(new URL('../db/schema.sql', import.meta.url))
const statements = readFileSync(file, 'utf8')
  .split('\n')
  .filter((line) => !line.trim().startsWith('--'))
  .join('\n')
  .split(';')
  .map((s) => s.trim())
  .filter(Boolean)

for (const statement of statements) {
  await sql.query(statement)
}
console.log(`Schema aplicado (${statements.length} comandos).`)
