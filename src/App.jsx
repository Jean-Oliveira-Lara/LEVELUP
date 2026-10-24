import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { BookOpen, CalendarCheck, Layers, TrendingUp } from 'lucide-react'
import { useAuth } from './auth.jsx'
import { Loading } from './components/ui.jsx'
import Login from './pages/Login.jsx'
import Hoje from './pages/Hoje.jsx'
import Revisao from './pages/Revisao.jsx'
import Gramatica from './pages/Gramatica.jsx'
import Progresso from './pages/Progresso.jsx'

const NAV = [
  { to: '/', label: 'Hoje', icon: CalendarCheck, end: true },
  { to: '/revisao', label: 'Revisão', icon: Layers },
  { to: '/gramatica', label: 'Gramática', icon: BookOpen },
  { to: '/progresso', label: 'Progresso', icon: TrendingUp },
]

function Shell({ children }) {
  return (
    <div className="shell">
      <main className="main">{children}</main>
      <nav className="tabbar" aria-label="Navegação principal">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => `tab ${isActive ? 'is-active' : ''}`}>
            <Icon size={22} strokeWidth={2} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default function App() {
  const { user, loading } = useAuth()

  if (loading) return <Loading text="Abrindo o LEVELUP…" />
  if (!user) return <Login />

  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Hoje />} />
        <Route path="/revisao" element={<Revisao />} />
        <Route path="/gramatica" element={<Gramatica />} />
        <Route path="/progresso" element={<Progresso />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Shell>
  )
}
