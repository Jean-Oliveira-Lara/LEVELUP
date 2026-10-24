import { test } from 'node:test'
import assert from 'node:assert/strict'
import { addDays, schedule } from '../shared/srs.js'
import { dayNumber, isSunday, weekNumber } from '../shared/dates.js'
import { DAILY_GOAL_MINUTES, dayPlan, isTestDay, minutesFor } from '../shared/plan.js'
import { ALL_TOPICS, reviewExercises, topicForWeek } from '../shared/grammar.js'
import { STARTER_WORDS } from '../shared/starterWords.js'
import { bestStreak, computeStreak } from '../api/progress.js'

test('SRS: errar volta para hoje e conta lapso', () => {
  const next = schedule({ ease: 2.5, interval_days: 10, reps: 4, lapses: 0 }, 0)
  assert.equal(next.interval_days, 0)
  assert.equal(next.reps, 0)
  assert.equal(next.lapses, 1)
  assert.ok(next.ease < 2.5)
})

test('SRS: sequência de acertos cresce o intervalo', () => {
  let card = { ease: 2.5, interval_days: 0, reps: 0, lapses: 0 }
  const intervals = []
  for (let i = 0; i < 5; i++) {
    card = schedule(card, 4)
    intervals.push(card.interval_days)
  }
  assert.deepEqual(intervals.slice(0, 2), [1, 3])
  for (let i = 1; i < intervals.length; i++) assert.ok(intervals[i] > intervals[i - 1])
})

test('SRS: fácil > bom > difícil, e nota inválida dá erro', () => {
  const base = { ease: 2.5, interval_days: 6, reps: 3, lapses: 0 }
  const hard = schedule(base, 3).interval_days
  const good = schedule(base, 4).interval_days
  const easy = schedule(base, 5).interval_days
  assert.ok(easy > good && good > hard)
  assert.throws(() => schedule(base, 2))
  assert.ok(schedule({ ease: 1.3, interval_days: 1, reps: 1 }, 0).ease >= 1.3)
})

test('datas: soma de dias atravessa mês e ano', () => {
  assert.equal(addDays('2026-12-31', 1), '2027-01-01')
  assert.equal(addDays('2026-03-01', -1), '2026-02-28')
  assert.equal(weekNumber('2026-10-24', '2026-10-24'), 1)
  assert.equal(weekNumber('2026-10-24', '2026-10-30'), 1)
  assert.equal(weekNumber('2026-10-24', '2026-10-31'), 2)
  assert.equal(weekNumber('2026-10-24', '2026-10-20'), 1)
  assert.equal(dayNumber('2026-10-24', '2026-10-26'), 3)
  assert.equal(isSunday('2026-10-25'), true)
})

test('plano: todo dia soma 4 horas', () => {
  const start = '2026-10-19'
  for (let i = 0; i < 16 * 7; i++) {
    const day = addDays(start, i)
    const plan = dayPlan(start, day)
    const total = plan.blocks.flatMap((b) => b.tasks).reduce((s, t) => s + t.minutes, 0)
    assert.equal(total, DAILY_GOAL_MINUTES, `dia ${day}`)
    assert.equal(plan.blocks.length, 3)
  }
})

test('plano: teste de nível no domingo das semanas 4, 8, 12, 16', () => {
  const start = '2026-10-19' // segunda
  const testDays = []
  for (let i = 0; i < 16 * 7; i++) {
    const day = addDays(start, i)
    if (isTestDay(start, day)) testDays.push(weekNumber(start, day))
  }
  assert.deepEqual(testDays, [4, 8, 12, 16])
  const sundayTest = addDays(start, 27)
  assert.ok(dayPlan(start, sundayTest).blocks.some((b) => b.tasks.some((t) => t.id === 's-test')))
})

test('plano: minutos ignoram tarefas que não são do dia', () => {
  const start = '2026-10-19'
  assert.equal(minutesFor(start, '2026-10-20', ['m-review', 'm-grammar']), 50)
  assert.equal(minutesFor(start, '2026-10-20', ['s-fun']), 0)
  assert.equal(minutesFor(start, '2026-10-25', ['s-fun']), 120)
})

test('sequência de dias', () => {
  assert.equal(computeStreak(['2026-10-21', '2026-10-22', '2026-10-23'], '2026-10-23'), 3)
  assert.equal(computeStreak(['2026-10-21', '2026-10-22'], '2026-10-23'), 2)
  assert.equal(computeStreak(['2026-10-20', '2026-10-22'], '2026-10-23'), 1)
  assert.equal(computeStreak([], '2026-10-23'), 0)
  assert.equal(bestStreak(['2026-10-01', '2026-10-02', '2026-10-03', '2026-10-10', '2026-10-11']), 3)
})

test('conteúdo: gramática e vocabulário consistentes', () => {
  assert.equal(ALL_TOPICS.length, 16)
  for (let w = 1; w <= 16; w++) assert.equal(topicForWeek(w).week, w)
  assert.equal(topicForWeek(30).week, 16)
  for (const t of ALL_TOPICS) {
    for (const e of t.exercises) {
      assert.ok(e.answer >= 0 && e.answer < e.options.length, `${t.id}: ${e.q}`)
      assert.equal(new Set(e.options).size, e.options.length, `${t.id}: opções repetidas`)
    }
  }
  assert.equal(reviewExercises(12).length, 12)
  assert.equal(STARTER_WORDS.length, 300)
  assert.equal(new Set(STARTER_WORDS.map((w) => w[0].toLowerCase())).size, 300)
})
