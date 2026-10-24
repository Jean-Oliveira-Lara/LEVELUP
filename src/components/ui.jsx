import { useEffect, useRef, useState } from 'react'
import { Check, Copy, Pause, Play, RotateCcw, Volume2 } from 'lucide-react'
import { copyText, recall, speak, store } from '../lib.js'

export function SpeakButton({ text, label = 'Ouvir pronúncia' }) {
  return (
    <button type="button" className="icon-btn" onClick={() => speak(text)} aria-label={label} title={label}>
      <Volume2 size={18} />
    </button>
  )
}

export function CopyButton({ text, label = 'Copiar prompt' }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      className="chip-btn"
      onClick={async () => {
        if (await copyText(text)) {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        }
      }}
    >
      {copied ? <Check size={15} /> : <Copy size={15} />}
      {copied ? 'Copiado!' : label}
    </button>
  )
}

export function ProgressBar({ value, max, label }) {
  const pct = Math.min(100, Math.round((value / Math.max(1, max)) * 100))
  return (
    <div className="progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <div className="progress-fill" style={{ width: `${pct}%` }} />
    </div>
  )
}

export function ErrorNote({ error, onRetry }) {
  if (!error) return null
  return (
    <div className="note note-error" role="alert">
      <span>{error}</span>
      {onRetry && (
        <button type="button" className="link-btn" onClick={onRetry}>
          Tentar de novo
        </button>
      )}
    </div>
  )
}

export function Loading({ text = 'Carregando…' }) {
  return <div className="loading">{text}</div>
}

/**
 * Timer regressivo de um bloco. Guarda o estado no aparelho para sobreviver
 * a troca de aba ou tela bloqueada.
 */
export function Timer({ id, minutes }) {
  const key = `timer:${id}`
  const total = minutes * 60
  const [state, setState] = useState(() => recall(key, { running: false, remaining: total, endAt: null }))
  const [, tick] = useState(0)
  const notified = useRef(false)

  const remaining = state.running ? Math.max(0, Math.round((state.endAt - Date.now()) / 1000)) : state.remaining

  useEffect(() => {
    if (!state.running) return
    const t = setInterval(() => tick((n) => n + 1), 1000)
    return () => clearInterval(t)
  }, [state.running])

  useEffect(() => {
    if (state.running && remaining === 0 && !notified.current) {
      notified.current = true
      const next = { running: false, remaining: 0, endAt: null }
      setState(next)
      store(key, next)
      navigator.vibrate?.([200, 100, 200])
    }
  }, [remaining, state.running, key])

  function save(next) {
    setState(next)
    store(key, next)
  }

  const toggle = () => {
    if (state.running) save({ running: false, remaining, endAt: null })
    else {
      notified.current = false
      const start = remaining > 0 ? remaining : total
      save({ running: true, remaining: start, endAt: Date.now() + start * 1000 })
    }
  }

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0')
  const ss = String(remaining % 60).padStart(2, '0')

  return (
    <div className={`timer ${state.running ? 'is-running' : ''} ${remaining === 0 ? 'is-done' : ''}`}>
      <span className="timer-time" aria-live="off">
        {mm}:{ss}
      </span>
      <button type="button" className="icon-btn" onClick={toggle} aria-label={state.running ? 'Pausar' : 'Iniciar timer'}>
        {state.running ? <Pause size={16} /> : <Play size={16} />}
      </button>
      <button
        type="button"
        className="icon-btn"
        onClick={() => save({ running: false, remaining: total, endAt: null })}
        aria-label="Zerar timer"
      >
        <RotateCcw size={15} />
      </button>
    </div>
  )
}
