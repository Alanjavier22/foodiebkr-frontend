import { BrowserRouter, Routes, Route } from "react-router-dom";

import Menu from "./pages/menu/Menu";
import Footer from "./pages/footer/Footer";
import SpinnerFetch from "./components/SpinnerFetch";

import HasToken from "./auth/HasToken";

import { CartProvider } from "./context/CartContext";
import { LoadProvider } from "./context/LoadContext";

import rutas from "./pages/index";

function App() {
  const user = HasToken();
  const _routes = rutas(user);

  return (
    <BrowserRouter>
      <LoadProvider>
        <SpinnerFetch />
        <CartProvider>
          <Menu user={user} />
          <Routes>
            {_routes &&
              _routes.map((route, index) => <Route key={index} {...route} />)}
          </Routes>
          <Footer />
        </CartProvider>
      </LoadProvider>
    </BrowserRouter>
  );
}

export default App;
