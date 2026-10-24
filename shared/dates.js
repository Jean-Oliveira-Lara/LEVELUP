// Datas sempre como texto AAAA-MM-DD, calculadas em UTC para não sofrer com fuso.

function toUTC(day) {
  const [y, m, d] = day.split('-').map(Number)
  return Date.UTC(y, m - 1, d)
}

export function diffDays(from, to) {
  return Math.round((toUTC(to) - toUTC(from)) / 86400000)
}

/** Semana do intensivo (1, 2, 3...) a partir da data de início. */
export function weekNumber(startDate, today) {
  return Math.max(1, Math.floor(diffDays(startDate, today) / 7) + 1)
}

/** Dia do intensivo (1, 2, 3...). */
export function dayNumber(startDate, today) {
  return Math.max(1, diffDays(startDate, today) + 1)
}

export function weekday(day) {
  return new Date(toUTC(day)).getUTCDay() // 0 = domingo
}

export function isSunday(day) {
  return weekday(day) === 0
}

/** "Hoje" no fuso do aparelho. */
export function localToday(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function toISO(value) {
  if (!value) return value
  if (typeof value === 'string') return value.slice(0, 10)
  // Datas vindas do Postgres chegam como Date à meia-noite UTC
  return value.toISOString().slice(0, 10)
}
