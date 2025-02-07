import { useState } from "react";
import { Link } from "react-router-dom";
import { DropdownButton, Dropdown, Nav } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import { FaUserTie } from "react-icons/fa";
import { SubMenuCliente } from "./SubMenuCliente";

const MenuCliente = ({ datos, logout }) => {
  const { login, nombre, rol, cantidad, valor } = datos;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md py-3">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Botón de menú hamburguesa */}
        <button className="block md:hidden text-gray-600 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

        {/* Menú de navegación */}
        <div className={`flex-col md:flex-row md:flex items-center space-x-4 ${menuOpen ? "flex" : "hidden"} md:flex`}>
          <Link to="/" className="text-lg font-bold tracking-wider hover:text-blue-500 transition">INICIO</Link>
          {["TIENDA", "PRODUCTOS", "COTIZACION", "CURSOS", "CONTACTO", "NOSOTROS"].map((text) => (
            <Link key={text} to={`/${text.toLowerCase()}`} className="text-sm font-medium tracking-wide hover:text-blue-500 transition">
              {text}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {/* Carrito de compras */}
          <Link to="/carrito" className="relative flex items-center">
            <FiShoppingCart className="text-xl" />
            {cantidad > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {cantidad}
              </span>
            )}
            <span className="ml-2 text-sm font-semibold">{`$${valor}`}</span>
          </Link>

          {!login ? (
            <>
              <Link to="/login" className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="px-5 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition">
                Registrarse
              </Link>
            </>
          ) : (
            <div className="relative flex items-center">
              <DropdownButton
                title={`${nombre} (${rol.toLowerCase()})`}
                id="opt-drop"
                className="text-sm font-semibold"
              >
                {SubMenuCliente.map(({ label, link }) => (
                  <Dropdown.Item key={label} as={Link} to={link} className="uppercase text-sm">
                    {label.toUpperCase()}
                  </Dropdown.Item>
                ))}
                <Dropdown.Divider />
                <Dropdown.Item onClick={logout} className="text-red-500 font-semibold">
                  CERRAR SESIÓN
                </Dropdown.Item>
              </DropdownButton>
              <FaUserTie className="ml-2 text-2xl text-gray-600" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MenuCliente;
