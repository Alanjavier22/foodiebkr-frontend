import { useState, useEffect, useCallback } from "react";

import Row from "react-bootstrap/Row";

import FormDinamico from "../components/FormDinamico.js";
import ValorEstimado from "../components/ValorEstimado.js";
import DatosExtra from "../components/DatosExtra.js";
import fetchCotizacionData from "../../../../fetch/fetchCotizacionData.js";
import PlaceholderCustom from "../../../../components/Placeholder.js";

import {
  FormHeader,
  FormSubheader,
  FormCol,
  FormSelect,
} from "../../../../components/FormContent";
import { getMethod } from "../../../../fetch/getMethod.js";

const updateField = (name, value, handleChange) => {
  handleChange({
    target: {
      name: name,
      value: value,
    },
  });
};

const filterByFloors = (numPisos, opciones) => {
  const regex = new RegExp(`\\b${numPisos} pisos\\b`, "i");

  return opciones.filter((item) => {
    if (numPisos === 1) {
      return !item.nombre.toLowerCase().includes("pisos");
    }
    return regex.test(item.nombre);
  });
};

const FormOptionAdd = ({
  handleChange,
  formData,
  opciones,
  updateAdicional,
}) => {
  const [porcionesPisos, setProcionesPisos] = useState([]);
  const [porciones, setPorciones] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) handleChange(event);
  };

  const handlePisoChange = (event) => {
    const pisos = Number(event.target.value);
    handleChange(event);

    const porcionData =
      porcionesPisos.find((item) => item.pisos === pisos)?.porciones || [];
    setPorciones(porcionData);

    updateField("porciones", JSON.stringify(porcionData[0]), handleChange);
    handleMasaSellerChange(pisos);
  };

  const handleMasaSellerChange = (pisos) => {
    const filteredData = filterByFloors(pisos, opciones);
    updateAdicional(filteredData);
  };

  useEffect(() => {
    if (formData.cobertura && formData.cobertura !== "-") {
      setPorciones([]);
      updateField("pisos", "-", handleChange);
      updateField("porciones", "-", handleChange);

      getMethod({
        path: `/producto/pisos/porciones/${formData.cobertura}`,
        setData: setProcionesPisos,
        setIsLoading: () => {},
        showSwal: false,
      });
    }
  }, [formData.cobertura]);

  return (
    <>
      <FormHeader title="Opciones" />
      <FormSubheader text="*Los valores presentados no están con IVA" />

      <Row className="flex w-full justify-between items-center pb-3">
        <FormCol label="Temática" name="tematica" handleChange={handleChange} />
        <FormCol
          label="Cantidad"
          name="cantidad"
          handleChange={handleInputChange}
          value={formData.cantidad}
          maxLength={2}
        />
      </Row>

      <Row className="flex w-full justify-between items-center">
        <FormSelect
          label="Cobertura"
          name="cobertura"
          handleChange={handleChange}
          value={formData.cobertura || "-"}
        >
          <option value="PASTEL EN FONDANT ">PASTEL EN FONDANT</option>
          <option value="PASTEL EN FROSTING AMERICANO">
            PASTEL EN FROSTING AMERICANO
          </option>
        </FormSelect>
      </Row>

      <Row className="flex w-full justify-between items-center">
        <FormSelect
          label="Pisos"
          name="pisos"
          handleChange={handlePisoChange}
          value={formData["pisos"] || "-"}
          disabled={!formData["cobertura"]}
          options={porcionesPisos.map((item) => item.pisos + " pisos")}
        >
          {porcionesPisos &&
            porcionesPisos.map((item) => {
              return (
                <option key={item.pisos} value={item.pisos}>
                  {item.pisos} pisos
                </option>
              );
            })}
        </FormSelect>
        <FormSelect
          label="Porciones"
          name="porciones"
          handleChange={handleChange}
          value={porciones.length !== 0 ? formData.porciones : "-"}
          disabled={porciones.length === 0}
        >
          {porciones &&
            porciones.map((item, index) => {
              const { nombre, valor } = item;
              return (
                <option key={index} value={JSON.stringify({ nombre, valor })}>
                  ${valor} - {nombre}
                </option>
              );
            })}
        </FormSelect>
      </Row>
    </>
  );
};

