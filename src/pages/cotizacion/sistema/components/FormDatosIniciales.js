import { Row, Col, Form, Image } from "react-bootstrap";
import { FormHeader } from "../../../../components/FormContent";

const FormDatosIniciales = ({ children, item, showValor = false }) => {
  return (
    <>
      {!showValor && (
        <div className="px-4 pb-4 pt-5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Datos de la cotización
        </div>
      )}

      {showValor && (
        <div className="px-4 pb-4 pt-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider" />
      )}

      <Row className="flex w-full justify-between items-center">
        <Col md={12} xl={6}>
          <div className="flex w-full pl-2">
            <Form.Label className="min-w-36 px-2 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Producto
            </Form.Label>
            <Form.Label className="w-full ml-4 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              {item?.producto || "-"}
            </Form.Label>
          </div>
        </Col>

        {item?.cantidad && (
          <Col md={12} xl={6}>
            <div className="flex w-full pl-2">
              <Form.Label className="min-w-36 px-2 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Cantidad
              </Form.Label>
              <Form.Label className="w-full ml-4 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {item?.cantidad}
              </Form.Label>
            </div>
          </Col>
        )}

        {showValor && (
          <Col md={12} xl={6}>
            <div className="flex w-full pl-2">
              <Form.Label className="min-w-36 px-2 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                VALOR ESTIMADO (SIN IVA)
              </Form.Label>
              <Form.Label className="w-full ml-4 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ${item?.precio_estimado || "0"}
              </Form.Label>
            </div>
          </Col>
        )}
      </Row>

      <Row className="flex w-full justify-between items-center">
        {item.fecha_cotizacion && (
          <Col md={12} xl={6}>
            <div className="flex items-end w-full pl-2">
              <Form.Label className="min-w-36 px-2 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Fecha de cotización
              </Form.Label>
              <Form.Label className="w-full ml-4 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {item?.fecha_cotizacion || "-"}
              </Form.Label>
            </div>
          </Col>
        )}
      </Row>

      {item?.descripcion && (
        <Row className="flex w-full justify-between items-baseline mb-3">
          <Col md={12} xl={12}>
            <div className="flex w-full pl-2">
              <Form.Label className="min-w-36 px-2 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Descripción
              </Form.Label>
              <Form.Label className="w-full ml-4 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {item?.descripcion || "-"}
              </Form.Label>
            </div>
          </Col>
        </Row>
      )}

      <FormHeader title="Detalles" />

      {children}

      {item?.imagen && (
        <Row className="flex w-full justify-between items-baseline">
          <Col md={12} xl={12}>
            <div className="flex w-full pl-2 justify-between items-start">
              <Form.Label className="w-36 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Imagen Referencial
              </Form.Label>
            </div>
          </Col>
          <Col md={12} xl={12}>
            <div className="flex row w-full pl-2 justify-center items-center">
              <Image
                src={item?.imagen}
                className="max-h-80 w-auto"
                rounded
                fluid
              />
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export default FormDatosIniciales;
