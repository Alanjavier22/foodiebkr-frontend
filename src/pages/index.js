import { Navigate } from "react-router-dom";

// Páginas del Sitio Web
import Home from "./home/Home";
import Login from "./home/Login";
import Register from "./home/Register";
import Recover from "./home/Recover";
import NewPass from "./home/externas/NewPass";
import Nosotros from "./nosotros/Nosotros";
import Contacto from "./contacto/Contacto";

import Carrito from "./carrito/Carrito";
import Cotizacion from "./cotizacion/tienda/Cotizacion";
import CursosTd from "./cursos/tienda/CursosTd";
import DetallesC from "./cursos/tienda/components/Detalles";

//Producto en tienda
import MenuOpc from "./producto/tienda/components/MenuOpc";
import Tienda from "./producto/tienda/Tienda";
import Categoria from "./producto/tienda/Categoria";
import SubCategoria from "./producto/tienda/SubCategoria";
import Detalles from "./producto/tienda/Detalles";
import Resultados from "./producto/tienda/Resultados";

//Inventario en tienda
import MenuOpcTd from "./inventario/tienda/components/MenuOpc";
import TiendaInventario from "./inventario/tienda/TiendaInventario";
import InventarioTd from "./inventario/tienda/InventarioTd";
import DetallesTd from "./inventario/tienda/Detalles";

//Para usuario admin, supervisor y empleado
import Cotizaciones from "./cotizacion/sistema/Cotizaciones";
import Cliente from "./cliente/sistema/Cliente";
import Productos from "./producto/sistema/Productos";
import Inventario from "./inventario/sistema/SistemaInventario";
import Offers from "./ofertas/Offers";
import CursoSis from "./cursos/sistema/CursoSis";
import Dashboard from "./dashboard/Dashboard";
import Auditory from "./auditoria/sistema/Auditory";

import MyData from "./cliente/cliente/MyData";
import MyQuotes from "./cotizacion/cliente/MyQuotes";
import MySales from "./ventas/MySales";

// Rutas iniciales cliente
const initialRoutes = () => [
  {
    path: "/",
    element: <Navigate to="/home" />,
    exact: true,
  },
  { path: "/login", element: <Login /> },
  { path: "/Recovery", element: <Recover /> },
  { path: "/register", element: <Register /> },
  { path: "/reset_password/:id_usuario/:token", element: <NewPass /> },
  { path: "/*", element: <Navigate to="/" replace /> },
];

// Rutas habilitadas para cliente
const clientRoutes = (user) => [
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/resultados/:nombre",
    element: (
      <MenuOpc>
        <Resultados />
      </MenuOpc>
    ),
  },
  {
    path: "/tienda",
    element: (
      <MenuOpc>
        <Tienda />
      </MenuOpc>
    ),
  },
  {
    path: "/categoria-producto/:id_producto/:producto",
    element: (
      <MenuOpc>
        <Categoria />
      </MenuOpc>
    ),
  },
  {
    path: "/categoria-producto/:id_producto/:producto/:id_subproducto/:subproducto",
    element: (
      <MenuOpc>
        <SubCategoria />
      </MenuOpc>
    ),
  },
  {
    path: "/producto/:id_categoria/:detalle",
    element: (
      <MenuOpc>
        <Detalles />
      </MenuOpc>
    ),
  },
  {
    path: "/productos",
    element: (
      <MenuOpcTd>
        <TiendaInventario />
      </MenuOpcTd>
    ),
  },
  //revisar hacer uno propio
  {
    path: "/inventario-producto/:id_producto/:producto",
    element: (
      <MenuOpcTd>
        <Categoria />
      </MenuOpcTd>
    ),
  },
  {
    path: "/inventario-producto/:id_producto/:producto/:id_subproducto/:subproducto",
    element: (
      <MenuOpcTd>
        <InventarioTd />
      </MenuOpcTd>
    ),
  },
  {
    path: "/inventario/:id_inventario/:detalle",
    element: (
      <MenuOpcTd>
        <DetallesTd />
      </MenuOpcTd>
    ),
  },
  {
    path: "/cursos",
    element: <CursosTd user={user} />,
  },
  {
    path: "/cursos/:id_curso/:nombre",
    element: <DetallesC />,
  },
  {
    path: "/carrito",
    element: <Carrito user={user} />,
  },
  {
    path: "/cotizacion",
    element: <Cotizacion user={user} />,
  },
  {
    path: "/contacto",
    element: <Contacto />,
  },
  {
    path: "/nosotros",
    element: <Nosotros />,
  },
];

// Rutas habilitadas para cliente
const clientRoutesLogin = (user) => [
  {
    path: "/perfil",
    element: <MyData user={user} />,
  },
  {
    path: "/mis-cotizaciones",
    element: <MyQuotes user={user} />,
  },
  {
    path: "/mis-compras",
    element: <MySales user={user} />,
  },
];

// Rutas iniciales usuarios con login
const initialRoutesLogin = (user) => [
  {
    path: "/",
    element: (
      <Navigate
        to={Number(user.id_rol) === 1 ? "/dashboard" : "/cotizaciones"}
      />
    ),
    exact: true,
  },
  { path: "/*", element: <Navigate to="/" replace /> },
];

// Rutas habilitadas para usuario administrador
const adminRoutes = (user) => [
  {
    path: "/productos",
    element: <Productos />,
  },
  {
    path: "/cotizaciones",
    element: <Cotizaciones user={user} />,
  },
  {
    path: "/clientes",
    element: <Cliente user={user} />,
  },
  {
    path: "/ventas",
    element: <MySales user={user} />,
  },
  {
    path: "/inventario",
    element: <Inventario user={user} />,
  },
  {
    path: "/codigo-descuento",
    element: <Offers user={user} />,
  },
  {
    path: "/cursos",
    element: <CursoSis user={user} />,
  },
  {
    path: "/dashboard",
    element: <Dashboard user={user} />,
  },
  {
    path: "/auditoria",
    element: <Auditory user={user} />,
  },
];

// Rutas habilitadas para usuario empleado
const employeeRoutes = (user) => [
  {
    path: "/cotizaciones",
    element: <Cotizaciones user={user} />,
  },
  //   {
  //     path: "/cliente",
  //     element: (
  //
  //         <Cliente user={user} />
  //
  //     ),
  //   },
];

// Rutas habilitadas para usuario superior
const supervisorRoutes = (user) => [
  {
    path: "/cotizaciones",
    element: <Cotizaciones user={user} />,
  },
];

function rutas(user) {
  const id_rol = Number(user.id_rol);
  const _rutas = [];

  if (id_rol === 4) {
    _rutas.push(...initialRoutes(user));
    _rutas.push(...clientRoutes(user));

    if (user.login) _rutas.push(...clientRoutesLogin(user));
  }

  if (id_rol !== 4) {
    _rutas.push(...initialRoutesLogin(user));

    if (id_rol === 1) _rutas.push(...adminRoutes(user));
    if (id_rol === 2) _rutas.push(...supervisorRoutes(user));
    if (id_rol === 3) _rutas.push(...employeeRoutes(user));
  }

  return _rutas;
}

export default rutas;
