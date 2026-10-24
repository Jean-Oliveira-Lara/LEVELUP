import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, ChevronRight, Flame, Moon, Sun, Sunrise, Trophy } from 'lucide-react'
import { useAuth } from '../auth.jsx'
import { api } from '../api.js'
import { formatMinutes, useToday } from '../lib.js'
import { CopyButton, ErrorNote, ProgressBar, Timer } from '../components/ui.jsx'
import { DAILY_GOAL_MINUTES, TOTAL_WEEKS, dayPlan, minutesFor, promptFor } from '../../shared/plan.js'
import { dayNumber, diffDays } from '../../shared/dates.js'

const ICONS = { sunrise: Sunrise, sun: Sun, moon: Moon }

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Bom dia'
  if (h < 18) return 'Boa tarde'
  return 'Boa noite'
}

export default function Hoje() {
  const { user } = useAuth()
  const today = useToday()
  const plan = useMemo(() => dayPlan(user.start_date, today), [user.start_date, today])
  const [done, setDone] = useState([])
  const [streak, setStreak] = useState(null)
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)

  const load = useCallback(async () => {
    setError('')
    try {
      const [log, progress] = await Promise.all([api.get(`day?day=${today}`), api.get(`progress?day=${today}`)])
      setDone(log.done)
      setStreak(progress.streak)
      setLoaded(true)
    } catch (err) {
      setError(err.message)
    }
  }, [today])

  useEffect(() => {
    load()
  }, [load])

  const minutes = minutesFor(user.start_date, today, done)
  const notStarted = diffDays(today, user.start_date) > 0
  const allTasks = plan.blocks.flatMap((b) => b.tasks)
  const complete = allTasks.length > 0 && allTasks.every((t) => done.includes(t.id))

  async function toggle(taskId) {
    const willBeDone = !done.includes(taskId)
    const previous = done
    setDone((d) => (willBeDone ? [...d, taskId] : d.filter((id) => id !== taskId)))
    let log
    try {
      log = await api.post('day', { day: today, taskId, done: willBeDone })
      setDone(log.done)
    } catch (err) {
      setDone(previous)
      setError(err.message)
      return
    }
    // A sequência só muda quando o dia passa de "nada feito" para "algo feito" (ou o contrário)
    if ((previous.length === 0) !== (log.done.length === 0)) {
      api
        .get(`progress?day=${today}`)
        .then((p) => setStreak(p.streak))
        .catch(() => {})
    }
  }

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">
          {greeting()}, {user.name.split(' ')[0]}
        </p>
        <h1>
          {notStarted ? 'Prepare-se' : `Dia ${dayNumber(user.start_date, today)}`}
          <span className="head-sub">
            {' '}
            · Semana {Math.min(plan.week, TOTAL_WEEKS)}
            {plan.week > TOTAL_WEEKS ? '+' : ''} de {TOTAL_WEEKS}
          </span>
        </h1>
        <div className="phase-pill">
          Fase {plan.phase.id}: {plan.phase.name}
        </div>
      </header>

      {notStarted && (
        <div className="note">
          Seu intensivo começa em {diffDays(today, user.start_date)} dia(s). Dá para ir adiantando o plano abaixo.
        </div>
      )}

      <section className="today-card">
        <div className="today-row">
          <div>
            <div className="big-number">{formatMinutes(minutes)}</div>
            <div className="muted small">de {formatMinutes(DAILY_GOAL_MINUTES)} hoje</div>
          </div>
          <div className="streak" title="Dias seguidos estudando">
            <Flame size={22} />
            <span>{streak ?? '–'}</span>
          </div>
        </div>
        <ProgressBar value={minutes} max={DAILY_GOAL_MINUTES} label="Progresso de hoje" />
        {complete && (
          <p className="win">
            <Trophy size={16} /> Dia completo. Mandou bem!
          </p>
        )}
      </section>

      {plan.testDay && (
        <div className="note note-accent">
          <strong>Hoje é dia de teste de nível.</strong> Faça a conversa com o Claude e registre o resultado em Progresso.
        </div>
      )}

      <ErrorNote error={error} onRetry={load} />

      {plan.blocks.map((block) => {
        const Icon = ICONS[block.icon]
        const blockMinutes = block.tasks.reduce((s, t) => s + t.minutes, 0)
        const blockDone = block.tasks.every((t) => done.includes(t.id))
        return (
          <section key={block.id} className={`block ${blockDone ? 'is-done' : ''}`}>
            <div className="block-head">
              <div className="block-title">
                <Icon size={20} />
                <h2>{block.name}</h2>
                <span className="muted small">{formatMinutes(blockMinutes)}</span>
              </div>
              <Timer id={`${today}:${block.id}`} minutes={blockMinutes} />
            </div>
            <ul className="tasks">
              {block.tasks.map((t) => {
                const isDone = done.includes(t.id)
                return (
                  <li key={t.id} className={`task ${isDone ? 'is-done' : ''}`}>
                    <button
                      type="button"
                      className="check"
                      onClick={() => toggle(t.id)}
                      disabled={!loaded}
                      aria-pressed={isDone}
                      aria-label={isDone ? `Desmarcar ${t.title}` : `Marcar ${t.title} como feito`}
                    >
                      {isDone && <Check size={16} strokeWidth={3} />}
                    </button>
                    <div className="task-body">
                      <div className="task-title">
                        <span>{t.title}</span>
                        <span className="muted small">{t.minutes} min</span>
                      </div>
                      <p className="task-hint">{t.hint}</p>
                      {(t.link || t.prompt) && (
                        <div className="task-actions">
                          {t.prompt && <CopyButton text={promptFor(t.prompt, plan.phase.id, plan.week)} label="Copiar prompt pro Claude" />}
                          {t.link && (
                            <Link className="chip-btn" to={t.link}>
                              Abrir <ChevronRight size={15} />
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}

      <p className="muted small center">Meta da fase: {plan.phase.goal}</p>
    </div>
  )
}
