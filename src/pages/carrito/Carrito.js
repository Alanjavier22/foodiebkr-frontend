import { useContext } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../../context/CartContext";

import { Row, Form, Button } from "react-bootstrap";
import { BsCartX } from "react-icons/bs";

import Detalles from "./content/Detalles";

const Carrito = ({ user }) => {
  const { dataCar } = useContext(CartContext);

  return (
    <>
      <div className="textCotizar py-2">
        <h1 className="pt-3 text-center text-2xl font-semibold text-slate-100 uppercase tracking-wider">
          Carrito
        </h1>
      </div>

      {/* SI NO TIENE NADA EN EL CARRITO */}
      {Number(dataCar.cantidad) === 0 && (
        <Row className="contents w-full m-auto">
          <div
            className="flex flex-column justify-center items-center w-full gap-2"
            style={{ minHeight: "70vh" }}
          >
            <BsCartX className="text-gray-600" style={{ fontSize: "200px" }} />
            <Form.Label className="min-w-28 px-4 pt-3 text-center text-4xl font-semibold text-gray-600 uppercase tracking-wider">
              TU CARRITO ESTÁ VACÍO
            </Form.Label>
            <Form.Label className="min-w-28 mx-4 px-4 pb-3 text-center text-md font-semibold text-gray-600 uppercase tracking-wider">
              Antes de proceder a la compra debes añadir algún producto a tu
              carrito.
            </Form.Label>
            <Link to="/tienda" className="w-52">
              <Button className="w-52 btnStore border-0 p-2 uppercase tracking-wider">
                VOLVER A TIENDA
              </Button>
            </Link>
          </div>
        </Row>
      )}

      {/* SI TIENE NADA EN EL CARRITO */}
      {Number(dataCar.cantidad) !== 0 && (
        <Row className="contents w-full m-auto justify-end">
          <Detalles dataCar={dataCar} user={user} />
        </Row>
      )}
    </>
  );
};

export default Carrito;
