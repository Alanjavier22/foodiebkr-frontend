import { Row, Col, Form } from "react-bootstrap";

import CotizacionContent from "./CotizacionContent";

const CotizacionPasteles = (props) => {
  const { item } = props;
  return (
    <>
      <CotizacionContent {...props}>
        <>
          <Row className="flex w-full justify-between items-center">
            <Col md={12} xl={6}>
              <div className="flex w-full pl-2">
                <Form.Label className="min-w-36 px-2 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Temática
                </Form.Label>
                <Form.Label className="w-full ml-4 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {item?.tematica || "-"}
                </Form.Label>
              </div>
            </Col>
            <Col md={12} xl={6}>
              <div className="flex w-full pl-2">
                <Form.Label className="min-w-36 px-2 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Cantidad
                </Form.Label>
                <Form.Label className="w-full ml-4 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {item?.cantidad || "-"}
                </Form.Label>
              </div>
            </Col>
          </Row>

          <Row className="flex w-full justify-between items-center">
            <Col md={12} xl={6}>
              <div className="flex w-full pl-2">
                <Form.Label className="min-w-36 px-2 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Pisos
                </Form.Label>
                <Form.Label className="w-full ml-4 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {item?.pisos || "-"}
                </Form.Label>
              </div>
            </Col>
            <Col md={12} xl={6}>
              <div className="flex w-full pl-2">
                <Form.Label className="min-w-36 px-2 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Porciones
                </Form.Label>
                <Form.Label className="w-full ml-4 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {item?.porciones || "-"}
                </Form.Label>
              </div>
            </Col>
          </Row>
        </>
      </CotizacionContent>
    </>
  );
};

export default CotizacionPasteles;
