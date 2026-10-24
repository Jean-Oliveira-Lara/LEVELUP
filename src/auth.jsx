import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { api, ApiError } from './api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get('auth')
      .then(({ user }) => setUser(user))
      .catch((err) => {
        if (!(err instanceof ApiError) || err.status !== 401) console.error(err)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email, password) => {
    const { user } = await api.post('auth?action=login', { email, password })
    setUser(user)
  }, [])

  const register = useCallback(async (data) => {
    const { user } = await api.post('auth?action=register', data)
    setUser(user)
  }, [])

  const logout = useCallback(async () => {
    await api.post('auth?action=logout').catch(() => {})
    setUser(null)
  }, [])

  const updateUser = useCallback(async (data) => {
    const { user } = await api.patch('auth', data)
    setUser(user)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
