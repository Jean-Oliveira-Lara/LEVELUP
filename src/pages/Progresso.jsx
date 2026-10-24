import { useCallback, useEffect, useState } from 'react'
import { Award, BookOpen, CalendarDays, Clock, Flame, Layers, LogOut, Trash2 } from 'lucide-react'
import { useAuth } from '../auth.jsx'
import { api } from '../api.js'
import { formatDate, formatMinutes, useToday } from '../lib.js'
import { CopyButton, ErrorNote, Loading } from '../components/ui.jsx'
import { DAILY_GOAL_MINUTES, PHASES, TOTAL_WEEKS, levelTestPrompt } from '../../shared/plan.js'

const LEVELS = ['A1', 'A2', 'A2+', 'B1', 'B1+', 'B2', 'B2+', 'C1']

export default function Progresso() {
  const { user, logout, updateUser } = useAuth()
  const today = useToday()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  const load = useCallback(() => {
    setError('')
    api
      .get(`progress?day=${today}`)
      .then(setData)
      .catch((err) => setError(err.message))
  }, [today])

  useEffect(load, [load, user.start_date])

  if (!data) return <div className="page">{error ? <ErrorNote error={error} onRetry={load} /> : <Loading />}</div>

  const maxBar = Math.max(DAILY_GOAL_MINUTES, ...data.last14.map((d) => d.minutes))

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Semana {Math.min(data.week, TOTAL_WEEKS)} de {TOTAL_WEEKS}</p>
        <h1>Progresso</h1>
      </header>

      <div className="stats">
        <Stat icon={Flame} value={data.streak} label="dias seguidos" sub={`recorde: ${data.bestStreak}`} accent />
        <Stat icon={Clock} value={formatMinutes(data.totalMinutes)} label="estudadas" sub={`${data.daysStudied} dias de estudo`} />
        <Stat icon={CalendarDays} value={data.fullDays} label="dias completos" sub="4h cumpridas" />
        <Stat icon={Layers} value={data.cards.total} label="palavras" sub={`${data.cards.mastered} dominadas`} />
        <Stat icon={BookOpen} value={`${data.grammar.topics}/16`} label="temas feitos" sub={data.grammar.total ? `${Math.round((data.grammar.correct / data.grammar.total) * 100)}% de acerto` : 'nenhum ainda'} />
        <Stat icon={Award} value={data.tests[0]?.level ?? '—'} label="último nível" sub={data.tests[0] ? formatDate(data.tests[0].day) : 'faça o 1º teste na semana 4'} />
      </div>

      <section className="panel">
        <h2>Últimos 14 dias</h2>
        <div className="bars" role="img" aria-label="Minutos estudados por dia nos últimos 14 dias">
          {data.last14.map((d) => (
            <div key={d.day} className="bar-col" title={`${formatDate(d.day)}: ${formatMinutes(d.minutes)}`}>
              <div className="bar-track">
                <div
                  className={`bar ${d.minutes >= DAILY_GOAL_MINUTES ? 'is-full' : ''}`}
                  style={{ height: `${(d.minutes / maxBar) * 100}%` }}
                />
              </div>
              <span className="bar-label">{Number(d.day.slice(8))}</span>
            </div>
          ))}
        </div>
        <div className="bars-goal muted small">Meta: {formatMinutes(DAILY_GOAL_MINUTES)} por dia</div>
      </section>

      <section className="panel">
        <h2>Jornada de 16 semanas</h2>
        <div className="weeks">
          {Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1).map((w) => (
            <div
              key={w}
              className={`week-dot ${w < data.week ? 'is-past' : ''} ${w === data.week ? 'is-current' : ''} ${w % 4 === 0 ? 'is-test' : ''}`}
              title={`Semana ${w}${w % 4 === 0 ? ' · teste de nível' : ''}`}
            >
              {w}
            </div>
          ))}
        </div>
        <ul className="phases">
          {PHASES.map((p) => (
            <li key={p.id} className={data.week >= p.weeks[0] && data.week <= p.weeks[1] ? 'is-current' : ''}>
              <strong>
                Fase {p.id} · {p.name}
              </strong>{' '}
              <span className="muted small">
                (sem. {p.weeks[0]}–{p.weeks[1]}, alvo {p.level})
              </span>
              <div className="muted small">{p.goal}</div>
            </li>
          ))}
        </ul>
      </section>

      <LevelTests data={data} today={today} onChange={load} />

      <Settings user={user} updateUser={updateUser} logout={logout} />
    </div>
  )
}

function Stat({ icon: Icon, value, label, sub, accent }) {
  return (
    <div className={`stat ${accent ? 'is-accent' : ''}`}>
      <Icon size={18} />
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-sub muted small">{sub}</div>
    </div>
  )
}

function LevelTests({ data, today, onChange }) {
  const [level, setLevel] = useState('B1')
  const [notes, setNotes] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await api.post('progress', { day: today, level, notes })
      setNotes('')
      onChange()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function remove(id) {
    if (!window.confirm('Apagar este teste?')) return
    try {
      await api.del(`progress?id=${id}`)
      onChange()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="panel">
      <h2>Teste de nível</h2>
      <p className="muted">
        A cada 4 semanas: copie o prompt, faça a conversa de 10 minutos com o Claude e registre o nível que ele estimar.
      </p>
      <CopyButton text={levelTestPrompt(data.week)} label="Copiar prompt do teste" />
      <form className="form" onSubmit={submit}>
        <div className="row">
          <label className="field grow">
            <span>Nível estimado</span>
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              {LEVELS.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="field">
          <span>Pontos fortes, fraquezas e foco das próximas semanas</span>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} maxLength={2000} placeholder="Cole aqui o resumo que o Claude te deu" />
        </label>
        <ErrorNote error={error} />
        <button className="btn btn-primary" disabled={busy}>
          Registrar resultado
        </button>
      </form>
      {data.tests.length > 0 && (
        <ul className="tests">
          {data.tests.map((t) => (
            <li key={t.id}>
              <div className="row-between">
                <strong>
                  {t.level} <span className="muted small">· semana {t.week} · {formatDate(t.day)}</span>
                </strong>
                <button type="button" className="icon-btn danger" onClick={() => remove(t.id)} aria-label="Apagar teste">
                  <Trash2 size={15} />
                </button>
              </div>
              {t.notes && <p className="muted small pre">{t.notes}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function Settings({ user, updateUser, logout }) {
  const [startDate, setStartDate] = useState(user.start_date)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function save(e) {
    e.preventDefault()
    setError('')
    setMessage('')
    try {
      await updateUser({ startDate })
      setMessage('Data de início atualizada.')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="panel">
      <h2>Conta</h2>
      <p className="muted small">{user.email}</p>
      <form className="form" onSubmit={save}>
        <label className="field">
          <span>Dia 1 do intensivo</span>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </label>
        <button className="btn btn-ghost" disabled={startDate === user.start_date}>
          Salvar data
        </button>
      </form>
      {message && <div className="note note-ok">{message}</div>}
      <ErrorNote error={error} />
      <button type="button" className="btn btn-ghost danger-text" onClick={logout}>
        <LogOut size={16} /> Sair
      </button>
    </section>
  )
}
