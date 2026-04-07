import { useEffect } from "react";

import _shots from "../../../../data/_shots.js";
import _cupcakes from "../../../../data/_cupcakes.js";

import FormDinamico from "./FormDinamico.js";
import DatosExtra from "./DatosExtra.js";
import { FormHeader } from "../../../../components/FormContent.js";
import { Row, Col, Form } from "react-bootstrap";

const OPTIONS_COTIZAR = {
  3: _shots,
  4: _cupcakes,
};

const FIELD_REQUIRED = {
  3: [
    "Base del Shot",
    "Rellenos y Capas",
    "Tipo de Vasito",
    "Tamaño del Shot",
    "fecha_cotizacion",
    "cantidad",
  ],
  4: [
    "Tipo de Masa",
    "Relleno",
    "Tamaño del Cupcake",
    "Tipo de Frosting",
    "fecha_cotizacion",
    "cantidad",
  ],
};

const CotizacionContent = ({
  handleChange,
  formData,
  setFormData,
  showImg,
}) => {
  const data = OPTIONS_COTIZAR[formData?.id_producto];

  const required = FIELD_REQUIRED[formData?.id_producto];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (required.length !== 0) {
      const newDataForm = required.reduce((acc, item) => {
        acc[item] = "";
        return acc;
      }, {});

      setFormData({ ...formData, ...newDataForm });
    }
  }, []);

  const handleChangeAmount = (e) => {
    const { name, value } = e.target;

    if (/^\d*$/.test(value) && value.length <= 3) {
      let adjustedValue = parseInt(value, 10) || 0;

      if (adjustedValue % 12 !== 0) {
        if (adjustedValue < parseInt(formData[name], 10)) {
          adjustedValue = Math.floor(adjustedValue / 12) * 12;
        } else {
          adjustedValue = Math.ceil(adjustedValue / 12) * 12;
        }
      }

      handleChange({
        target: {
          name,
          value: adjustedValue,
        },
      });
    }
  };

  const preventNonNumericInput = (e) => {
    if (e.key === "+")
      handleChangeAmount({ target: { name: e.target.name, value: "12" } });

    if (
      e.key !== "ArrowUp" &&
      e.key !== "ArrowDown" &&
      e.keyCode !== 8 &&
      !/^\d*$/.test(e.key)
    ) {
      e.preventDefault();
    } else {
      if (/^\d$/.test(e.key)) {
        handleChangeAmount({ target: { name: e.target.name, value: "" } });
      }
    }
  };

  return (
    <>
      <div
        className="border-0 m-auto pt-0"
        style={{ maxWidth: "75vw", minHeight: "5vh" }}
      >
        <FormHeader title="Datos Iniciales" />

        <Row className="flex w-full justify-between items-center pb-3">
          <Col md={12} xl={6}>
            <div className="flex w-full pl-2 items-center">
              <Form.Label className="w-2/5 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <span className="text-red-500" style={{ fontSize: "1rem" }}>
                  *
                </span>
                Cantidad/docena
              </Form.Label>
              <Form.Control
                type="number"
                size="sm"
                name="cantidad"
                value={formData.cantidad || ""}
                onChange={handleChangeAmount}
                onKeyDown={preventNonNumericInput}
                placeholder={"Cantidad"}
                maxLength={3}
                min={1}
                className="w-full h-full ml-4 px-2 py-2 border-b-2 text-left text-xs font-semibold text-gray-600 tracking-wider"
              />
            </div>
          </Col>
        </Row>

        <div className="mx-1" style={{ marginTop: "-24px" }}></div>

        {data && (
          <FormDinamico
            handleChange={handleChange}
            formData={formData}
            elements={data}
            required={required}
            title="Opciones"
            anotation="*Para definir más detalles sobre las opciones escogidas, por favor escribirlas en descripción"
            elementsHasValor={false}
          />
        )}

        <DatosExtra
          handleChange={handleChange}
          formData={formData}
          showImg={showImg}
        />
      </div>
    </>
  );
};

export default CotizacionContent;
