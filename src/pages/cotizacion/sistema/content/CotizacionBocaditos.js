import FormContent from "../components/FormContent";
import FormDatosIniciales from "../components/FormDatosIniciales";
import { Form, Row, Col } from "react-bootstrap";

const CotizacionBocaditos = ({ item, showValor = false }) => {
  const datosReestructurados = {
    datos: [],
    estado: item.estado,
    id_producto: item.id_producto,
    precio_estimado: item.precio_estimado,
    producto: item.producto,
  };

  Object.keys(item).forEach((key) => {
    if (key.startsWith("cantidad ")) {
      const nombreProducto = key.replace("cantidad ", "");
      const datosIniciales = item[nombreProducto];
      const cantidad = item[key];
      const precioString = datosIniciales.split(" - ")[1];
      const precio = parseFloat(precioString.substring(1));
      const total = "$" + (precio * parseInt(cantidad)).toFixed(2);

      datosReestructurados.datos.push({
        opciones: {
          // ["Tipo de bocadito"]: nombreProducto,
          // ["Bocadito Seleccionado"]: datosIniciales.split(" - ")[0],
          ["Bocadito Seleccionado"]: `
            ${nombreProducto} ㅤㅤ-ㅤㅤ  ${datosIniciales.split(" - ")[0]}`,
          ["Bocadito P/U"]: datosIniciales.split(" - ")[1],
          cantidad: cantidad.toString(),
          ["Valor total"]: total,
        },
      });
    }
  });

  return (
    <>
      {datosReestructurados.datos !== 0 && (
        <FormDatosIniciales item={item} showValor={showValor}>
          {datosReestructurados.datos.map((element, index) => {
            return (
              <div key={index} className="pt-4 pb-0">
                {[element.opciones].map((datos) => {
                  return (
                    <FormContent
                      key={index}
                      elementos={datos}
                      rows={{ row_1: 1, row_2: 3 }}
                      className="py-4 my-1 border-dotted border-2 border-gray-400"
                    />
                  );
                })}
              </div>
            );
          })}

          <Row className="flex w-full justify-between items-end mb-3">
            <Col md={3} xl={10}>
              <Form.Label className="w-full px-5 py-3 border-b-2 text-start text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Total
              </Form.Label>
            </Col>
            <Col md={9} xl={2}>
              <Form.Label className="w-full px-0 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                $
                {String(item.precio_estimado || "").replace(/_\d/g, " ") || "0"}
              </Form.Label>
            </Col>
          </Row>
        </FormDatosIniciales>
      )}
    </>
  );
};

export default CotizacionBocaditos;
