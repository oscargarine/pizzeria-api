import { useState, useEffect } from 'react'
// import './Pizza.css'

const Pizza = () => {


  const [pizza, setPizza] = useState([])
  
  const BASE_URL = "http://localhost:5000/api/pizzas"

  const getPizza = async () => {
    try {
      const res = await fetch(`${BASE_URL}/p001`)
      const data = await res.json()
      setPizza(data)
    }catch (error){
      console.log(error.message)
    }
  }

  //controlamos la funcion para ver que se nse ejecute a cada rato
  useEffect(() => {
    getPizza()
  }, [])

  console.log(pizza)

  return (
    <div className="container mt-4">
      <div className="card shadow-lg mb-4" style={{ maxWidth: "600px", margin: "auto" }}>
        
        {/* Imagen con bordes blancos y redondeados */}
        <div className="p-3">
          <img 
            src={pizza.img} 
            className="card-img-top rounded-4 border border-white"
            alt={`Imagen de ${pizza.name}`} 
            style={{ objectFit: "cover", height: "300px", borderWidth: "5px" }} 
          />
        </div>
  
        {/* Cuerpo de la tarjeta */}
        <div className="card-body text-center">
          
          {/* Título */}
          <h4 className="card-title fw-bold">{pizza.name}</h4>
  
          {/* Ingredientes con lista */}
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
  
          {/* Precio */}
          <p className="card-text fs-5 mt-2">
            <strong>Precio:</strong> ${pizza.price?.toLocaleString()}
          </p>

        </div>
      </div>
    </div>
  );
  

}  

export default Pizza
