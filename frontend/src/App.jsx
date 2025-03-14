import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import { UserProvider } from './context/UserContext'
import { useUser } from './context/UserContext'

// Ruta protegida. Solo accesible si el token es true
const PrivateRoute = ({ children}) => {
  const { token } = useUser()
  return token ? children : <Navigate to='/login' />
}

// Ruta pública. Solo accesible si el token es false
const PublicRoute = ({ children }) => {
  const { token } = useUser()
  return !token ? children : <Navigate to='/' />
}


const App = () => {
  return (

    <UserProvider>
      <PizzaProvider>
        <CartProvider> {/* Envolvemos la aplicación con el contexto */}
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path='/' element={<Home />} />
                {/* Rutas públicas. Solo si no hay token */}
                <Route path='/login' element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>

                  } />

                  {/* Rutas públicas. Solo si no hay token */}
                <Route path='/register' element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>

                  } />

                <Route path='/cart' element={<Cart />} />
                <Route path='/pizza/:id' element={<Pizza />} />
                <Route path='/404' element={<NotFound />} />

                  {/* Ruta PRIVADA. Solo si no HAY token */}
                <Route path='/profile' element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                  } />


                <Route path='*' element={<NotFound />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </CartProvider>
      </PizzaProvider>
    </UserProvider>

  );
};

export default App;
