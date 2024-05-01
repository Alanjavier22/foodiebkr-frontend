import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas del Sitio Web
import Home from "./componentes/home/Home";
import Nosotros from "./componentes/nosotros/Nosotros";
import Cotizacion from "./componentes/Cotizaciones/Cotizacion";
import Contacto from "./componentes/contacto/Contacto";
import Tienda from "./componentes/tienda/Tienda";
import Categoria from "./componentes/tienda/categoria/Categoria";
import SubCategoria from "./componentes/tienda/subCategoria/SubCategoria";
import Detalles from "./componentes/tienda/detalles/Detalles";

import Menu from "./componentes/menu/Menu";
import Footer from "./componentes/footer/Footer";
import Cotizaciones from "./componentes/Cotizaciones/Cotizaciones";
import Login from "./componentes/login/Login";
import Cliente from "./componentes/cliente/Cliente";
import AddProducto from "./componentes/tienda/producto/agregarProducto";
import Carrito from "./componentes/carrito/Carrito";

function App() {
  // localStorage.removeItem("token")

  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        {/* Páginas */}
        <Route exact path="/" element={<Home />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/categoria-producto/:categoria" element={<Categoria />} />
        <Route
          path="/categoria-producto/:categoria/:subCategoria"
          element={<SubCategoria />}
        />
        <Route path="/producto/:detalle" element={<Detalles />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/cotizacion" element={<Cotizacion />} />
        <Route path="/cotizaciones" element={<Cotizaciones />} />
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/contacto" element={<Contacto />} />

        <Route path="/addProducto" element={<AddProducto />} />
        <Route path="/carrito" element={<Carrito />} />

        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
