import { useState } from "react"
import { useUser } from "../../context/UserContext" // Accedemos al contexto de usuario
import { useNavigate } from "react-router-dom"      // Para redirigir después del login
import "./Login.css"                                // Asegúrate de tener este archivo CSS

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { loginUser } = useUser()                   // Obtenemos la función de login del contexto
  const navigate = useNavigate()                    // Para navegar después del login

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validaciones simples
    if (!email || !password) {
      alert("Todos los campos son obligatorios.")
      return
    }

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.")
      return
    }

    // Llamamos a loginUser del contexto
    const result = await loginUser({ email, password })

    if (result.success) {
      alert("Inicio de sesión exitoso.")
      navigate("/") // Redirigimos al home
    } else {
      alert("Error: " + result.message)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Ingresa tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">Ingresar</button>
        </form>
      </div>
    </div>
  )
}

export default Login