const PastelesContent = ({
  handleChange,
  formData,
  setFormData,
  setFormDataTab,
  showImg,
}) => {
  const [adicional, setAdicional] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [opcionesMasas, setOpcionesMasas] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [fieldPasteles, setFieldPasteles] = useState([]);

  const updateAdicional = (newOptions) => {
    setAdicional((prevAdicional) => {
      const updatedAdicional = prevAdicional.map((item) => {
        if (item.nombre === "masas best seller") {
          return { ...item, opciones: newOptions };
        }
        return item;
      });
      return updatedAdicional;
    });
  };

  const updateData = useCallback(
    ({ fieldRequired, data, setDataFunction }) => {
      const formDataUpdater = setFormDataTab || setFormData;
      formDataUpdater((prevFormData) => ({
        ...prevFormData,
        ...fieldRequired,
      }));
      setDataFunction(data);
    },
    [setFormData, setFormDataTab]
  );

  const updateDataCategoria = ({ fieldRequired, categoria }) => {
    updateData({
      fieldRequired: fieldRequired,
      data: categoria,
      setDataFunction: setCategoria,
    });
  };

  const updateDataAdicional = ({ fieldRequired, adicional }) => {
    const masasBestSeller = adicional.find(
      (item) => item.nombre === "masas best seller"
    );
    if (masasBestSeller) {
      adicional.push({
        nombre: "masas best seller_",
        opciones: masasBestSeller.opciones,
      });
      setOpcionesMasas(masasBestSeller.opciones);
    }
    updateData({
      fieldRequired: fieldRequired,
      data: adicional,
      setDataFunction: setAdicional,
    });
  };

  useEffect(() => {
    if (formData) {
      setIsLoading(true);
      fetchCotizacionData({
        id_producto: formData.id_producto,
        producto: formData.producto,
        updateDataCategoria,
        updateDataAdicional,
        setIsLoading,
      });
    }
  }, []);

  useEffect(() => {
    if (categoria.length !== 0 && adicional.length !== 0) {
      const newArr = adicional.filter((item) => item.nombre !== "toppings");
      setFieldPasteles([...newArr, ...categoria, { nombre: "toppings_" }]);
    }
  }, [categoria, adicional]);

  useEffect(() => {
    if (formData["masa sencilla"] && formData["masa sencilla"] !== "-")
      updateField("masas best seller", "-", handleChange);
  }, [formData["masa sencilla"]]);

  useEffect(() => {
    if (formData["masas best seller"] && formData["masas best seller"] !== "-")
      updateField("masa sencilla", "-", handleChange);
  }, [formData["masas best seller"]]);

  useEffect(() => {
    if (formData["toppings"] && formData["toppings"] !== "-") {
      try {
        const { nombre, key, valor, descripcion } = JSON.parse(
          formData["toppings"]
        );
        const numPisos = Number(formData["pisos"]) || 1;

        const totalToppings = (numPisos * Number(valor)).toFixed(2);

        updateField(
          "toppings_",
          JSON.stringify({ nombre, key, valor: totalToppings, descripcion }),
          handleChange
        );
      } catch (err) {}
    } else {
    }
  }, [formData["toppings"], formData["pisos"]]);

  if (isLoading) return <PlaceholderCustom />;

  return (
    <div
      className="border-0 m-auto pt-0"
      style={{ maxWidth: "75vw", minHeight: "5vh" }}
    >
      {opcionesMasas && (
        <FormOptionAdd
          handleChange={handleChange}
          formData={formData}
          opciones={opcionesMasas}
          updateAdicional={updateAdicional}
        />
      )}

      {adicional.length !== 0 && (
        <FormDinamico
          handleChange={handleChange}
          formData={formData}
          elements={adicional}
          removeElement={["masas best seller_"]}
          title="Adicionales"
        />
      )}

      {fieldPasteles.length !== 0 && (
        <ValorEstimado
          handleChange={handleChange}
          formData={formData}
          adicional={fieldPasteles}
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

export default PastelesContent;
