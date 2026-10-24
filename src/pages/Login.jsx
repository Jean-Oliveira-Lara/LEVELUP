import { useState } from 'react'
import { Zap } from 'lucide-react'
import { useAuth } from '../auth.jsx'
import { ErrorNote } from '../components/ui.jsx'
import { localToday } from '../../shared/dates.js'

export default function Login() {
  const { login, register } = useAuth()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '', startDate: localToday() })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      if (mode === 'login') await login(form.email, form.password)
      else await register(form)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="auth">
      <div className="auth-card">
        <div className="brand">
          <span className="brand-mark">
            <Zap size={22} strokeWidth={2.5} />
          </span>
          <span className="brand-name">LEVELUP</span>
        </div>
        <h1 className="auth-title">Intensivão de inglês</h1>
        <p className="muted">4 horas por dia, 16 semanas, do básico à conversação.</p>

        <div className="segmented" role="tablist">
          <button type="button" role="tab" aria-selected={mode === 'login'} className={mode === 'login' ? 'is-active' : ''} onClick={() => setMode('login')}>
            Entrar
          </button>
          <button type="button" role="tab" aria-selected={mode === 'register'} className={mode === 'register' ? 'is-active' : ''} onClick={() => setMode('register')}>
            Criar conta
          </button>
        </div>

        <form onSubmit={submit} className="form">
          {mode === 'register' && (
            <label className="field">
              <span>Nome</span>
              <input value={form.name} onChange={set('name')} autoComplete="given-name" required minLength={2} />
            </label>
          )}
          <label className="field">
            <span>E-mail</span>
            <input type="email" value={form.email} onChange={set('email')} autoComplete="email" required />
          </label>
          <label className="field">
            <span>Senha</span>
            <input
              type="password"
              value={form.password}
              onChange={set('password')}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              required
              minLength={mode === 'register' ? 8 : undefined}
            />
          </label>
          {mode === 'register' && (
            <label className="field">
              <span>Dia 1 do intensivo</span>
              <input type="date" value={form.startDate} onChange={set('startDate')} required />
            </label>
          )}
          <ErrorNote error={error} />
          <button className="btn btn-primary" disabled={busy}>
            {busy ? 'Aguarde…' : mode === 'login' ? 'Entrar' : 'Começar o intensivo'}
          </button>
        </form>
      </div>
    </div>
  )
}
