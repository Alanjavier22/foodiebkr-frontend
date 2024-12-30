import { Row, Col, Form } from "react-bootstrap";

const FormContent = ({ elementos, rows = { row_1: 2, row_2: 2 } }) => {
  // Convierte el objeto en un array de pares clave-valor
  const entradas = Object.entries(elementos);

  const divideEntradas = (entradas) => {
    const filas = [];
    let toggle = true;
    for (let i = 0; i < entradas.length; ) {
      if (toggle) {
        filas.push(entradas.slice(i, i + rows.row_1));
        i += rows.row_1;
      } else {
        filas.push(entradas.slice(i, i + rows.row_2));
        i += rows.row_2;
      }
      toggle = !toggle;
    }
    return filas;
  };

  const filas = divideEntradas(entradas);

  return (
    // <div className="py-4 my-3 border-dashed border-2 border-sky-500">
    <div className="py-4 my-3 border-dotted  border-2 border-gray-400">
      {filas.map((fila, index) => (
        <Row key={index} className="flex w-full justify-between items-end">
          {fila.map(([key, value]) => (
            <Col key={key} md={12} xl={12 / fila.length}>
              <div className="flex w-full pl-2 items-end">
                {/* text-sky-600 */}
                <Form.Label className="min-w-36 px-2 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {key?.replace(/_/g, " ")}
                </Form.Label>
                <Form.Label className="w-full mx-2 px-3 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {/* {value?.replace(/_\d/g, " ") || "-"} */}
                  {String(value || "").replace(/_\d/g, " ") || "-"}
                </Form.Label>
              </div>
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
};

export default FormContent;
