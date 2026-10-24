// O plano do intensivo: fases, blocos do dia e tarefas.
// Fica em /shared porque o app mostra as tarefas e a API calcula os minutos a partir delas.

import { isSunday, weekNumber } from './dates.js'

export const DAILY_GOAL_MINUTES = 240
export const TOTAL_WEEKS = 16

export const PHASES = [
  {
    id: 1,
    name: 'Fundação',
    weeks: [1, 4],
    goal: 'Entender frases do dia a dia e montar frases mais longas.',
    level: 'A2 (básico)',
  },
  {
    id: 2,
    name: 'Destravar a fala',
    weeks: [5, 8],
    goal: 'Conversar devagar, sem travar.',
    level: 'B1 (intermediário)',
  },
  {
    id: 3,
    name: 'Fluência',
    weeks: [9, 16],
    goal: 'Entender a maior parte do que ouve e responder naturalmente.',
    level: 'B1+ / B2',
  },
]

export function phaseForWeek(week) {
  return PHASES.find((p) => week >= p.weeks[0] && week <= p.weeks[1]) ?? PHASES[PHASES.length - 1]
}

/** Teste de nível: domingo das semanas 4, 8, 12 e 16. */
export function isTestDay(startDate, day) {
  const week = weekNumber(startDate, day)
  return isSunday(day) && week % 4 === 0 && week <= TOTAL_WEEKS
}

// ---------------------------------------------------------------------------
// Prompts prontos para praticar conversação com o Claude

const LEVEL_HINT = {
  1: 'around A2 (basic). Use short, simple sentences and common words',
  2: 'around B1 (intermediate). Use natural but clear English',
  3: 'around B1+/B2. Talk to me like a native speaker would, at normal speed',
}

export function speakingPrompt(phaseId) {
  return [
    "Let's practice English conversation for 15 minutes.",
    `My level is ${LEVEL_HINT[phaseId] ?? LEVEL_HINT[3]}.`,
    'Ask me one question at a time about my day, my work, my studies or my hobbies.',
    'After each of my answers, correct my mistakes briefly in Portuguese and show the natural way to say it.',
    'Then continue the conversation with a new question. Start now.',
  ].join(' ')
}

export function longTalkPrompt(phaseId) {
  return [
    "It's Sunday: let's have a long English conversation (about 30-40 minutes).",
    `My level is ${LEVEL_HINT[phaseId] ?? LEVEL_HINT[3]}.`,
    'Start by asking how my study week went, then move to topics like technology, games, cars, travel and work.',
    'Do not correct every message. Every 5 answers, send a short list in Portuguese with my most repeated mistakes and 5 useful new words or expressions from our talk.',
  ].join(' ')
}

export function levelTestPrompt(week) {
  return [
    `This is my level test for week ${week} of my English intensive course.`,
    'Have a 10-minute conversation with me in English, one question at a time, getting gradually harder:',
    'personal questions, describing past events, future plans, opinions and a hypothetical situation.',
    'After about 10 questions, stop and give me in Portuguese:',
    '1) my estimated CEFR level (A2, B1, B1+, B2...),',
    '2) what I do well,',
    '3) my 3 biggest weaknesses,',
    '4) what I should focus on in the next 4 weeks.',
    'Start with the first question now.',
  ].join(' ')
}

// ---------------------------------------------------------------------------
// Tarefas

const LISTEN_HINT = {
  1: 'BBC Learning English — 6 Minute English, com transcrição aberta. Ouça uma vez sem ler, depois lendo.',
  2: 'Podcasts para aprendizes de nível intermediário (ex.: English Learning for Curious Minds, All Ears English).',
  3: 'Conteúdo nativo sobre o que você curte: tecnologia, games, automobilismo. Sem transcrição.',
}

const SERIES_HINT = {
  1: 'Sitcom de episódios curtos com legenda EM INGLÊS. Nunca em português.',
  2: 'Legenda em inglês. Pause nas falas úteis e repita em voz alta.',
  3: 'Tente sem legenda. Só ligue a legenda em inglês quando travar de verdade.',
}

