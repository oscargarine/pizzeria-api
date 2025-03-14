import PropTypes from 'prop-types';
import { useCart } from '../../context/CartContext'; // Importamos el contexto
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'; // Para mejorar compatibilidad con React
import { Link } from 'react-router-dom'

const MySwal = withReactContent(Swal);

const Card = ({ img, name, price, ingredients, id }) => {
  const { addToCart } = useCart(); // Usamos la función para agregar al carrito

  // Producto que se agregará al carrito
  const handleAddToCart = () => {
    const product = { id, name, price, img };
    addToCart(product);

    // Mostrar alerta con estilo reducido
    MySwal.fire({
      title: "✅ Agregado",
      text: `"${name}" añadido al carrito.`,
      icon: "success",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500, // Más rápido
      width: "250px", // Reducimos el tamaño del mensaje
      padding: "5px", // Menos espacio dentro del popup
      customClass: {
        popup: "small-toast", // Clases personalizadas
      },
    });
  };

  return (
    <div className="card custom-card">
      {/* Imagen */}
      <img src={img} className="card-img-top" alt={`Imagen de ${name}`} />

      {/* Cuerpo */}
      <div className="card-body">
        {/* Título */}
        <h5 className="card-title text-center">{name}</h5>

        {/* Ingredientes con lista */}
        <div className="card-text text-center">
          <strong>Ingredientes:</strong>
          <ul className="list-unstyled">
            {Array.isArray(ingredients) && ingredients.length > 0 ? (
              ingredients.map((ingredient) => (
                <li key={ingredient}>🍕 {ingredient}</li>
              ))
            ) : (
              <li>No disponibles</li>
            )}
          </ul>
        </div>

        {/* Precio */}
        <p className="card-text text-center">
          <strong>Precio:</strong> ${price.toLocaleString()}
        </p>

        {/* Botones */}
        <div className="d-flex justify-content-around mt-3">
          <Link to={`/pizza/${id}`} className="btn btn-outline-dark">
            Ver Más <span role="img" aria-label="ver más">👀</span>
          </Link>
          <button className="btn btn-dark" onClick={handleAddToCart}>
            Añadir <span role="img" aria-label="carrito">🛒</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Validación de las props
Card.propTypes = {
  id: PropTypes.string.isRequired, // Agregado para identificar el producto
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  img: PropTypes.string.isRequired,
};

export default Card;
