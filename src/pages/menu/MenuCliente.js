import { Link } from "react-router-dom";
import { DropdownButton, Dropdown, Nav } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import { FaUserTie } from "react-icons/fa";
import { SubMenuCliente } from "./SubMenuCliente";

const MenuCliente = ({ datos, logout }) => {
  const { login, nombre, rol, cantidad, valor } = datos;

  return (
    <nav className="w-full bg-white shadow-md py-3">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-lg font-bold tracking-wider">INICIO</Link>
          {["TIENDA", "PRODUCTOS", "COTIZACION", "CURSOS", "CONTACTO", "NOSOTROS"].map((text) => (
            <Link key={text} to={`/${text.toLowerCase()}`} className="text-sm font-medium tracking-wide hover:text-blue-500">
              {text}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/carrito" className="relative flex items-center">
            <FiShoppingCart className="text-xl" />
            <span className="ml-2 text-sm font-semibold">{`${cantidad} / $${valor}`}</span>
          </Link>

          {!login ? (
            <>
              <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="px-4 py-2 bg-gray-600 text-white rounded-md text-sm font-semibold hover:bg-gray-700">
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
