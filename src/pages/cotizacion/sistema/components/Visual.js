import { useState } from "react";

import { Row, Col, Form } from "react-bootstrap";

const Visual = ({ rows }) => {
  const formData = {
    id: rows?.cotizacion?.id,
    id_cliente: rows?.cliente?.id,
    atendido_por: rows?.cotizacion?.atendido_por || null,
    estado: rows?.cotizacion?.estado,
    envio: rows?.cotizacion?.envio || "-",
    precio_estimado: rows?.cotizacion?.precio_estimado,
    precio_final: rows?.cotizacion?.precio_final || "",
  };

  return (
    <>
      <div className="px-4 pb-3 pt-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
        Visual Cotización
      </div>

      {formData["atendido_por"] && (
        <Row className="flex w-full justify-between items-center">
          <Col md={12} xl={6}>
            <div className="flex w-full pl-2 items-center">
              <Form.Label className="min-w-28 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                atendido por
              </Form.Label>
              <Form.Label className="w-full ml-4 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {formData["atendido_por"]}
              </Form.Label>
            </div>
          </Col>
        </Row>
      )}

      <Row className="flex w-full justify-between items-center">
        <Col md={12} xl={6}>
          <div className="flex w-full pl-2 items-center">
            <Form.Label className="min-w-28 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Estado
            </Form.Label>
            <div className="w-full flex px-0 py-2">
              <Form.Control
                type="text"
                size="sm"
                disabled
                value={formData["estado"] === "Nt" ? "No Atendido" : "Atendido"}
                className="w-full h-full ml-4 px-2 py-2 border-b-2 text-left text-xs font-semibold text-gray-600 tracking-wider"
              />
            </div>
          </div>
        </Col>

        {formData.estado === "A" && (
          <Col md={12} xl={6}>
            <div className="flex w-full pl-2 items-center">
              <Form.Label className="min-w-28 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Envio
              </Form.Label>
              <div className="w-full flex px-0 py-2">
                <Form.Control
                  type="text"
                  size="sm"
                  disabled
                  value={
                    formData["envio"] === "Ac"
                      ? "Aceptado"
                      : formData["envio"] === "R"
                      ? "Rechazado"
                      : "En Espera"
                  }
                  className="w-full h-full ml-4 px-2 py-2 border-b-2 text-left text-xs font-semibold text-gray-600 tracking-wider"
                />
              </div>
            </div>
          </Col>
        )}
      </Row>

      <Row className="flex w-full justify-between items-center">
        <Col md={12} xl={6}>
          <div className="flex w-full pl-2 items-center">
            <Form.Label className="w-28 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              VALOR ESTIMADO (SIN IVA)
            </Form.Label>
            <div className="w-full flex px-0 py-2">
              <Form.Control
                type="text"
                size="sm"
                disabled
                value={"$" + formData["precio_estimado"]}
                className="w-full h-full ml-4 px-2 py-2 border-b-2 text-left text-xs font-semibold text-gray-600 tracking-wider"
              />
            </div>
          </div>
        </Col>

        {formData.envio === "Ac" && (
          <Col md={12} xl={6}>
            <div className="flex w-full pl-2 items-center">
              <Form.Label className="min-w-28 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Precio Final
              </Form.Label>
              <div className="w-full flex px-0 py-2">
                <Form.Control
                  type="text"
                  size="sm"
                  value={formData["precio_final"]}
                  disabled
                  className="w-full h-full ml-4 px-2 py-2 border-b-2 text-left text-xs font-semibold text-gray-600 tracking-wider"
                />
              </div>
            </div>
          </Col>
        )}
      </Row>
    </>
  );
};

export default Visual;
