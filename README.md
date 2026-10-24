# LEVELUP — Intensivão de inglês

App (PWA) para um intensivo de inglês de **4 horas por dia durante 16 semanas**, do básico (A2) à conversação (B2).
O app não tenta ser um curso: ele mantém o ritmo do plano e cuida da revisão de vocabulário. O conteúdo vem de séries, podcasts e conversas.

## Telas

- **Hoje** — os 3 blocos do dia (manhã 1h, tarde 1h, noite 2h; domingo mais leve), checklist com timer, sequência de dias e prompts prontos para praticar conversação com o Claude.
- **Revisão** — flashcards com repetição espaçada (SM-2), pronúncia pela voz do aparelho, pacote inicial de 300 palavras (lotes de 10) e cadastro das palavras que você encontrar.
- **Gramática** — um tema por semana (15 temas + revisão geral na semana 16), explicação curta em português e exercícios.
- **Progresso** — horas estudadas, sequência, gráfico dos últimos 14 dias, jornada de 16 semanas e teste de nível a cada 4 semanas.

## Stack

- React 19 + Vite (PWA instalável no celular)
- Funções serverless da Vercel em `/api`
- Postgres no [Neon](https://neon.tech) com `@neondatabase/serverless`
- Login com e-mail e senha (bcrypt + JWT em cookie httpOnly)

## Estrutura

```
api/            funções da Vercel (auth, day, cards, grammar, progress)
api/_lib/       conexão com o banco, sessão e helpers HTTP
shared/         plano do intensivo, algoritmo de revisão, gramática e vocabulário (usado pelo app e pela API)
src/            app React
db/schema.sql   tabelas do banco
tests/          testes da lógica (npm test)
```

## Rodando

1. Crie um banco no Neon e copie a connection string.
2. Copie `.env.example` para `.env` e preencha `DATABASE_URL` e `AUTH_SECRET`.
3. Crie as tabelas: `npm run db:schema`
4. Rode com a Vercel CLI (sobe o app e as funções juntos): `npx vercel dev`

## Deploy

Projeto ligado ao GitHub na Vercel: cada push na `main` publica. Variáveis necessárias na Vercel: `DATABASE_URL` e `AUTH_SECRET`.
