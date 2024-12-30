import { Row, Col, Form, Button, Modal } from "react-bootstrap";

const Visualizar = (props) => {
  const { item, show, onHide } = props;

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ fontSize: "15px" }}
          className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >
          Datos del Cliente
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="border-0 m-auto px-4" style={{ maxWidth: "75vw" }}>
          {/* Datos de la persona */}
          <>
            <Row className="flex w-full justify-between items-center pb-2">
              <Col xs={4} xl={5}>
                <div className="px-4 pb-4 pt-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Cliente #{item?.id}
                </div>
              </Col>
              <Col xs={8} xl={7}>
                <div className="flex justify-end px-4 pb-4 pt-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fecha registro: {item?.fecha_ingreso}
                </div>
              </Col>
            </Row>

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

            <Row className="flex w-full justify-between items-center">
              <Col md={12} xl={12}>
                <div className="flex w-full pl-2">
                  <Form.Label className="min-w-28 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Estado
                  </Form.Label>
                  <Form.Label className="w-full ml-4 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {item?.estado ? "Activo" : "Inactivo" || "-"}
                  </Form.Label>
                </div>
              </Col>
            </Row>
          </>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btnStore bg-slate-400 px-4 py-2 border-0 rounded-3"
          onClick={onHide}
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Visualizar;
