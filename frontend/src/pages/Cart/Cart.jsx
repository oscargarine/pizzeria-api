import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import { useUser } from '../../context/UserContext'

const Cart = () => {
  const { cart, increaseQtty, decreaseQtty, calcTotal, removeFromCart } = useCart()
  const { token } = useUser()

  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  // Método para enviar carrito al backend
  const handleCheckout = async () => {
    setLoading(true)
    setSuccessMessage("")
  
    try {
      const response = await fetch('http://localhost:5000/api/checkouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // ✅ Aquí agregamos el token JWT
        },
        body: JSON.stringify({
          items: cart,
          total: calcTotal
        })
      })
  
      const data = await response.json()
  
      if (!response.ok) {
        throw new Error(data.message || 'Error al procesar el pago')
      }
  
      setSuccessMessage("✅ ¡Compra realizada con éxito!")
    } catch (error) {
      alert("❌ Error al realizar la compra: " + error.message)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="container mt-4">
      <h2 className="text-center">🛒 Carrito de compras</h2>

      {cart.length === 0 ? (
        <p className="text-center">El carrito está vacío</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>Imagen</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.img} alt={item.name} style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                </td>
                <td>{item.name}</td>
                <td className="text-center">{item.price.toLocaleString()}</td>
                <td className="text-center">{item.count}</td>
                <td className="text-center">${(item.price * item.count).toLocaleString()}</td>
                <td className="text-center">
                  <button className="btn btn-success btn-sm mx-1" onClick={() => increaseQtty(item.id)}>+</button>
                  <button className="btn btn-danger btn-sm mx-1" onClick={() => decreaseQtty(item.id)}>-</button>
                  <button className="btn btn-warning btn-sm mx-1" onClick={() => removeFromCart(item.id)}>🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h4 className="text-end mt-3">Total: ${calcTotal.toLocaleString()}</h4>

      <div className="text-end mt-3">
        <button
          className="btn btn-success btn-sm pagar-btn"
          disabled={!token || loading || cart.length === 0}
          onClick={handleCheckout}
        >
          {loading ? "Procesando..." : `Pagar: $${calcTotal.toLocaleString()}`}
        </button>
      </div>

      {successMessage && (
        <div className="alert alert-success text-center mt-3">
          {successMessage}
        </div>
      )}
    </div>
  )
}

export default Cart
