import PropTypes from 'prop-types'

const Card = ({ img, name, price, ingredients }) => {
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
          <button className="btn btn-outline-dark">
            Ver Más <span role="img" aria-label="ver más">👀</span>
          </button>
          <button className="btn btn-dark">
            Añadir <span role="img" aria-label="carrito">🛒</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// Validación de las props
Card.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  img: PropTypes.string.isRequired,
}

export default Card
