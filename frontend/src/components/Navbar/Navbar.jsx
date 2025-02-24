import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const NavbarComponent = () => {
  const total = 25000;
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
            <Button variant="outline-light" href="#home" className="mx-2">
              Home
            </Button>
            {/* Condicional: Si token es true, muestra Profile y Logout */}
            {token ? (
              <>
                <Button variant="outline-light" href="#profile" className="mx-2">
                  Profile
                </Button>
                <Button variant="outline-light" href="#logout" className="mx-2">
                  Logout
                </Button>
              </>
            ) : (
              /* Si token es false, muestra Login y Register */
              <>
                <Button variant="outline-light" href="login" className="mx-2">
                  Login
                </Button>
                <Button variant="outline-light" href="register" className="mx-2">
                  Register
                </Button>
              </>
            )}
          </Nav>

          {/* Botón de pagar (derecha) */}
          <Nav className="ms-auto">
            <Button variant="light" href="#total" className="mx-2">
            🛒Pagar: ${total.toLocaleString()}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
