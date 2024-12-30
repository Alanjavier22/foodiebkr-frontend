import { Form, Row, Col } from "react-bootstrap";

const FormData = ({ label, value }) => {
  return (
    <Row className="flex w-full justify-between items-end mb-2">
      <Col xl={10} md={3} sm={4} xs={4}>
        <Form.Label className="w-full pl-4 ml-5 py-3 border-b-2 text-start text-xs font-semibold text-gray-600 uppercase tracking-wider">
          {label}
        </Form.Label>
      </Col>
      <Col xl={2} md={9} sm={8} xs={8}>
        <Form.Label className="w-full px-0 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
          {value}
        </Form.Label>
      </Col>
    </Row>
  );
};

const DetallesTotales = ({ datosTotales }) => {
  return (
    <>
      {datosTotales && (
        <>
          <FormData label="SubTotal" value={`$${datosTotales.subtotal}`} />
          <FormData label="IVA (15%)" value={`$${datosTotales.impuesto}`} />
          <FormData
            label="Descuento"
            value={
              datosTotales.descuento ? `-$${datosTotales.descuento}` : "$0.00"
            }
          />
          <FormData label="Total" value={`$${datosTotales.total}`} />
        </>
      )}
    </>
  );
};

export default DetallesTotales;
