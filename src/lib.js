import { useEffect, useState } from 'react'
import { localToday } from '../shared/dates.js'

/** "Hoje" no fuso do aparelho; atualiza quando o app volta a ficar visível ou vira o dia. */
export function useToday() {
  const [today, setToday] = useState(localToday())
  useEffect(() => {
    const check = () => setToday((prev) => (prev === localToday() ? prev : localToday()))
    const timer = setInterval(check, 60_000)
    document.addEventListener('visibilitychange', check)
    return () => {
      clearInterval(timer)
      document.removeEventListener('visibilitychange', check)
    }
  }, [])
  return today
}

/** Fala o texto em inglês com a voz do aparelho. */
export function speak(text) {
  if (!('speechSynthesis' in window)) return false
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = 'en-US'
  utter.rate = 0.9
  const voice = window.speechSynthesis
    .getVoices()
    .find((v) => v.lang?.startsWith('en-US') || v.lang?.startsWith('en_US'))
  if (voice) utter.voice = voice
  window.speechSynthesis.speak(utter)
  return true
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const area = document.createElement('textarea')
    area.value = text
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    const ok = document.execCommand('copy')
    area.remove()
    return ok
  }
}

export function formatMinutes(total) {
  const h = Math.floor(total / 60)
  const m = total % 60
  if (!h) return `${m} min`
  return m ? `${h}h${String(m).padStart(2, '0')}` : `${h}h`
}

export function formatDate(day) {
  const [y, m, d] = day.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

const PREFIX = 'levelup:'

export function store(key, value) {
  try {
    if (value === undefined) localStorage.removeItem(PREFIX + key)
    else localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // navegador sem storage: segue sem lembrar
  }
}

export function recall(key, fallback = null) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}
