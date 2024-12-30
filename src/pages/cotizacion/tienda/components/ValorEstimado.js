import { useEffect, useState } from "react";

import { Row, Col, Form } from "react-bootstrap";

import TooltipCustom from "../../../../components/Tooltip";

const ValorEstimado = ({ handleChange, formData, adicional }) => {
  const [valorEstimado, setValorEstimado] = useState(0);

  useEffect(() => {
    const calcularValorEstimado = () => {
      let newValorEstimado = 0;

      for (let item of adicional) {
        const currentData = formData[item.nombre];
        const cantidadForm = formData["cantidad " + item.nombre];
        if (currentData) {
          try {
            let { valor } = JSON.parse(currentData);

            if (cantidadForm || cantidadForm == 0)
              valor = Number(cantidadForm) * Number(valor);

            newValorEstimado += Number(valor);
          } catch (err) {}
        }
      }

      const cantidad = formData["cantidad"] ? Number(formData["cantidad"]) : 1;
      return newValorEstimado.toFixed(2) * cantidad;
    };

    const newValorEstimado = calcularValorEstimado();

    if (newValorEstimado !== valorEstimado) {
      setValorEstimado(newValorEstimado);
      handleChange({
        target: { name: "precio_estimado", value: newValorEstimado },
      });
    }
  }, [adicional, formData]);

  return (
    <>
      <Row className="flex w-full justify-between items-center pt-3 pb-2">
        <Col md={12} xl={8}>
          <div className="flex w-full pl-2 items-baseline justify-between border-b-2">
            <TooltipCustom descripcion="Valor total estimado (sin incluir iva)">
              <Form.Label className="px-2 py-3 ml-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Valor Estimado (Sin iva)
              </Form.Label>
            </TooltipCustom>
            <Form.Label className="px-2 py-3 mr-4 text-rigth text-lg font-semibold text-[#2b5bff] uppercase tracking-wider">
              {`$` + (formData["precio_estimado"] || "0.00")}
            </Form.Label>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ValorEstimado;
