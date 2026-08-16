-- ==========================================================
-- LevelUp — Migração Etapa 3 (banco de dados)
-- Rode este script no SQL Editor do seu projeto Supabase.
-- Ele é seguro para rodar mais de uma vez (usa IF NOT EXISTS).
-- ==========================================================

-- 1) PROFILES: campo que faltava para calcular streak corretamente
alter table public.profiles
  add column if not exists last_study_date date;

-- 2) TASKS: campos para diferenciar missão automática de tarefa manual
--    e para conseguirmos gerar as missões do dia sem duplicar.
alter table public.tasks
  add column if not exists type text default 'custom';

alter table public.tasks
  add column if not exists mission_date date default current_date;

-- 3) ACTIVITY_COMPLETIONS: histórico de toda atividade de inglês concluída.
--    Usado pelas Estatísticas (Etapa 8) e para o cálculo de streak/XP.
create table if not exists public.activity_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  activity_type text not null, -- 'vocabulary' | 'reading' | 'listening' | 'writing' | 'speaking' | 'task'
  source text,                 -- ex: 'lesson:1', 'reading:1', 'task:<id>'
  xp_earned integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.activity_completions enable row level security;

drop policy if exists "activity_completions_select_own" on public.activity_completions;
create policy "activity_completions_select_own"
  on public.activity_completions for select
  using (auth.uid() = user_id);

drop policy if exists "activity_completions_insert_own" on public.activity_completions;
create policy "activity_completions_insert_own"
  on public.activity_completions for insert
  with check (auth.uid() = user_id);

create index if not exists activity_completions_user_id_idx
  on public.activity_completions (user_id, created_at desc);

-- 4) GOALS: metas do usuário (Etapa 8 usa, mas já deixamos pronto).
create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  target integer not null,
  progress integer not null default 0,
  unit text default 'unidades', -- ex: 'palavras', 'dias', 'horas'
  completed boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.goals enable row level security;

drop policy if exists "goals_select_own" on public.goals;
create policy "goals_select_own"
  on public.goals for select
  using (auth.uid() = user_id);

drop policy if exists "goals_modify_own" on public.goals;
create policy "goals_modify_own"
  on public.goals for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Verifique se RLS de "tasks" e "profiles" já está habilitado.
-- Se ainda não estiver, rode também:
-- alter table public.tasks enable row level security;
-- create policy "tasks_select_own" on public.tasks for select using (auth.uid() = user_id);
-- create policy "tasks_modify_own" on public.tasks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
-- alter table public.profiles enable row level security;
-- create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
-- create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
