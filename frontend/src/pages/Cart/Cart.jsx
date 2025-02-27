import {useState} from 'react'
import {pizzaCart} from '../../pizzas.js'

const Cart = () => {
  const [cart, setCart] = useState(pizzaCart)

  const increaseQtty = (id) => {
    setCart(prevCart => {
      const index = prevCart.findIndex(item => item.id === id)
      if (index === -1) return prevCart
  
      const newCart = [...prevCart]
      newCart[index] = { ...newCart[index], count: newCart[index].count + 1 }
      return newCart
    })
  }

  const decreaseQtty = (id) => {
    setCart(prevCart => {
      const index = prevCart.findIndex(item => item.id === id)
      if (index === -1) return prevCart
  
      const newCart = [...prevCart]
      if (newCart[index].count > 1) {
        newCart[index] = { ...newCart[index], count: newCart[index].count - 1 }
      } else {
        newCart.splice(index, 1) // Elimina el producto si count llega a 0
      }
      return newCart
    })
  }

  const calcTotal = cart.reduce((total, producto) => total + producto.price * producto.count, 0)


  return (
    <div className="container mt-4">
      <h2 className="text-center">🛒 Carrito de compras</h2>
      {cart.length === 0 ? (<p className="text-center">El carrito está vacío</p>) : (<table className="table table-bordered mt-3">
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
          {cart.map((item) => 
            <tr key={item.id}>
              <img src={item.img} alt={item.name} style={{ width: "50px", height: "50px", objectFit: "cover" }} />
              <td>{item.name}</td>
              <td className="text-center">{item.price.toLocaleString()}</td>
              <td className="text-center">{item.count}</td>
              <td className="text-center">${(item.price * item.count).toLocaleString()}</td>
              <td className="text-center">
                <button className="btn btn-success btn-sm mx-1" onClick={() => increaseQtty(item.id)}>+</button>
                <button className="btn btn-danger btn-sm  mx-1" onClick={() => decreaseQtty(item.id)}>-</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      )}

      <h4 className="text-end mt-3">Total: ${calcTotal.toLocaleString()}</h4>
      <div className="text-end mt-3">
        <button className="btn btn-success btn-sm text-end pagar-btn">Pagar: ${calcTotal.toLocaleString()}</button>
      </div>

    </div>
  )
}

export default Cart