import { Row, Col, Form } from "react-bootstrap";

const DatosCliente = ({ item }) => {
  return (
    <>
      <div className="px-4 pb-4 pt-5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
        Datos del Cliente
      </div>
      <Row className="flex w-full justify-between items-center">
        <Col md={12} xl={6}>
          <div className="flex w-full pl-2">
            <Form.Label className="min-w-28 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Nombres
            </Form.Label>
            <Form.Label className="w-full ml-4 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              {item?.nombre || "-"}
            </Form.Label>
          </div>
        </Col>
        <Col md={12} xl={6}>
          <div className="flex w-full pl-2">
            <Form.Label className="min-w-28 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Apellidos
            </Form.Label>
            <Form.Label className="w-full ml-4 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              {item?.apellido || "-"}
            </Form.Label>
          </div>
        </Col>
      </Row>

      <Row className="flex w-full justify-between items-center">
        <Col md={12} xl={6}>
          <div className="flex w-full pl-2">
            <Form.Label className="min-w-28 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Correo
            </Form.Label>
            <Form.Label className="w-full ml-4 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              {item?.email || "-"}
            </Form.Label>
          </div>
        </Col>
        <Col md={12} xl={6}>
          <div className="flex w-full pl-2">
            <Form.Label className="min-w-28 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Cédula
            </Form.Label>
            <Form.Label className="w-full ml-4 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              {item?.cedula || "-"}
            </Form.Label>
          </div>
        </Col>
      </Row>

      <Row className="flex w-full justify-between items-center">
        <Col md={12} xl={6}>
          <div className="flex w-full pl-2">
            <Form.Label className="min-w-28 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Telefono
            </Form.Label>
            <Form.Label className="w-full ml-4 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              {item?.telefono || "-"}
            </Form.Label>
          </div>
        </Col>
        <Col md={12} xl={6}></Col>
      </Row>

      <Row className="flex w-full justify-between items-center">
        <Col md={12} xl={12}>
          <div className="flex w-full pl-2">
            <Form.Label className="min-w-28 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              dirección
            </Form.Label>
            <Form.Label className="w-full ml-4 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              {item?.direccion || "-"}
            </Form.Label>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DatosCliente;
