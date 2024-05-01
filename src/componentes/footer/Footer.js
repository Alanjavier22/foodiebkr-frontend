import React from "react";
import { Col, Row } from "react-bootstrap";

import { FiInstagram } from "react-icons/fi";

const Footer = () => {
  return (
    <>
      <Row
        className="justify-content-center align-items-center py-2 pb-4 m-0 w-100"
        style={{ background: "#89e2d6", color: "white" }}
      >
        <Col xs={12} lg={4} className="d-flex justify-content-center">
          <div
            style={{ maxWidth: "290px" }}
            className="responsiveFooter px-4 py-3"
          >
            <img src="/logo.png" width={"100%"} />
          </div>
        </Col>
        <Col xs={12} lg={4}>
          <div className="responsiveFooter pt-3">
            <h6 className="float-right">CAKE STUDIO</h6>
            <hr style={{ width: "50px" }} />
            <p className="m-0">Creamos el pastel de tus sueños ✨️</p>
            <p className="m-0">Gye-Ecu📍</p>
            <p className="m-0">
              &copy; {new Date().getFullYear()} Maria Gabriela Foodie Baker,
              Inc.
            </p>
          </div>
        </Col>
        <Col xs={12} lg={4}>
          <div className="responsiveFooter pt-3">
            <h6 className="float-right">VISITA NUESTRAS REDES SOCIALES</h6>
            <hr className="mb-0" style={{ width: "50px" }} />
            <a
              href="https://www.instagram.com/lafoodiebaker/"
              target="_blank"
              className="fs-1 text-white"
            >
              <FiInstagram />
            </a>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Footer;
