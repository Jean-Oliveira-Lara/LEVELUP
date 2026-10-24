import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, ChevronLeft, ChevronRight, Lightbulb, RotateCcw, XCircle } from 'lucide-react'
import { useAuth } from '../auth.jsx'
import { api } from '../api.js'
import { useToday } from '../lib.js'
import { ErrorNote, ProgressBar, SpeakButton } from '../components/ui.jsx'
import { ALL_TOPICS, REVIEW_TOPIC, reviewExercises, topicForWeek } from '../../shared/grammar.js'
import { weekNumber } from '../../shared/dates.js'

export default function Gramatica() {
  const { user } = useAuth()
  const today = useToday()
  const currentWeek = weekNumber(user.start_date, today)
  const weekTopic = topicForWeek(currentWeek)
  const [topicId, setTopicId] = useState(weekTopic.id)
  const [results, setResults] = useState({})
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .get('grammar')
      .then((r) => setResults(Object.fromEntries(r.results.map((x) => [x.topic_id, x]))))
      .catch((err) => setError(err.message))
  }, [])

  const topic = ALL_TOPICS.find((t) => t.id === topicId) ?? weekTopic
  const index = ALL_TOPICS.indexOf(topic)

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">
          Semana {topic.week}
          {topic.id === weekTopic.id ? ' · tema desta semana' : ''}
        </p>
        <h1>{topic.title}</h1>
        <p className="muted">{topic.summary}</p>
      </header>

      <div className="topic-nav">
        <button type="button" className="icon-btn" disabled={index === 0} onClick={() => setTopicId(ALL_TOPICS[index - 1].id)} aria-label="Tema anterior">
          <ChevronLeft size={20} />
        </button>
        <select value={topic.id} onChange={(e) => setTopicId(e.target.value)} aria-label="Escolher tema">
          {ALL_TOPICS.map((t) => (
            <option key={t.id} value={t.id}>
              {t.week}. {t.title}
              {results[t.id] ? ` (${results[t.id].best}/${results[t.id].total})` : ''}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="icon-btn"
          disabled={index === ALL_TOPICS.length - 1}
          onClick={() => setTopicId(ALL_TOPICS[index + 1].id)}
          aria-label="Próximo tema"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      {topic.id !== weekTopic.id && (
        <button type="button" className="link-btn" onClick={() => setTopicId(weekTopic.id)}>
          Voltar para o tema da semana {Math.min(currentWeek, 16)}
        </button>
      )}

      <ErrorNote error={error} />

      {topic.sections.map((s) => (
        <section key={s.heading} className="panel">
          <h2>{s.heading}</h2>
          <p>{s.text}</p>
          {s.examples.length > 0 && (
            <ul className="examples">
              {s.examples.map((ex) => (
                <li key={ex.en}>
                  <div className="example-en">
                    <span>{ex.en}</span>
                    <SpeakButton text={ex.en} label="Ouvir exemplo" />
                  </div>
                  <span className="muted small">{ex.pt}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {topic.tips.length > 0 && (
        <section className="panel panel-tip">
          <div className="panel-head">
            <Lightbulb size={20} />
            <h2>Dicas</h2>
          </div>
          <ul className="tips">
            {topic.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </section>
      )}

      <Quiz
        key={topic.id}
        topic={topic}
        best={results[topic.id]}
        onSaved={(r) => setResults((all) => ({ ...all, [r.topic_id]: r }))}
      />
    </div>
  )
}

function Quiz({ topic, best, onSaved }) {
  const makeQuestions = () => (topic.id === REVIEW_TOPIC.id ? reviewExercises(12) : topic.exercises)
  const [questions, setQuestions] = useState(makeQuestions)
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState(null)
  const [correct, setCorrect] = useState(0)
  const [finished, setFinished] = useState(false)
  const [error, setError] = useState('')
  const q = questions[i]
  const total = questions.length

  const restart = () => {
    setQuestions(makeQuestions())
    setI(0)
    setPicked(null)
    setCorrect(0)
    setFinished(false)
  }

  async function next() {
    if (i + 1 < total) {
      setI(i + 1)
      setPicked(null)
      return
    }
    setFinished(true)
    try {
      const { result } = await api.post('grammar', { topicId: topic.id, correct, total })
      onSaved(result)
    } catch (err) {
      setError(err.message)
    }
  }

  function pick(option) {
    if (picked !== null) return
    setPicked(option)
    if (option === q.answer) setCorrect((c) => c + 1)
  }

  const score = useMemo(() => Math.round((correct / Math.max(1, total)) * 100), [correct, total])

  return (
    <section className="panel quiz">
      <div className="row-between">
        <h2>Exercícios</h2>
        {best && (
          <span className="muted small">
            Melhor: {best.best}/{best.total} · {best.attempts}x
          </span>
        )}
      </div>

      {finished ? (
        <div className="quiz-end">
          <div className="big-number">
            {correct}/{total}
          </div>
          <p>{score >= 85 ? 'Excelente! Tema dominado.' : score >= 60 ? 'Bom! Refaça amanhã para fixar.' : 'Releia a explicação e tente de novo.'}</p>
          <ErrorNote error={error} />
          <button type="button" className="btn btn-primary" onClick={restart}>
            <RotateCcw size={16} /> Fazer de novo
          </button>
        </div>
      ) : (
        <>
          <ProgressBar value={i} max={total} label="Progresso dos exercícios" />
          <p className="muted small">
            Questão {i + 1} de {total}
            {q.topic ? ` · ${q.topic}` : ''}
          </p>
          <p className="quiz-q">{q.q}</p>
          <div className="options">
            {q.options.map((opt, idx) => {
              const state = picked === null ? '' : idx === q.answer ? 'is-right' : idx === picked ? 'is-wrong' : 'is-dim'
              return (
                <button key={opt} type="button" className={`option ${state}`} onClick={() => pick(idx)} disabled={picked !== null}>
                  {opt}
                  {state === 'is-right' && <CheckCircle2 size={18} />}
                  {state === 'is-wrong' && <XCircle size={18} />}
                </button>
              )
            })}
          </div>
          {picked !== null && (
            <>
              <p className={`feedback ${picked === q.answer ? 'ok' : 'bad'}`}>
                {picked === q.answer ? 'Certo! ' : 'Quase. '}
                {q.explain}
              </p>
              <button type="button" className="btn btn-primary" onClick={next}>
                {i + 1 < total ? 'Próxima' : 'Ver resultado'}
              </button>
            </>
          )}
        </>
      )}
    </section>
  )
}
