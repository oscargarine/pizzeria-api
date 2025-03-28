import { useState } from "react"
import "./Register.css" // Asegúrate de tener este archivo
import { useUser } from "../../context/UserContext"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { registerUser } = useUser()
  const navigate = useNavigate()

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

    // Intentamos registrar al usuario
    const result = await registerUser({ email, password })

    if (result.success) {
      alert("Registro exitoso. ¡Bienvenido!")
      navigate("/") // Redirigimos al home
    } else {
      alert("Error: " + result.message)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Registro</h1>
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
            Registrarse
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
