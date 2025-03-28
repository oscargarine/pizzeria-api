import { createContext, useState, useContext, useMemo } from 'react'

// Creamos el contexto
const UserContext = createContext()

// Hook personalizado para acceder al contexto desde cualquier componente
export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null)     // Guardamos el JWT
  const [email, setEmail] = useState(null)     // Guardamos el email

  // -------------------------
  // Método: login
  // -------------------------
  const loginUser = async ({ email, password }) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Error al iniciar sesión')

      setToken(data.token)
      setEmail(data.email)
      return { success: true }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  // -------------------------
  // Método: register
  // -------------------------
  const registerUser = async ({ email, password }) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Error al registrar')

      setToken(data.token)
      setEmail(data.email)
      return { success: true }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  // -------------------------
  // Método: logout
  // -------------------------
  const logoutUser = () => {
    setToken(null)
    setEmail(null)
  }

  // -------------------------
  // Método: obtener perfil del usuario
  // -------------------------
  const getProfile = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Error al obtener perfil')
      return data
    } catch (error) {
      console.error(error)
      return null
    }
  }

  // Memoizamos el objeto para evitar renders innecesarios
  const value = useMemo(() => ({
    token,
    email,
    loginUser,
    registerUser,
    logoutUser,
    getProfile
  }), [token, email])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
