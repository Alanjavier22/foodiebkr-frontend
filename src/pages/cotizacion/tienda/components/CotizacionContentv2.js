import { useState, useEffect } from "react";

import _bocaditos from "../../../../data/_bocaditos.js";

import FormActions from "./FormActions.js";
import ValorEstimado from "./ValorEstimado.js";
import DatosExtra from "./DatosExtra.js";

const OPTIONS_COTIZAR = { 2: _bocaditos };

const FIELD_REQUIRED = {
  2: [
    "Bocaditos de sal",
    "cantidad Bocaditos de sal",
    "Bocaditos de dulce",
    "cantidad Bocaditos de dulce",
    "fecha_cotizacion",
  ],
};

const CotizacionContentv2 = ({
  handleChange,
  formData,
  setFormData,
  showImg,
}) => {
  const data = OPTIONS_COTIZAR[Number(formData?.id_producto)];
  const required = FIELD_REQUIRED[formData?.id_producto];

  const [elements, setElements] = useState(data);

  useEffect(() => {
    if (required.length !== 0) {
      const newDataForm = required.reduce((acc, item) => {
        acc[item] = "";
        return acc;
      }, {});

      setFormData({ ...formData, ...newDataForm });
    }
  }, []);
  
  const getSequence = (name, elementsArray) => {
    return elementsArray.filter((item) => item.nombre.startsWith(name)).length;
  };

  const duplicateField = (item) => {
    const counter = getSequence(item.nombre, elements);
    const newFieldName = `${item.nombre}_${counter}`;
    const newField = { ...item, nombre: newFieldName };
    setFormData((prevFormData) => ({
      ...prevFormData,
      [newFieldName]: "-",
    }));
    setElements((prevElements) => [...prevElements, newField]);
  };

  const removeField = (nombre) => {
    const newFormData = { ...formData };
    delete newFormData[nombre];
    setFormData(newFormData);
    setElements((prevElements) =>
      prevElements.filter((element) => element.nombre !== nombre)
    );
  };

  return (
    <div
      className="border-0 m-auto pt-0"
      style={{ maxWidth: "75vw", minHeight: "5vh" }}
    >
      {data && (
        <FormActions
          handleChange={handleChange}
          formData={formData}
          duplicateField={duplicateField}
          removeField={removeField}
          elements={elements}
          title="Opciones"
        />
      )}

      {data && (
        <ValorEstimado
          handleChange={handleChange}
          formData={formData}
          adicional={elements}
        />
      )}

      <DatosExtra
        handleChange={handleChange}
        formData={formData}
        showImg={showImg}
      />
    </div>
  );
};

export default CotizacionContentv2;
