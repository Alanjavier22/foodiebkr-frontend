import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import { FaUserTie } from "react-icons/fa";

import { SubMenuCliente } from "./SubMenuCliente";

const MenuCliente = ({ datos, logout }) => {
  const { login, nombre, rol, cantidad, valor } = datos;

  return (
    <>
      {/* El navbar se fija al tope usando fixed="top" */}
      <Navbar bg="light" expand="lg" className="shadow-sm" fixed="top">
        <Container>
          {/* Ocultamos la marca o logo; si deseas colocar un logo, puedes incluir un <img> o texto aquí */}
          {/* 
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            MARÍA
          </Navbar.Brand> 
          */}

          <Navbar.Toggle aria-controls="menu-cliente" />
          <Navbar.Collapse id="menu-cliente">
            <Nav className="me-auto align-items-center">
              <Nav.Link as={Link} to="/" className="fw-bold">
                INICIO
              </Nav.Link>
              {["TIENDA", "PRODUCTOS", "COTIZACION", "CURSOS", "CONTACTO", "NOSOTROS"].map(
                (text, idx) => (
                  <Nav.Link
                    key={idx}
                    as={Link}
                    to={`/${text.toLowerCase()}`}
                    className="fw-bold"
                  >
                    {text}
                  </Nav.Link>
                )
              )}
            </Nav>

            <Nav className="ms-auto align-items-center">
              {/* Carrito */}
              <Nav.Link as={Link} to="/carrito" className="d-flex align-items-center">
                <FiShoppingCart className="mx-2" size={20} />
                <span>{`${cantidad} / $${valor}`}</span>
              </Nav.Link>

              {/* Autenticación */}
              {!login ? (
                <>
                  <Nav.Link
                    as={Link}
                    to="/login"
                    className="text-uppercase fw-bold mx-2"
                    style={{ minWidth: "135px" }}
                  >
                    Iniciar Sesión
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/register"
                    className="text-uppercase fw-bold mx-2"
                    style={{ minWidth: "90px" }}
                  >
                    Registrarse
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Dropdown align="end" className="mx-2">
                    <Dropdown.Toggle
                      variant="light"
                      id="dropdown-usuario"
                      className="text-uppercase fw-bold"
                    >
                      {`${nombre} (${rol.toLowerCase()})`}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {SubMenuCliente.map(({ label, link }) => (
                        <Dropdown.Item
                          as={Link}
                          to={link}
                          key={label}
                          className="text-uppercase"
                        >
                          {label}
                        </Dropdown.Item>
                      ))}
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={logout}>Cerrar Sesión</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <FaUserTie size={24} className="ms-2" />
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Este margen asegura que el contenido no sea tapado por el navbar fijo */}
      <div style={{ marginTop: "70px" }}></div>
    </>
  );
};

export default MenuCliente;
