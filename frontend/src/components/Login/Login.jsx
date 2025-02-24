import { useState } from "react"
import "./Login.css" // Archivo CSS personalizado

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault()

    // Validaciones
    if (!email || !password) {
      alert("Error: Todos los campos son obligatorios.")
      return
    }

    if (password.length < 6) {
      alert("Error: La contraseña debe tener al menos 6 caracteres.")
      return
    }

    // Si las validaciones pasan
    alert("Inicio de sesión exitoso. ¡Bienvenido!")
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
