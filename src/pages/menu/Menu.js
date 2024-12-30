import { useContext } from "react";
import { Link } from "react-router-dom";

import {
  Dropdown,
  DropdownButton,
  Navbar,
  Offcanvas,
  Container,
} from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import { FaUserTie } from "react-icons/fa";

import { CartContext } from "../../context/CartContext";

import MenuCliente from "./MenuCliente";
import MenuFoodieBkr from "./MenuFoodieBkr";
import { SubMenuCliente } from "./SubMenuCliente";

const Menu = ({ user }) => {
  const { dataCar } = useContext(CartContext);

  const { login, nombre, rol, id_rol } = user;

  const isCliente = Number(id_rol) === 4;
  const isAdmin = Number(id_rol) === 1;

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <div className="h-20">
        <Navbar
          expand={isCliente ? "lg" : "false"}
          fixed="top"
          className="h-20 bg-white w-screen border-b-2"
        >
          <Container
            fluid
            style={{
              justifyContent: isCliente ? "center" : "flex-start",
            }}
            className="h-full flex-wrap px-0"
          >
            <Navbar.Brand
              href={isCliente ? "/" : ""}
              className="mx-1 max-w-32 p-0"
            >
              <img
                src="/logo.png"
                alt="logo"
                width="100%"
                height="100%"
                style={{ minWidth: "100px" }}
              />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />

            {!isCliente && (
              <div className="flex justify-center items-center h-full ml-auto mr-5 px-3">
                <DropdownButton
                  title={`${nombre} (${rol.toLowerCase()})`}
                  id="opt-drop"
                  className="font-semibold text-gray-600 tracking-wider"
                >
                  <Dropdown.Item id="opt-drop-item" onClick={logout}>
                    CERRAR SESIÓN
                  </Dropdown.Item>
                </DropdownButton>
                <FaUserTie className="h-20" />
              </div>
            )}

            <Navbar.Offcanvas
              id="offcanvasNavbar-expand-lg"
              aria-labelledby="offcanvasNavbarLabel-expand-lg"
              placement="start"
              style={{ width: "270px" }}
            >
              <Offcanvas.Header className="p-0">
                <Offcanvas.Title
                  className="w-100"
                  id="offcanvasNavbarLabel-expand-lg"
                >
                  <img src="/logo.png" alt="logo" width="100%" height="100%" />
                  {isCliente && (
                    <>
                      <div className="pt-2 flex items-center justify-center colorCar">
                        <Link
                          to="/carrito"
                          className="font-semibold tracking-wider"
                        >
                          <div className="d-flex align-items-center">
                            <FiShoppingCart className="mx-3" />
                            <p
                              className="m-0"
                              style={{ fontSize: "16px" }}
                            >{`${dataCar?.cantidad} / $${dataCar?.valor}`}</p>
                          </div>
                        </Link>
                      </div>
                    </>
                  )}

                  {isCliente && login && (
                    <>
                      <div
                        id="canvasText"
                        className="py-3 min-h-72 absolute bottom-0 text-base w-full px-3 font-normal"
                      >
                        <p className="border-b-2 text-center font-semibold text-gray-600 tracking-wider">
                          {`${nombre} (${rol.toLowerCase()})`}
                        </p>

                        {SubMenuCliente.map(({ label, link }) => (
                          <Link
                            key={label}
                            to={link}
                            className="mx-1 p-2 uppercase font-semibold tracking-wider"
                          >
                            {label}
                          </Link>
                        ))}
                      </div>
                      <div
                        id="canvasText"
                        className="py-3 absolute bottom-0 text-base w-full px-3 font-normal"
                      >
                        <Link
                          onClick={logout}
                          className="mx-1 p-2 font-semibold tracking-wider"
                        >
                          CERRAR SESIÓN
                        </Link>
                      </div>
                    </>
                  )}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body
                id="canvasText"
                className="bg-white flex items-center h-7 px-2 pb-2"
              >
                {isCliente && (
                  <MenuCliente
                    datos={{ ...user, ...dataCar }}
                    logout={logout}
                  />
                )}

                {!isCliente && (
                  <MenuFoodieBkr isAdmin={isAdmin} logout={logout} />
                )}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default Menu;
