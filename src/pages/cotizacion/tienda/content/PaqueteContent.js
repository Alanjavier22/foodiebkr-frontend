import { useEffect, useState } from "react";

import { Form } from "react-bootstrap";

import DatosExtra from "../components/DatosExtra";
import TabPaquete from "./TabPaquete";

const PaqueteContent = ({
  handleChange,
  formData,
  UpdateForm,
  dataProduct,
}) => {
  const [formDataTab, setFormDataTab] = useState({});
  const [formDataLength, setFormDataLength] = useState(0);

  const dataTab = dataProduct.slice(0, 4);

  const isFormValid = (opciones) => {
    let opcionesCompletas = true;

    Object.keys(opciones).forEach((opcion) => {
      const detalles = opciones[opcion];
      Object.keys(detalles).forEach((key) => {
        if (
          key !== "estado" &&
          key !== "precio_estimado" &&
          key !== "id_producto" &&
          key !== "fecha_cotizacion" &&
          key !== "producto"
        ) {
          if (detalles[key] === "") {
            opcionesCompletas = false;
          }
        }
      });
    });

    return opcionesCompletas;
  };

  useEffect(() => {
    const cantidadOpciones = Object.keys(formData.opciones ?? {}).length;
    setFormDataLength(cantidadOpciones);
    if (cantidadOpciones > 1) {
      if (formDataTab) {
        const resultado = isFormValid(formDataTab);
        UpdateForm({
          emptyValues: !resultado,
          nameData: "cotizacion",
          formData: resultado ? formData : null,
        });
      }
    } else {
      UpdateForm({
        emptyValues: true,
        nameData: "",
        formData: null,
      });
    }
  }, [formDataTab, formData]);

  return (
    <>
      <div
        className="border-0 m-auto pt-3"
        style={{ maxWidth: "80vw", minHeight: "5vh" }}
      >
        <Form.Label
          className="w-full px-4 pb-0 font-semibold text-red-500 uppercase tracking-wider"
          style={{ fontSize: "13px" }}
        >
          *Debe de escoger minimo 2 opciones, al momento de darle click alguna
          pestaña se considera dentro de los datos a cotizar
        </Form.Label>
        <Form.Label
          className="w-full px-4 pb-4 font-semibold text-red-500 uppercase tracking-wider"
          style={{ fontSize: "11px" }}
        >
          *Si la opción escogida tiene campos requeridos, debe de completarlos
          para enviar la cotizacion
        </Form.Label>

        <TabPaquete
          dataTab={dataTab}
          handleChange={handleChange}
          formDataTab={formDataTab}
          setFormDataTab={setFormDataTab}
        />

        {formDataLength > 1 && (
          <>
            <div className="border-t-2 mt-5" />
            <div className="border-t-2 mt-3" />
            <DatosExtra handleChange={handleChange} formData={formData} />
          </>
        )}

        {formDataLength < 2 && (
          <>
            <div className="flex items-center justify-center mb-0 pt-3">
              <Form.Label
                className="w-auto font-semibold text-red-500 text-center uppercase tracking-wider"
                style={{ fontSize: "12px" }}
              >
                El paquete cuenta con
              </Form.Label>
              <Form.Label
                className="w-auto ml-1 font-semibold text-red-500 text-center uppercase tracking-wider"
                style={{ fontSize: "12px" }}
              >
                {formDataLength} de 2 productos (minimo) a cotizar{" "}
              </Form.Label>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PaqueteContent;
