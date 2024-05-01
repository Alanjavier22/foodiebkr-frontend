import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { BsCartX } from "react-icons/bs";
import Detalles from "./Detalles";

const Carrito = () => {
  const datosCarrito = JSON.parse(localStorage.getItem("Carrito") || null);

  console.log(datosCarrito)

  return (
    <>
      <div className="textCotizar py-2">
        <h1 className="text-center text-light">Carrito</h1>
      </div>

      {/* SI NO TIENE NADA EN EL CARRITO */}
      {!datosCarrito && (
        <Row className="align-items-center w-100">
          <div
            className="d-flex flex-column justify-content-center align-items-center w-100 gap-2"
            style={{ minHeight: "70vh" }}
          >
            <BsCartX style={{ fontSize: "200px", color: "gray" }} />
            <h1>TU CARRITO ESTÁ VACÍO</h1>
            <p>
              Antes de proceder a la compra debes añadir algún producto a tu
              carrito.
            </p>
            <Link to="/tienda" style={{ width: "200px" }}>
              <Button
                className="btnStore border-0"
                style={{
                  borderRadius: "50px",
                  width: "200px",
                  padding: "13px",
                }}
              >
                VOLVER A TIENDA
              </Button>
            </Link>
          </div>
        </Row>
      )}

      {/* SI TIENE NADA EN EL CARRITO */}
      {datosCarrito && (
        <Row className="align-items-center w-100 flex-column">
          <Detalles Data={datosCarrito} />
        </Row>
      )}
    </>
  );
};

export default Carrito;
