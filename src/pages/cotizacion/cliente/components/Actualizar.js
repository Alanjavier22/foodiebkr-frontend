import { useState } from "react";

import { Row, Col, Form, Image } from "react-bootstrap";
import { FormHeader, FormSubheader } from "../../../../components/FormContent";

const Actualizar = ({ rows }) => {
  const formData = {
    id: rows?.cotizacion?.id,
    id_cliente: rows?.cliente?.id,
    atendido_por: rows?.cotizacion?.atendido_por || "",
    estado: rows?.cotizacion?.estado,
    envio: rows?.cotizacion?.envio || "-",
    precio_estimado: rows?.cotizacion?.precio_estimado,
    precio_final: rows?.cotizacion?.precio_final || "",
    observacion_rechazo: rows?.cotizacion?.observacion_rechazo || "",
    imagenPago: rows?.cotizacion?.imagenPago,
  };

  return (
    <>
      <div className="flex flex-col" style={{ minHeight: "50vh" }}>
        <FormHeader title="Actualizar Cotización" />

        {rows?.cotizacion?.estado && rows?.cotizacion?.estado !== "Nt" && (
          <Row className="flex w-full justify-between items-stretch">
            <Col md={12} xl={6}>
              <div className="flex w-full pl-2 items-center">
                <Form.Label className="w-1/2 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  atendido por
                </Form.Label>
                <Form.Label className="w-full ml-4 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {formData["atendido_por"] || "-"}
                </Form.Label>
              </div>
            </Col>
          </Row>
        )}

        <Row className="flex w-full justify-between items-center pt-2">
          <Col md={12} xl={6}>
            <div className="flex w-full pl-2 items-center">
              <Form.Label className="w-1/2 px-4 py-3 mr-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Estado
              </Form.Label>
              <Form.Label className="w-full ml-4 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {formData["estado"] === "Nt" ? "No Atendido" : "Atendido"}
              </Form.Label>
            </div>
          </Col>
          {formData.estado === "A" && (
            <Col md={12} xl={6}>
              <div className="flex w-full pl-2 items-center">
                <Form.Label className="w-1/2 px-4 py-3 mr-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Envio
                </Form.Label>
                <Form.Label className="w-full ml-4 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {formData["envio"] === "Ac"
                    ? "Aceptado"
                    : formData["envio"] === "R"
                    ? "Rechazado"
                    : formData?.imagenPago
                    ? "En espera de revisión"
                    : "En espera de comprobante"}
                </Form.Label>
              </div>
            </Col>
          )}
        </Row>

        <Row className="flex w-full justify-between items-baseline">
          {formData.precio_estimado && (
            <Col md={12} xl={6}>
              <div className="flex w-full pl-2 items-center">
                <Form.Label className="w-1/2  px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  VALOR ESTIMADO
                </Form.Label>
                <Form.Label className="w-full ml-4 px-4 py-3 border-b-2 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  {"$" + (formData["precio_estimado"] || "0.00")}
                </Form.Label>
              </div>

              <FormSubheader text="El valor presentado no considera iva" />
            </Col>
          )}
          {formData.envio === "Ac" && (
            <Col md={12} xl={6}>
              <div className="flex w-full pl-2 items-center">
                <Form.Label className="w-1/2 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Precio Final
                </Form.Label>
                <Form.Label className="w-full ml-4 px-4 py-3 border-b-2 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  {formData["precio_final"]}
                </Form.Label>
              </div>
            </Col>
          )}
        </Row>

        {formData.envio === "R" && (
          <Row className="flex w-full justify-between items-center pt-2">
            <Col md={12} xl={12}>
              <div className="flex w-full pl-2 pb-2 items-center">
                <Form.Label
                  id="Ajuste-text-descrip"
                  className="w-1/2 px-4 py-3 mr-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  Observacion del rechazo
                </Form.Label>
                <div className="w-full flex px-0 py-2">
                  <Form.Label className="w-full ml-4 px-4 py-3 border-b-2 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    {formData["observacion_rechazo"]}
                  </Form.Label>
                </div>
              </div>
            </Col>
          </Row>
        )}

        {formData?.imagenPago && !formData.observacion_rechazo && (
          <Row className="flex w-full justify-between items-baseline">
            <Col md={12} xl={12}>
              <div className="flex w-full pl-2 justify-between items-start">
                <Form.Label className="w-full px-4 py-3 mb-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Foto del pago realizado
                </Form.Label>
              </div>
            </Col>
            <Col md={12} xl={12}>
              <div className="flex row w-full pl-2 justify-center items-center">
                <Image
                  src={formData?.imagenPago}
                  className="max-h-80 w-auto"
                  rounded
                  fluid
                />
              </div>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

export default Actualizar;