const TASKS = {
  // Segunda a sábado
  'm-review': { title: 'Revisar flashcards', minutes: 20, link: '/revisao', hint: 'Todos os cards do dia, sem pular.' },
  'm-grammar': { title: 'Gramática da semana', minutes: 30, link: '/gramatica', hint: 'Leia a explicação e faça os exercícios.' },
  'm-words': { title: '10 palavras novas', minutes: 10, link: '/revisao?add=1', hint: 'Do pacote inicial ou palavras que você encontrou.' },
  't-listen': { title: 'Podcast ou vídeo para aprendizes', minutes: 50, hint: (p) => LISTEN_HINT[p] },
  't-notes': { title: 'Anotar palavras novas', minutes: 10, link: '/revisao?add=1', hint: 'Coloque no app as palavras que você ouviu, com a frase.' },
  'n-series': { title: 'Série ou YouTube em inglês', minutes: 60, hint: (p) => SERIES_HINT[p] },
  'n-shadow': { title: 'Shadowing', minutes: 30, hint: 'Escolha 5 falas da série, ouça e repita imitando ritmo e pronúncia. Grave e compare.' },
  'n-speak': { title: 'Falar inglês', minutes: 30, prompt: 'speaking', hint: 'Converse com o Claude (copie o prompt) ou grave um áudio contando seu dia.' },
  // Domingo
  's-review': { title: 'Revisão da semana', minutes: 60, link: '/revisao', hint: 'Flashcards + refazer os exercícios de gramática da semana.' },
  's-fun': { title: 'Série ou filme por diversão', minutes: 120, hint: 'Sem pressão: só curtir, com legenda em inglês.' },
  's-talk': { title: 'Conversa longa', minutes: 60, prompt: 'long', hint: 'Bate-papo longo com o Claude para ver o que travou na semana.' },
  's-test': { title: 'Teste de nível', minutes: 30, prompt: 'test', link: '/progresso', hint: 'Conversa de 10 min com o Claude e registre o resultado em Progresso.' },
}

export const TASK_IDS = Object.keys(TASKS)

export function taskMinutes(id) {
  return TASKS[id]?.minutes ?? 0
}

function task(id, phaseId) {
  const t = TASKS[id]
  return { id, ...t, hint: typeof t.hint === 'function' ? t.hint(phaseId) : t.hint }
}

/** Blocos e tarefas de um dia específico. */
export function dayPlan(startDate, day) {
  const week = weekNumber(startDate, day)
  const phase = phaseForWeek(week)
  const p = phase.id

  if (isSunday(day)) {
    const fun = task('s-fun', p)
    const blocks = [
      { id: 'manha', name: 'Manhã', icon: 'sunrise', tasks: [task('s-review', p)] },
      { id: 'tarde', name: 'Tarde', icon: 'sun', tasks: [fun] },
      { id: 'noite', name: 'Noite', icon: 'moon', tasks: [task('s-talk', p)] },
    ]
    if (isTestDay(startDate, day)) {
      // No dia de teste, a diversão encolhe para caber o teste nas 4h
      blocks[1].tasks = [{ ...fun, minutes: 90 }, task('s-test', p)]
    }
    return { week, phase, sunday: true, testDay: isTestDay(startDate, day), blocks }
  }

  return {
    week,
    phase,
    sunday: false,
    testDay: false,
    blocks: [
      { id: 'manha', name: 'Manhã', icon: 'sunrise', tasks: ['m-review', 'm-grammar', 'm-words'].map((id) => task(id, p)) },
      { id: 'tarde', name: 'Tarde', icon: 'sun', tasks: ['t-listen', 't-notes'].map((id) => task(id, p)) },
      { id: 'noite', name: 'Noite', icon: 'moon', tasks: ['n-series', 'n-shadow', 'n-speak'].map((id) => task(id, p)) },
    ],
  }
}

/** Minutos de um conjunto de tarefas concluídas, considerando o plano daquele dia. */
export function minutesFor(startDate, day, doneIds) {
  const plan = dayPlan(startDate, day)
  const byId = new Map(plan.blocks.flatMap((b) => b.tasks).map((t) => [t.id, t.minutes]))
  return doneIds.reduce((sum, id) => sum + (byId.get(id) ?? 0), 0)
}

export function promptFor(kind, phaseId, week) {
  if (kind === 'speaking') return speakingPrompt(phaseId)
  if (kind === 'long') return longTalkPrompt(phaseId)
  if (kind === 'test') return levelTestPrompt(week)
  return ''
}
