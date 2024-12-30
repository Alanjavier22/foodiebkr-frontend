import React, { useEffect, useState } from "react";

import { Col, Row, Form } from "react-bootstrap";

import BarChart from "../diagrams/BarChart";
import LineChart from "../diagrams/LineChart";
import RadarChart from "../diagrams/RadarChart ";
import CardDashboard from "./CardDashboard";
import { FormHeader } from "../../../components/FormContent";

const seccionDsh = (_seccion, option, setOption) => {
  if (_seccion === "Clientes") {
    return (
      <>
        <Row className="py-7">
          <Col>
            <LineChart
              path="mayor-compra"
              text="Clientes con Mayor Venta [ Mostrando 5 ]"
              scale={{ textY: "Valor", textX: "" }}
              isnumeric={true}
            />
          </Col>
        </Row>
        <Row className="py-7">
          <Col>
            <LineChart
              path="cliente-mayor-cotizacion"
              text="Clientes con Mayor cotización relizada [ Mostrando 5 ]"
              scale={{ textY: "Valor", textX: "" }}
              isnumeric={true}
            />
          </Col>
        </Row>
      </>
    );
  }

  if (_seccion === "Cotizaciones") {
    return (
      <>
        <Row className="py-7">
          <Col>
            <BarChart
              path="producto-mas-cotizacion"
              text="Productos más cotizados [ Mostrando 5 ]"
              scale={{ textY: "Cantidad", textX: "" }}
            />
          </Col>
        </Row>
        <Row className="py-7">
          <Col>
            <Form.Select
              value={option}
              onChange={(event) => setOption(event.target.value)}
              style={{ maxWidth: "320px" }}
            >
              <option value="cotizacion-fecha">COTIZACIONES POR MES</option>
              <option value="cotizacion-fecha-semana">
                COTIZACIONES POR SEMANA
              </option>
            </Form.Select>
            <BarChart
              path={option ? option : "cotizacion-fecha"}
              text="Cotizaciones por fecha"
              scale={{ textY: "Cantidad", textX: "" }}
            />
          </Col>
        </Row>
      </>
    );
  }

  if (_seccion === "Ventas") {
    return (
      <>
        <Row className="py-7">
          <Col>
            <RadarChart
              path="producto-mas-vendido"
              text="Producto más Vendido"
              scale={{
                textY: "Valor",
                textX: "Producto",
              }}
              isnumeric={true}
            />
          </Col>
        </Row>
        <Row className="py-7">
          <Col>
            <Form.Select
              value={option}
              onChange={(event) => setOption(event.target.value)}
              style={{ maxWidth: "320px" }}
            >
              <option value="ventas-fecha">VENTAS POR MES</option>
              <option value="ventas-fecha-semana">VENTAS POR SEMANA</option>
            </Form.Select>
            <BarChart
              path={option ? option : "ventas-fecha"}
              text="Ventas por fecha"
              scale={{ textY: "Valor", textX: "" }}
              isnumeric={true}
            />
          </Col>
        </Row>
      </>
    );
  }
};

const Seccion = ({ _seccion }) => {
  const [dashboard, setDashboard] = useState(null);
  const [option, setOption] = useState(null);

  useEffect(() => {
    const component = seccionDsh(_seccion, option, setOption);
    setDashboard(component);
  }, [_seccion, option]);

  useEffect(() => {
    setOption(null);
  }, [_seccion]);

  return (
    <div className="border-0 m-auto p-4" style={{ minHeight: "70vh" }}>
      <h1 className="text-gray-600 tracking-wide">Dashboard</h1>
      <Row className="pt-2">
        <Col md={6} xl={4}>
          <CardDashboard path="" label="total de ventas" icon="shop" />
        </Col>
        <Col md={6} xl={4}>
          <CardDashboard
            path="dia"
            label="total de ventas del día de hoy"
            icon="cash"
          />
        </Col>
      </Row>
      <FormHeader title={_seccion} className="text-base border-b-2 pt-4" />
      {dashboard}
    </div>
  );
};

export default Seccion;
