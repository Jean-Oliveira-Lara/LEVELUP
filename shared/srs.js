// Repetição espaçada — variação simples do algoritmo SM-2.
// Notas: 0 = errei, 3 = difícil, 4 = bom, 5 = fácil.

export const GRADES = [0, 3, 4, 5]

const MIN_EASE = 1.3
const MAX_INTERVAL = 365

/**
 * Recebe o estado atual do card e a nota, devolve o novo estado.
 * interval_days = 0 significa "revisar de novo hoje".
 */
export function schedule(card, grade) {
  if (!GRADES.includes(grade)) throw new Error(`Nota inválida: ${grade}`)

  let ease = card.ease ?? 2.5
  let interval = card.interval_days ?? 0
  let reps = card.reps ?? 0
  let lapses = card.lapses ?? 0

  if (grade === 0) {
    lapses += 1
    reps = 0
    interval = 0
    ease -= 0.2
  } else if (grade === 3) {
    interval = reps === 0 ? 1 : Math.max(interval + 1, Math.round(interval * 1.2))
    reps += 1
    ease -= 0.15
  } else if (grade === 4) {
    if (reps === 0) interval = 1
    else if (reps === 1) interval = 3
    else interval = Math.max(interval + 1, Math.round(interval * ease))
    reps += 1
  } else {
    if (reps === 0) interval = 3
    else if (reps === 1) interval = 6
    else interval = Math.max(interval + 2, Math.round(interval * ease * 1.3))
    reps += 1
    ease += 0.15
  }

  return {
    ease: Math.max(MIN_EASE, Math.round(ease * 100) / 100),
    interval_days: Math.min(MAX_INTERVAL, interval),
    reps,
    lapses,
  }
}

/** Soma dias a uma data AAAA-MM-DD sem depender de fuso horário. */
export function addDays(day, days) {
  const [y, m, d] = day.split('-').map(Number)
  const date = new Date(Date.UTC(y, m - 1, d + days))
  return date.toISOString().slice(0, 10)
}

/** Card "dominado": já sobreviveu a intervalos de 3 semanas ou mais. */
export function isMastered(card) {
  return (card.interval_days ?? 0) >= 21
}
