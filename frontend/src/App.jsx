import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import Cart from './pages/Cart/Cart';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Pizza from './pages/Pizza/Pizza';
import NotFound from './pages/NotFound/NotFound';
import Profile from './components/Profile/Profile';
import { CartProvider } from './context/CartContext'; // Importamos el contexto para el carrito
import { PizzaProvider } from './context/PizzaContext'

const App = () => {
  return (

    <PizzaProvider>
      <CartProvider> {/* Envolvemos la aplicación con el contexto */}
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/pizza/p001' element={<Pizza />} />
              <Route path='/404' element={<NotFound />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </CartProvider>
    </PizzaProvider>

  );
};

export default App;
