import { Link } from "react-router-dom";

import { DropdownButton, Dropdown, Nav } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import { FaUserTie } from "react-icons/fa";

import { SubMenuCliente } from "./SubMenuCliente";

const MenuCliente = ({ datos, logout }) => {
  const { login, nombre, rol, cantidad, valor } = datos;
  return (
    <>
      <Nav className="justify-center flex-grow-1 h-full">
        <p className="w-2/5"></p>

        <Link to="/" className="mx-1 p-2 font-semibold tracking-wider">
          INICIO
        </Link>

        {[
          "TIENDA",
          "PRODUCTOS",
          "COTIZACION",
          "CURSOS",
          "CONTACTO",
          "NOSOTROS",
        ].map((text, idx) => (
          <Link
            key={idx}
            to={`/${text.toLowerCase()}`}
            className="mx-1 p-2 font-semibold tracking-wider"
          >
            {text}
          </Link>
        ))}

        <p className="w-2/5 h-full"></p>

        <div
          className="px-0 d-flex align-items-center colorCar"
          id="navResponsive"
        >
          <Link to="/carrito" className="font-semibold tracking-wider">
            <div className="flex items-center justify-end w-36">
              <FiShoppingCart className="mx-3" />
              <p className="m-0 w-auto">{`${cantidad} / $${valor}`}</p>
            </div>
          </Link>
        </div>

        {!login && (
          <>
            <div id="navResponsive" className="px-3" />
            <Link
              to="/login"
              style={{ minWidth: "135px" }}
              className="mx-1 p-2 uppercase font-semibold tracking-wider"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              style={{ minWidth: "90px" }}
              className="mx-1 p-2 uppercase font-semibold tracking-wider"
            >
              Registrarse
            </Link>
            <div id="navResponsive" className="px-3" />
          </>
        )}
      </Nav>

      {login && (
        <>
          <div
            id="navResponsive"
            className="flex justify-center items-center h-full ml-auto mr-5 px-3"
          >
            <DropdownButton
              title={`${nombre} (${rol.toLowerCase()})`}
              id="opt-drop"
              className="font-semibold text-gray-600"
            >
              {SubMenuCliente.map(({ label, link }) => (
                <Dropdown.Item
                  id="opt-drop-item"
                  key={label}
                  to={link}
                  as={Link}
                  className="pl-3 uppercase"
                >
                  {label.toUpperCase()}
                </Dropdown.Item>
              ))}
              <Dropdown.Divider />
              <Dropdown.Item id="opt-drop-item" onClick={logout}>
                CERRAR SESIÓN
              </Dropdown.Item>
            </DropdownButton>
            <FaUserTie className="h-20" />
          </div>
        </>
      )}
    </>
  );
};

export default MenuCliente;
