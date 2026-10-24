import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PackagePlus, Pencil, Plus, Search, Trash2, X } from 'lucide-react'
import { api } from '../api.js'
import { formatDate, useToday } from '../lib.js'
import { ErrorNote, Loading, ProgressBar, SpeakButton } from '../components/ui.jsx'
import { schedule } from '../../shared/srs.js'

const TABS = [
  { id: 'revisar', label: 'Revisar' },
  { id: 'adicionar', label: 'Adicionar' },
  { id: 'cards', label: 'Meus cards' },
]

const GRADE_BUTTONS = [
  { grade: 0, label: 'Errei', cls: 'grade-again' },
  { grade: 3, label: 'Difícil', cls: 'grade-hard' },
  { grade: 4, label: 'Bom', cls: 'grade-good' },
  { grade: 5, label: 'Fácil', cls: 'grade-easy' },
]

function intervalLabel(days) {
  if (days === 0) return 'hoje'
  if (days < 7) return `${days}d`
  if (days < 30) return `${Math.round(days / 7)}sem`
  if (days < 365) return `${Math.round(days / 30)}m`
  return '1a'
}

export default function Revisao() {
  const [params, setParams] = useSearchParams()
  const tab = params.get('add') ? 'adicionar' : params.get('tab') || 'revisar'
  const setTab = (id) => setParams(id === 'revisar' ? {} : { tab: id }, { replace: true })

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Vocabulário</p>
        <h1>Revisão</h1>
      </header>
      <div className="segmented" role="tablist">
        {TABS.map((t) => (
          <button key={t.id} type="button" role="tab" aria-selected={tab === t.id} className={tab === t.id ? 'is-active' : ''} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      {tab === 'revisar' && <ReviewSession onAdd={() => setTab('adicionar')} />}
      {tab === 'adicionar' && <AddCards />}
      {tab === 'cards' && <CardList />}
    </div>
  )
}

function ReviewSession({ onAdd }) {
  const today = useToday()
  const [queue, setQueue] = useState(null)
  const [initial, setInitial] = useState(0)
  const [reviewed, setReviewed] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setError('')
    try {
      const { cards } = await api.get(`cards?day=${today}`)
      setQueue(cards)
      setInitial(cards.length)
      setReviewed(0)
      setRevealed(false)
    } catch (err) {
      setError(err.message)
    }
  }, [today])

  useEffect(() => {
    load()
  }, [load])

  const card = queue?.[0]

  const grade = useCallback(
    async (g) => {
      if (!card || busy) return
      setBusy(true)
      setError('')
      try {
        const { card: updated } = await api.post('cards?action=review', { cardId: card.id, grade: g, day: today })
        setQueue((q) => [...q.slice(1), ...(updated.due <= today ? [updated] : [])])
        setReviewed((n) => n + 1)
        setRevealed(false)
      } catch (err) {
        setError(err.message)
      } finally {
        setBusy(false)
      }
    },
    [card, busy, today],
  )

  // Atalhos no computador: espaço revela, 1–4 dão a nota
  useEffect(() => {
    function onKey(e) {
      if (e.target.closest('input, textarea')) return
      if (e.code === 'Space') {
        e.preventDefault()
        setRevealed(true)
      } else if (revealed && ['1', '2', '3', '4'].includes(e.key)) {
        grade(GRADE_BUTTONS[Number(e.key) - 1].grade)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [revealed, grade])

  if (error && !queue) return <ErrorNote error={error} onRetry={load} />
  if (!queue) return <Loading />

  if (!card) {
    return (
      <div className="empty">
        <p className="empty-title">{reviewed > 0 ? 'Revisão do dia concluída!' : 'Nenhum card para revisar agora.'}</p>
        <p className="muted">
          {reviewed > 0
            ? `${reviewed} revisões feitas. Volte amanhã: o app avisa quando cada palavra precisa voltar.`
            : 'Adicione palavras novas para começar.'}
        </p>
        <button type="button" className="btn btn-primary" onClick={onAdd}>
          <Plus size={18} /> Adicionar palavras
        </button>
      </div>
    )
  }

  return (
    <div className="review">
      <div className="review-meta">
        <span className="muted small">
          {Math.min(reviewed, initial)}/{initial} · faltam {queue.length}
        </span>
      </div>
      <ProgressBar value={Math.min(reviewed, initial)} max={initial} label="Progresso da revisão" />

      <div className={`flashcard ${revealed ? 'is-revealed' : ''}`}>
        <div className="flash-front">
          <span className="flash-word">{card.front}</span>
          <SpeakButton text={card.front} />
        </div>
        {card.example && (
          <p className="flash-example">
            “{card.example}” <SpeakButton text={card.example} label="Ouvir frase" />
          </p>
        )}
        {revealed ? (
          <div className="flash-back">{card.back}</div>
        ) : (
          <button type="button" className="btn btn-ghost reveal" onClick={() => setRevealed(true)}>
            Mostrar significado
          </button>
        )}
      </div>

      <ErrorNote error={error} />

      {revealed && (
        <div className="grades">
          {GRADE_BUTTONS.map((b) => (
            <button key={b.grade} type="button" className={`grade ${b.cls}`} onClick={() => grade(b.grade)} disabled={busy}>
              <span>{b.label}</span>
              <span className="grade-next">{intervalLabel(schedule(card, b.grade).interval_days)}</span>
            </button>
          ))}
        </div>
      )}
      <p className="muted small center">Fale a palavra em voz alta antes de revelar. No computador: espaço revela, 1–4 dão a nota.</p>
    </div>
  )
}

const EMPTY_FORM = { front: '', back: '', example: '', source: '' }

function AddCards() {
  const today = useToday()
  const [counts, setCounts] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    api
      .get(`cards?day=${today}`)
      .then((r) => setCounts(r.counts))
      .catch((err) => setError(err.message))
  }, [today])

  async function addStarter() {
    setBusy(true)
    setError('')
    setMessage('')
    try {
      const r = await api.post('cards?action=starter', { day: today, count: 10 })
      setCounts(r.counts)
      setMessage(`${r.added} palavras novas adicionadas. Já estão na revisão de hoje.`)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    setMessage('')
    try {
      const r = await api.post('cards?action=add', { ...form, day: today })
      setCounts(r.counts)
      setMessage(`“${r.card.front}” adicionada.`)
      setForm((f) => ({ ...EMPTY_FORM, source: f.source }))
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  const starterLeft = counts ? counts.starterTotal - counts.starter : null

  return (
    <div className="stack">
      <section className="panel">
        <div className="panel-head">
          <PackagePlus size={20} />
          <h2>Pacote inicial</h2>
        </div>
        <p className="muted">300 palavras e expressões que mais destravam a conversa, em lotes de 10.</p>
        {counts && <ProgressBar value={counts.starter} max={counts.starterTotal} label="Pacote inicial" />}
        <div className="row-between">
          <span className="muted small">{counts ? `${counts.starter} de ${counts.starterTotal} · hoje: +${counts.added_today}` : '…'}</span>
          <button type="button" className="btn btn-primary" onClick={addStarter} disabled={busy || starterLeft === 0}>
            + 10 palavras
          </button>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <Plus size={20} />
          <h2>Palavra que você encontrou</h2>
        </div>
        <form className="form" onSubmit={submit}>
          <label className="field">
            <span>Em inglês</span>
            <input value={form.front} onChange={set('front')} placeholder="ex.: figure out" required maxLength={200} autoCapitalize="none" />
          </label>
          <label className="field">
            <span>Significado</span>
            <input value={form.back} onChange={set('back')} placeholder="ex.: entender, resolver" required maxLength={300} />
          </label>
          <label className="field">
            <span>Frase onde apareceu (recomendado)</span>
            <textarea value={form.example} onChange={set('example')} rows={2} placeholder="ex.: I can't figure out this bug." maxLength={500} />
          </label>
          <label className="field">
            <span>De onde veio</span>
            <input value={form.source} onChange={set('source')} placeholder="ex.: Friends S01E03, podcast BBC" maxLength={120} />
          </label>
          <button className="btn btn-primary" disabled={busy}>
            Adicionar card
          </button>
        </form>
      </section>

      {message && <div className="note note-ok">{message}</div>}
      <ErrorNote error={error} />
    </div>
  )
}

function CardList() {
  const today = useToday()
  const [cards, setCards] = useState(null)
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState('')

  const load = useCallback(() => {
    setError('')
    api
      .get(`cards?day=${today}&view=all`)
      .then((r) => setCards(r.cards))
      .catch((err) => setError(err.message))
  }, [today])

  useEffect(load, [load])

  const filtered = useMemo(() => {
    if (!cards) return []
    const q = search.trim().toLowerCase()
    if (!q) return cards
    return cards.filter((c) => c.front.toLowerCase().includes(q) || c.back.toLowerCase().includes(q))
  }, [cards, search])

  async function remove(card) {
    if (!window.confirm(`Apagar o card “${card.front}”?`)) return
    try {
      await api.del(`cards?id=${card.id}`)
      setCards((list) => list.filter((c) => c.id !== card.id))
    } catch (err) {
      setError(err.message)
    }
  }

  async function save(e) {
    e.preventDefault()
    try {
      const { card } = await api.patch('cards', editing)
      setCards((list) => list.map((c) => (c.id === card.id ? card : c)))
      setEditing(null)
    } catch (err) {
      setError(err.message)
    }
  }

  if (!cards) return error ? <ErrorNote error={error} onRetry={load} /> : <Loading />

  return (
    <div className="stack">
      <label className="search">
        <Search size={18} />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Buscar em ${cards.length} cards`} />
      </label>
      <ErrorNote error={error} />
      {filtered.length === 0 && <p className="muted center">Nenhum card encontrado.</p>}
      <ul className="card-list">
        {filtered.map((c) =>
          editing?.id === c.id ? (
            <li key={c.id} className="card-row is-editing">
              <form className="form" onSubmit={save}>
                <input value={editing.front} onChange={(e) => setEditing({ ...editing, front: e.target.value })} required />
                <input value={editing.back} onChange={(e) => setEditing({ ...editing, back: e.target.value })} required />
                <textarea value={editing.example ?? ''} onChange={(e) => setEditing({ ...editing, example: e.target.value })} rows={2} />
                <div className="row-between">
                  <button type="button" className="btn btn-ghost" onClick={() => setEditing(null)}>
                    <X size={16} /> Cancelar
                  </button>
                  <button className="btn btn-primary">Salvar</button>
                </div>
              </form>
            </li>
          ) : (
            <li key={c.id} className="card-row">
              <div className="card-row-main">
                <strong>{c.front}</strong>
                <span className="muted">{c.back}</span>
                <span className="muted small">
                  {c.due <= today ? 'Revisar hoje' : `Próxima: ${formatDate(c.due)}`}
                  {c.interval_days >= 21 ? ' · dominada' : ''}
                </span>
              </div>
              <div className="card-row-actions">
                <SpeakButton text={c.front} />
                <button type="button" className="icon-btn" onClick={() => setEditing({ id: c.id, front: c.front, back: c.back, example: c.example })} aria-label={`Editar ${c.front}`}>
                  <Pencil size={16} />
                </button>
                <button type="button" className="icon-btn danger" onClick={() => remove(c)} aria-label={`Apagar ${c.front}`}>
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ),
        )}
      </ul>
    </div>
  )
}
