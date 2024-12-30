import { useState, useContext } from "react";

import { Row, Col, Form, Button, Image } from "react-bootstrap";
import { postMethod } from "../../../../fetch/postMethod";
import { FormHeader, FormSubheader } from "../../../../components/FormContent";
import { LoadContext } from "../../../../context/LoadContext";

const Actualizar = ({ onHide, rows, required, reload }) => {
  const { setLoadSpinner } = useContext(LoadContext);

  const [formData, setFormData] = useState({
    id: rows?.cotizacion?.id,
    id_cliente: rows?.cliente?.id,
    atendido_por: rows?.cotizacion?.atendido_por || "",
    estado: rows?.cotizacion?.estado,
    envio: rows?.cotizacion?.envio || "-",
    precio_estimado: rows?.cotizacion?.precio_estimado,
    observacion_rechazo: rows?.cotizacion?.observacion_rechazo || "",
    precio_final: rows?.cotizacion?.precio_final || "",
    imagenPago: rows?.cotizacion?.imagenPago,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }));
  };

  const handleChangeValor = (event) => {
    const value = event.target.value;
    if (value === "") handleChange(event);

    if (/^\d+$/.test(value)) {
      handleChange(event);
    }
  };

  const actualizarCotizacion = () => {
    setLoadSpinner(true);
    postMethod({
      path: "/cotizacion/actualizar",
      data: { formData, title: "ACTUALIZACIÓN" },
      showBtn: true,
      callbck: onHide,
      reload: reload,
      setIsLoading: setLoadSpinner,
    });
  };

  return (
    <>
      <div className="flex flex-col" style={{ minHeight: "50vh" }}>
        <FormHeader title="Actualizar Cotización" />

        {((rows?.cotizacion?.estado && rows?.cotizacion?.estado !== "Nt") ||
          (required && rows?.cotizacion?.estado !== "Nt")) && (
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
              <Form.Select
                size="sm"
                name="estado"
                value={formData["estado"]}
                onChange={handleChange}
                disabled={formData.estado === "A"}
                className="w-full h-full ml-4 px-4 py-2 my-0 border-b-2 text-left text-xs font-semibold text-gray-600 tracking-wider"
              >
                <option disabled value="-">
                  Estado de la cotización
                </option>
                <option value="Nt">No Atendido</option>
                <option value="A">Atendido</option>
              </Form.Select>
            </div>
          </Col>
          {formData.estado === "A" && (
            <Col md={12} xl={6}>
              <div className="flex w-full pl-2 items-center">
                <Form.Label className="w-1/2 px-4 py-3 mr-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Envio
                </Form.Label>
                <Form.Select
                  size="sm"
                  name="envio"
                  value={formData["envio"]}
                  onChange={handleChange}
                  disabled={required ? false : rows?.cotizacion?.envio}
                  className="w-full h-full ml-4 px-4 py-2 my-0 border-b-2 text-left text-xs font-semibold text-gray-600 tracking-wider"
                >
                  <option disabled value="-">
                    En espera
                  </option>
                  <option value="Ac">Aceptado</option>
                  <option value="R">Rechazado</option>
                </Form.Select>
              </div>
            </Col>
          )}
        </Row>

        <Row className="flex w-full justify-between items-baseline">
          {formData.precio_estimado && (
            <Col md={12} xl={6}>
              <div className="flex w-full pl-2 items-center">
                <Form.Label className="w-1/2  px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  valor estimado
                </Form.Label>
                <div className="w-full flex px-0 py-2">
                  <Form.Control
                    type="text"
                    size="sm"
                    disabled
                    name="precio_estimado"
                    value={"$" + (formData["precio_estimado"] || "0.00")}
                    onChange={handleChange}
                    className="w-full h-full ml-4 px-2 py-2 border-b-2 text-left text-xs font-semibold text-gray-600 tracking-wider"
                  />
                </div>
              </div>

              <FormSubheader text="El valor presentado no considera iva" />
            </Col>
          )}
          {formData.imagenPago && formData.envio === "Ac" && (
            <Col md={12} xl={6}>
              <div className="flex w-full pl-2 items-center">
                <Form.Label className="w-1/2 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Precio Final
                </Form.Label>
                <div className="w-full flex px-0 py-2">
                  <Form.Control
                    type="text"
                    size="sm"
                    name="precio_final"
                    value={formData["precio_final"]}
                    // onChange={handleChange}
                    onChange={handleChangeValor}
                    maxLength={4}
                    disabled={required ? false : rows.cotizacion.precio_final}
                    className="w-full h-full ml-4 px-2 py-2 border-b-2 text-left text-xs font-semibold text-gray-600 tracking-wider"
                  />
                </div>
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
                  <Form.Control
                    type="text"
                    size="sm"
                    as="textarea"
                    rows={3}
                    name="observacion_rechazo"
                    value={formData["observacion_rechazo"]}
                    onChange={handleChange}
                    className="w-full h-full ml-4 px-4 py-2 bg-white resize-none text-base text-left font-semibold text-gray-600 tracking-wider"
                  />
                </div>
              </div>
            </Col>
          </Row>
        )}

        {(!rows?.cotizacion?.envio || required) && (
          <Row className="flex w-full justify-between items-center">
            <Col md={12} xl={6}>
              {formData.envio === "Ac" && !formData.imagenPago && (
                <Form.Label className="w-full ml-4 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  En espera de comprobante
                </Form.Label>
              )}
            </Col>

            {(formData.estado !== "Nt" ||
              formData.envio !== "-" ||
              (formData.envio === "Ac" && formData.imagenPago) ||
              (formData.envio === "R" && formData.observacion_rechazo)) && (
              <Col md={12} xl={6}>
                <div className="flex w-full justify-end pl-2">
                  <Button
                    className="btnStore bg-slate-400 px-4 py-2 border-0 rounded-3"
                    onClick={actualizarCotizacion}
                    disabled={
                      formData.envio === "Ac"
                        ? !formData.imagenPago || !formData.precio_final
                        : formData.envio === "R"
                        ? !formData.observacion_rechazo
                        : formData.envio === "-" && !formData.estado === "A"
                        ? true
                        : false
                    }
                  >
                    Actualizar
                  </Button>
                </div>
              </Col>
            )}
          </Row>
        )}

        {formData?.imagenPago && (
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
