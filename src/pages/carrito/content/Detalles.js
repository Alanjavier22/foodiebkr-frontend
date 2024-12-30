import { useState, useRef } from "react";
import { Link } from "react-router-dom";

import { Row, Col, Form, Card, Button } from "react-bootstrap";

import Tabla from "../Components/Tabla";
import DatosCliente from "./DatosCliente";
import PayPalButton from "../../paypal/PayPalButton";

import "../../../assets/styles/Carritos.css";

const Detalles = ({ dataCar, user }) => {
  const cartDetails = JSON.parse(localStorage.getItem("Carrito") || null);
  const { login } = user;
  const [data, setData] = useState(null);

  const UpdateForm = (datos) => setData(datos);

  const formikRef = useRef();

  return (
    <>
      <div className="border-0 m-auto p-4 w-100" style={{ maxHeight: "70vh" }}>
        <Tabla data={cartDetails} user={user} />
      </div>

      <Row className="flex justify-center items-start">
        <Col
          md={12}
          xl={6}
          className="flex items-center justify-center mx-1 pt-2"
        >
          {login && (
            <div className="textDetalles py-2">
              <DatosCliente
                UpdateForm={UpdateForm}
                formikRef={formikRef}
                user={user}
              />
            </div>
          )}
        </Col>
        <Col className="mx-1 pt-3">
          <Card className="px-4 mx-4 py-3 mb-3 text-center marco">
            <div className="textDetalles py-2">
              <h2 className="pt-3 text-center text-2xl font-semibold uppercase tracking-wider">
                TOTALES DEL CARRITO
              </h2>
            </div>
            <Card.Body className="text-start bg-white">
              <div
                className="flex flex-column justify-between"
                style={{ minHeight: "25vh" }}
              >
                {login && data && (
                  <>
                    <Form.Label className="min-w-36 px-4 pt-3 text-center text-md font-semibold text-gray-600 uppercase tracking-wider">
                      Realiza tu pago con
                    </Form.Label>

                    <PayPalButton datosCliente={data} />
                  </>
                )}

                {login && !data && (
                  <>
                    <div className="flex w-full pt-3 justify-center items-center">
                      <Button
                        className="btnStore bg-slate-400 px-4 py-2 border-0 rounded-3 tracking-wider"
                        onClick={() => formikRef.current.submitForm()}
                      >
                        Proceder con la compra
                      </Button>
                    </div>
                  </>
                )}

                {!login && (
                  <>
                    <Form.Label className="min-w-36 px-4 pt-3 text-center text-md font-semibold text-gray-600 uppercase tracking-wider">
                      Iniciar Sesión para realizar la compra
                    </Form.Label>
                    <Link to="/login" className="w-52 self-center pb-2">
                      <Button className="w-52 btnStore border-0 p-2 uppercase tracking-wider">
                        Login
                      </Button>
                    </Link>
                  </>
                )}

                <div className="flex justify-between items-center border-b-2 pt-3">
                  <Form.Label className="min-w-36 px-4 pt-3 text-start text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Subtotal
                  </Form.Label>
                  <Form.Label className="min-w-36 px-4 pt-3 text-right text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    ${dataCar.subtotal}
                  </Form.Label>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <Form.Label className="min-w-36 px-4 pt-3 text-start text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    iva ({dataCar.iva}%)
                  </Form.Label>
                  <Form.Label className="min-w-36 px-4 pt-3 text-right text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    {dataCar.totalIva}
                  </Form.Label>
                </div>
                <div className="flex justify-between items-center border-b-2 pt-2">
                  <Form.Label className="min-w-36 px-4 pt-3 text-start text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Descuento ({dataCar.descuento || "0"}%)
                  </Form.Label>
                  <Form.Label className="min-w-36 px-4 pt-3 text-right text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    {dataCar.descuento ? "$" + dataCar.totalDesc : "$0.00"}
                  </Form.Label>
                </div>
                <div className="flex justify-between items-center mt-0">
                  <Form.Label className="min-w-36 px-4 pt-3 text-start text-xl font-semibold text-gray-600 uppercase tracking-wider">
                    Total
                  </Form.Label>
                  <Form.Label className="min-w-36 px-4 pt-3 text-right text-xl font-semibold text-gray-600 uppercase tracking-wider">
                    ${dataCar.total}
                  </Form.Label>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Detalles;
