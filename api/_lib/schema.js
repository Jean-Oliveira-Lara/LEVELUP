// Schema do banco (Neon / Postgres). Tudo usa IF NOT EXISTS: pode rodar quantas vezes quiser.
// A API aplica automaticamente na primeira requisição de cada instância.

export const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS users (
      id            SERIAL PRIMARY KEY,
      email         TEXT NOT NULL UNIQUE,
      name          TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      start_date    DATE NOT NULL DEFAULT CURRENT_DATE,  -- dia 1 do intensivo
      created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
  `CREATE TABLE IF NOT EXISTS day_logs (
      user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      day        DATE NOT NULL,
      done       TEXT[] NOT NULL DEFAULT '{}',   -- ids das tarefas concluídas
      minutes    INTEGER NOT NULL DEFAULT 0,     -- minutos somados das tarefas concluídas
      note       TEXT,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      PRIMARY KEY (user_id, day)
  )`,
  `CREATE TABLE IF NOT EXISTS cards (
      id            SERIAL PRIMARY KEY,
      user_id       INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      front         TEXT NOT NULL,          -- palavra/expressão em inglês
      back          TEXT NOT NULL,          -- significado em português
      example       TEXT,                   -- frase onde a palavra apareceu
      source        TEXT,                   -- de onde veio (série, podcast...)
      starter_index INTEGER,                -- posição no pacote inicial (null = palavra própria)
      ease          REAL NOT NULL DEFAULT 2.5,
      interval_days INTEGER NOT NULL DEFAULT 0,
      reps          INTEGER NOT NULL DEFAULT 0,
      lapses        INTEGER NOT NULL DEFAULT 0,
      due           DATE NOT NULL DEFAULT CURRENT_DATE,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE (user_id, starter_index)
  )`,
  `CREATE INDEX IF NOT EXISTS cards_user_due_idx ON cards (user_id, due)`,
  `CREATE TABLE IF NOT EXISTS reviews (
      id          SERIAL PRIMARY KEY,
      user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      card_id     INTEGER NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
      grade       SMALLINT NOT NULL,        -- 0 errei, 3 difícil, 4 bom, 5 fácil
      day         DATE NOT NULL,
      reviewed_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
  `CREATE INDEX IF NOT EXISTS reviews_user_day_idx ON reviews (user_id, day)`,
  `CREATE TABLE IF NOT EXISTS grammar_results (
      user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      topic_id   TEXT NOT NULL,
      best       INTEGER NOT NULL,
      last       INTEGER NOT NULL,
      total      INTEGER NOT NULL,
      attempts   INTEGER NOT NULL DEFAULT 1,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      PRIMARY KEY (user_id, topic_id)
  )`,
  `CREATE TABLE IF NOT EXISTS level_tests (
      id         SERIAL PRIMARY KEY,
      user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      day        DATE NOT NULL,
      week       INTEGER NOT NULL,
      level      TEXT NOT NULL,             -- A2, B1, B1+, B2...
      notes      TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
]
