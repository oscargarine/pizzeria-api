import { useParams } from 'react-router-dom';
import { usePizzas } from '../../context/PizzaContext'; // ← Importamos el contexto

const Pizza = () => {
  const { id } = useParams(); // ← Obtenemos el ID desde la URL
  const { pizzas, loading, error } = usePizzas(); // ← Usamos los datos del contexto

  // Buscar la pizza correspondiente y validamos que sea como string
  const pizza = pizzas.find((p) => String(p.id) === id);

  if (loading) return <p className="text-center mt-5">Cargando pizza...</p>;
  if (error) return <p className="text-center mt-5 text-danger">Error: {error}</p>;
  if (!pizza) return <p className="text-center mt-5">Pizza no encontrada</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow-lg mb-4" style={{ maxWidth: "600px", margin: "auto" }}>
        <div className="p-3">
          <img 
            src={pizza.img} 
            className="card-img-top rounded-4 border border-white"
            alt={`Imagen de ${pizza.name}`} 
            style={{ objectFit: "cover", height: "300px", borderWidth: "5px" }} 
          />
        </div>

        <div className="card-body text-center">
          <h4 className="card-title fw-bold">{pizza.name}</h4>

          <hr />
          <p className="card-text"><strong>Ingredientes:</strong></p>
          <ul className="list-unstyled">
            {Array.isArray(pizza.ingredients) && pizza.ingredients.length > 0 ? (
              pizza.ingredients.map((ingredient) => (
                <li key={ingredient}>🍕 {ingredient}</li>
              ))
            ) : (
              <li>No disponibles</li>
            )}
          </ul>

          <p className="card-text fs-5 mt-2">
            <strong>Precio:</strong> ${pizza.price.toLocaleString()}
          </p>

          <p className="card-text fs-5 mt-2">
            <strong>Descripción:</strong> {pizza.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
