import jwt_decode from "jwt-decode";

import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Container from "react-bootstrap/Container";

import { FiSearch, FiShoppingCart } from "react-icons/fi";

const Menu = () => {
  const dataCar = { cantidad: 0, valor: "0.00" };

  const token = localStorage.getItem("token");

  const { id = null, rol = "cliente" } = token ? jwt_decode(token) : {};

  const isAdmin = rol !== "cliente";

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <div style={{ height: "80px" }}>
        <Navbar
          expand="lg"
          fixed="top"
          style={{ height: "80px", background: "white", width: "100vw" }}
        >
          <Container fluid>
            <Navbar.Brand
              href="/"
              className="mx-5"
              style={{ maxWidth: "140px" }}
            >
              <img src="/logo.png" alt="logo" width={"100%"} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
            <Navbar.Offcanvas
              id="offcanvasNavbar-expand-lg"
              aria-labelledby="offcanvasNavbarLabel-expand-lg"
              placement="start"
              style={{ width: "300px" }}
            >
              <Offcanvas.Header className="p-0">
                <Offcanvas.Title
                  className="w-100"
                  id="offcanvasNavbarLabel-expand-lg"
                >
                  <InputGroup
                    className="m-0 p-3 rounded-0 boxShadowInput"
                    style={{ background: "#fffff" }}
                  >
                    <Form.Control
                      className="rounded-0"
                      placeholder="Buscar por productos"
                    />
                    <Button className="rounded-0" variant="secondary">
                      <FiSearch />
                    </Button>
                  </InputGroup>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body style={{ background: "#ffff" }} id="canvasText">
                <Nav className="justify-content-center flex-grow-1">
                  <Nav.Link href="/" className="mx-1">
                    INICIO
                  </Nav.Link>
                  <Nav.Link href="/tienda" className="mx-1">
                    TIENDA
                  </Nav.Link>
                  <Nav.Link href="/cotizacion" className="mx-1">
                    COTIZACION
                  </Nav.Link>

                  {isAdmin && (
                    <Nav.Link href="/cotizaciones" className="mx-1">
                      COTIZACIONES
                    </Nav.Link>
                  )}

                  {isAdmin && (
                    <Nav.Link href="/cliente" className="mx-1">
                      CLIENTE
                    </Nav.Link>
                  )}

                  <Nav.Link href="/contacto" className="mx-1">
                    CONTACTO
                  </Nav.Link>
                  <Nav.Link href="/nosotros" className="mx-1">
                    NOSOTROS
                  </Nav.Link>

                  {!id && (
                    <Nav.Link href="/login" className="mx-1">
                      LOGIN
                    </Nav.Link>
                  )}

                  {token && (
                    <Nav.Link onClick={logout} className="mx-1">
                      LOGOUT
                    </Nav.Link>
                  )}
                </Nav>

                <div
                  className="px-5 d-flex align-items-center colorCar"
                  id="navResponsive"
                >
                  <div>
                    <Dropdown>
                      <Dropdown.Toggle id="Search" variant="link">
                        <FiSearch />
                      </Dropdown.Toggle>
                      <Dropdown.Menu
                        style={{ width: "320px", padding: 0, left: "-250px" }}
                        className="boxShadowInput border-0"
                      >
                        <InputGroup
                          className="m-0 p-4 rounded-0 boxShadowInput"
                          style={{ background: "#F7F7F7" }}
                        >
                          <Form.Control
                            className="rounded-0"
                            placeholder="Buscar por productos"
                          />
                          <Button className="rounded-0" variant="secondary">
                            BUSCAR
                          </Button>
                        </InputGroup>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  <Link to="/carrito" className="">
                    <div className="d-flex align-items-center">
                      <FiShoppingCart className="mx-3" />
                      <p className="m-0">{`${dataCar?.cantidad} / $${dataCar?.valor}`}</p>
                    </div>
                  </Link>
                </div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default Menu;
