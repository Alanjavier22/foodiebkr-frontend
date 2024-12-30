import { Link } from "react-router-dom";

import { Nav } from "react-bootstrap";

const MenuFoodieBkr = ({ isAdmin, logout }) => (
  <Nav className="justify-content-center flex-grow-1 h-full">
    <p className="w-1/5"></p>

    {isAdmin &&
      [
        "DASHBOARD",
        "PRODUCTOS",
        "COTIZACIONES",
        "CLIENTES",
        "VENTAS",
        "INVENTARIO",
        "CODIGO DESCUENTO",
        "CURSOS",
        "AUDITORIA",
      ].map((text, idx) => (
        <Link
          key={idx}
          to={`/${text.toLowerCase().replace(" ", "-")}`}
          className="mx-1 p-2 font-semibold tracking-wider"
        >
          {text}
        </Link>
      ))}

    {!isAdmin && (
      <Link
        to="/cotizaciones"
        className="mx-1 p-2 font-semibold tracking-wider"
      >
        COTIZACIONES
      </Link>
    )}

    <p className="w-1/5 h-full"></p>
    <Link onClick={logout} className="mx-1 p-2 font-semibold tracking-wider">
      CERRAR SESIÓN
    </Link>
  </Nav>
);

export default MenuFoodieBkr;
