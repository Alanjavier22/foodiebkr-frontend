import React from "react";

import Formulario from "./formulario/Formulario";
import Mapa from "./mapa/Mapa";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Contacto = () => {
  return (
    <>
      <div className="textCotizar py-2">
        <h1 className="text-center text-light">CONTACTO</h1>
      </div>

      <Row className="align-items-center w-100">
        <Col className="pt-3">
          <Formulario />
        </Col>
        <Col lg={5}>
          <Mapa />
        </Col>
      </Row>
    </>
  );
};

export default Contacto;
