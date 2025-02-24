import { useState, useEffect } from 'react'
import Header from '../Header/Header'
import CardPizza from '../CardPizza/CardPizza'
// import { pizzas } from '../../pizzas.js'

const Home = () => {
  const [pizzas, setPizzas] = useState([])

  const BASE_URL = 'http://localhost:5000/api/pizzas'
  const getPizzas = async () => {
    try {
      const res = await fetch( BASE_URL )
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`)
      }
      const data = await res.json()
      console.log(data)
      return setPizzas(data)
    }catch(error){
      console.log("Error obteniendo las Pizzas", error.message)
    }

  }

  useEffect(() => {
    getPizzas()
  }, [])

  return (
    <>
      <Header />

    <div className="contenedor-cards">
      <div className="cards">

        {pizzas.map((pizza) => (
          <CardPizza 
            key={pizza.id}
            img={pizza.img}
            ingredients={pizza.ingredients} 
            name={pizza.name}
            price={pizza.price}
          />
        ))}

      </div>
    </div>



      
    </>
  )
}

export default Home