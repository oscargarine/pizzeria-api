import { useState } from "react"
import "./Register.css"

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validaciones
    if (!email || !password || !confirmPassword) {
      alert("Error: Todos los campos son obligatorios.")
      return
    }

    if (password.length < 6) {
      alert("Error: La contraseña debe tener al menos 6 caracteres.")
      return
    }

    if (password !== confirmPassword) {
      alert("Error: Las contraseñas no coinciden.")
      return
    }

    alert("Registro exitoso. ¡Bienvenido!")
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Ingresa tu email"
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
              placeholder="Ingresa tu clave"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmar contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
              placeholder="Confirma tu clave"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="register-button">
            Registrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
