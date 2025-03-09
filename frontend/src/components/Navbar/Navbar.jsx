import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // Importamos el contexto del carrito

const NavbarComponent = () => {
  const { calcTotal } = useCart(); // Obtener el total acumulado del carrito

  const formattedTotal = calcTotal.toLocaleString(); // Formateamos el total con separadores de miles

  const token = false; // Cambia a true para probar el comportamiento

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
            <Link to='/' className='text-decoration-none ms-3 text-white'>
              Home
            </Link>
            {token ? (
              <>
                <Link to='/profile' className='text-decoration-none ms-3 text-white'>
                  Profile
                </Link>
                <Link to='/logout' className='text-decoration-none ms-3 text-white'>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to='/login' className='text-decoration-none ms-3 text-white'>
                  Login
                </Link>
                <Link to='/register' className='text-decoration-none ms-3 text-white'>
                  Register
                </Link>
              </>
            )}
          </Nav>

          {/* Botón de pagar (derecha) */}
          <Nav className="ms-auto">
            <Button as={Link} to='/cart' className="mx-2">
              🛒 Pagar: ${formattedTotal}
            </Button>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
