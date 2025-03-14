import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // Importamos el contexto del carrito
import { useUser } from '../../context/UserContext'; // Importamos el contexto del usuario

const NavbarComponent = () => {
  const { calcTotal } = useCart(); // Obtener el total acumulado del carrito



  // const token = false; // Falso token
  const { token, logout } = useUser() //Obtenemos el token y el logout del contexto
  const navigate = useNavigate()

  const formattedTotal = calcTotal.toLocaleString(); // Formateamos el total con separadores de miles
  const validateRoot = ({ isActive }) => isActive ? 'menu-active' : 'menu-inactive'

  // logout con redireccion opcional
  const handleLogout = () => {
    logout()
    navigate('/') // opcional: redirige al Home despues del logout
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="text-white">
      <Container>
        {/* Nombre de la empresa (izquierda) */}
        <Navbar.Brand href="#logo">
          <img
            src="/img/logo.png"
            alt="logo pizzería"
            className="d-inline-block align-top"
            style={{ width: '40px', height: '40px' }}
          />{' '}
          Pizzería Mamma Mia
        </Navbar.Brand>

        {/* Botón toggle para responsive */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Elementos del navbar */}
        <Navbar.Collapse id="navbar-nav">
          {/* Links al centro */}
          <Nav className="mx-auto">
            <NavLink to='/' className='text-decoration-none ms-3 text-white'>
              Home
            </NavLink>
            {token ? (
              <>
                <NavLink 
                  to='/profile' 
                  onClick={validateRoot}
                  className='text-decoration-none ms-3 text-white'>
                  Profile
                </NavLink>

                <NavLink 
                  to='#'
                  onClick={handleLogout}
                  className='text-decoration-none ms-3 text-white'>
                  Logout
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to='/login'
                  className='ms-3 text-decoration-none text-white'>
                    Login
                </NavLink>

                <NavLink
                  to='/register'
                  className={validateRoot}>
                  Register
                </NavLink>
              </>
            )}
          </Nav>

          {/* Botón de pagar (derecha) */}
          <Nav className="ms-auto">
            <Button 
              as={Link} 
              to='/cart' 
              className="mx-2"
              disabled={ !token }
            >
              🛒 Pagar: ${formattedTotal}
            </Button>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
