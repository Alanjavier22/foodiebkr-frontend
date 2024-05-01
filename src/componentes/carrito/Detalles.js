import { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { TiDelete } from "react-icons/ti";

import "./Carritos.css";

const Detalles = ({ Data }) => {
  const [total, setTotal] = useState(0);
  let cantidadActualizar = [];

  useEffect(() => {
    if (Data) {
      let suma = Data.reduce(
        (acumulador, elemento) => acumulador + elemento.subtotal,
        0
      );

      setTotal(suma);
    }
  }, [Data]);

  const deleteP = (item) => {
    let existeIndex = Data.findIndex((data) => data.nombre === item.nombre);

    if (existeIndex !== -1) {
      Data.splice(existeIndex, 1);
      localStorage.setItem("Carrito", JSON.stringify(Data));
      window.location.reload();
    }

    if (Data.length === 0) localStorage.removeItem("Carrito");
  };

  const handleChange = ({ value }, item) => {
    let existeIndex = cantidadActualizar.findIndex(
      (data) => data.nombre === item.nombre
    );

    if (existeIndex !== -1) {
      cantidadActualizar[existeIndex].cantidad = value;
    } else {
      cantidadActualizar.push({ nombre: item.nombre, cantidad: value });
    }
  };

  const recalcular = () => {
    for (let actualizar of cantidadActualizar) {
      let existeIndex = Data.findIndex(
        (data) => data.nombre === actualizar.nombre
      );

      if (existeIndex !== -1) {
        Data[existeIndex].cantidad = Number(actualizar.cantidad);
        Data[existeIndex].subtotal =
          Number(actualizar.cantidad) * parseFloat(Data[existeIndex].precio);
      }
    }

    localStorage.setItem("Carrito", JSON.stringify(Data));
    window.location.reload();
  };

  return (
    <>
      <Col className="pt-3">
        <div
          className="border-0 m-auto p-4 w-100"
          style={{ maxHeight: "70vh" }}
        >
          <Card className="px-5 pt-5 h-100 border-0">
            <div>
              <Table responsive="md" className="h-100">
                <thead>
                  <tr>
                    <th></th>
                    <th className="px-5 textDetalles" style={{ width: "50%" }}>
                      PRODUCTO
                    </th>
                    <th
                      className="px-2 textDetalles text-center"
                      style={{ width: "15%" }}
                    >
                      PRECIO
                    </th>
                    <th
                      className="px-2 textDetalles text-center"
                      style={{ width: "15%" }}
                    >
                      CANTIDAD
                    </th>
                    <th
                      className="px-2 textDetalles text-center"
                      style={{ width: "15%" }}
                    >
                      SUBTOTAL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Data &&
                    Data.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center h-100 justify-content-center fs-3">
                              <TiDelete
                                onClick={() => deleteP(item)}
                                style={{ cursor: "pointer" }}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={`/images/${item?.imagen}`}
                                width={100}
                                alt={item?.nombre}
                              />
                              {item?.nombre}{" "}
                              {item?.sabores ? ` - ` + item?.sabores : ""}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center h-100 justify-content-center">
                              ${item?.precio}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center h-100 justify-content-center">
                              <Form.Control
                                className="w-100"
                                type="number"
                                min={1}
                                defaultValue={item?.cantidad}
                                onChange={({ target }) =>
                                  handleChange(target, item)
                                }
                              />
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center h-100 justify-content-center">
                              ${item?.subtotal}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>

              <div className="d-flex justify-content-end">
                <Button
                  className="btnStore border-0 fs-6"
                  style={{ borderRadius: "50px", width: "300px" }}
                  onClick={recalcular}
                >
                  ACTUALIZAR CARRITO
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Col>

      <Row>
        <Col lg={6}></Col>
        <Col className="mx-4">
          <Card className="px-4 mx-4 py-3 mb-3 text-center marco">
            <h4 className="textDetalles">TOTALES DEL CARRITO</h4>
            <Card.Body className="text-start bg-white">
              <div
                className="d-flex flex-column justify-content-between"
                style={{ minHeight: "20vh" }}
              >
                <div className="d-flex justify-content-center align-items-center">
                  <Form.Label className="mt-2" style={{ textAlign: "left" }}>
                    Subtotal
                  </Form.Label>
                  <Form.Control
                    disabled
                    className="mx-2 border-0 bg-white text-end"
                    value={`$${total}`}
                  />
                </div>
                <hr />
                <div className="d-flex justify-content-center align-items-center fs-3">
                  <Form.Label className="mt-2" style={{ textAlign: "left" }}>
                    Total
                  </Form.Label>
                  <Form.Control
                    disabled
                    className="mx-2 border-0 bg-white text-end fs-3"
                    value={`$${total}`}
                  />
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
