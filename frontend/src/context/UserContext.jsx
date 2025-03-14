import { createContext, useState, useContext } from 'react'

// Creamos el contexto
const UserContext = createContext()

// Hook personalizado
export const useUser = () => useContext(UserContext)

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(true)

  // Método para hacer el logout (cambiar el token a false)
const logout = () => {
  setToken(false)
}

return (
  <UserContext.Provider value={{ token, logout }}>
    {children}
  </UserContext.Provider>
)

}