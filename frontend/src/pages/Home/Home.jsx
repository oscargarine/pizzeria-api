import { usePizzas } from '../../context/PizzaContext';
import CardPizza from '../../components/CardPizza/CardPizza';
import Header from '../../components/Header/Header';

const Home = () => {
  const { pizzas, loading, error } = usePizzas();

  if (loading) return <p className="text-center">Cargando pizzas...</p>;
  if (error) return <p className="text-center">Error: {error}</p>;

  return (
    <>
      <Header />
      <div className="contenedor-cards">
        <div className="cards">
          {pizzas.map((pizza) => (
            <CardPizza
              key={pizza.id}
              id={pizza.id}
              img={pizza.img}
              name={pizza.name}
              price={pizza.price}
              ingredients={pizza.ingredients}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
