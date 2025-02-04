import { Col, Row } from "react-bootstrap";
import { FiInstagram } from "react-icons/fi";

const Footer = () => {
  return (
    <>
      <Row className="justify-center items-center py-2 pr-4 pb-4 m-0 w-full bg-[#89e2d6] text-white">
        <Col xs={12} lg={4} className="d-flex justify-content-center">
          <div
            style={{ maxWidth: "290px" }}
            className="responsiveFooter px-4 py-3"
          >
            <img src="/logo.png" width="100%" alt="Logo" />
          </div>
        </Col>
        <Col xs={12} lg={4}>
          <div className="responsiveFooter py-3 text-center">
            <h4>CAKE STUDIO</h4>
            <h5 className="m-0">Creamos el pastel de tus sueños ✨️</h5>
            <h5 className="m-0">Gye-Ecu📍</h5>
            <h5 className="m-0">
              &copy; {new Date().getFullYear()} Maria Gabriela Foodie Baker, Inc.
            </h5>
          </div>
        </Col>
        <Col xs={12} lg={4} className="d-flex justify-content-center">
          <div className="responsiveFooter py-3 text-center">
            <h5>VISITA NUESTRAS REDES SOCIALES</h5>
            <a
              href="https://www.instagram.com/lafoodiebaker/"
              target="_blank"
              rel="noopener noreferrer"
              className="fs-1 text-white"
            >
              <FiInstagram />
            </a>
          </div>
        </Col>
      </Row>
      <div className="text-center py-2 bg-[#89e2d6] text-white">
        <a
          href="https://drive.google.com/file/d/1aezWSffEoG1xSp69L5npIwibjlKFDhWO/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline"
        >
          Políticas de envío y reembolso
        </a>
      </div>
    </>
  );
};

export default Footer;
