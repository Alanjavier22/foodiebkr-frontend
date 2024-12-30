import { Row, Col } from "react-bootstrap";

import Formulario from "./components/Formulario";
import Mapa from "./components/Mapa";

const Contacto = () => {
  return (
    <>
      <div className="textCotizar py-2">
        <h1 className="pt-3 text-center text-2xl font-semibold text-slate-100 uppercase tracking-wider">
          Contacto
        </h1>
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
