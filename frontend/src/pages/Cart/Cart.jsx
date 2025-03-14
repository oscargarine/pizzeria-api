import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext'

const Cart = () => {
  const { cart, increaseQtty, decreaseQtty, calcTotal, removeFromCart } = useCart();
  const { token } = useUser() // Obtenemos el token del contexto

  // console.log("Carrito en Cart.jsx:", cart); // Verificar qué llega al carrito

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
          className="btn btn-success btn-sm text-end pagar-btn"
          disabled={ !token }//deshabilitamos el botón si el token es false
        >
          Pagar: ${calcTotal.toLocaleString()}
        </button>
      </div>
    </div>
  );
};

export default Cart;
