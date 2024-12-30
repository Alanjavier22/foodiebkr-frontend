import { useEffect, useState } from "react";

import Row from "react-bootstrap/Row";

import PastelesContent from "./PastelesContent";
import PaqueteContent from "./PaqueteContent";
import CotizacionContent from "../components/CotizacionContent";
import CotizacionContentv2 from "../components/CotizacionContentv2";

import { getMethod } from "../../../../fetch/getMethod";
import { FormHeader, FormSelect } from "../../../../components/FormContent";

const COTIZACIONES_MAP = {
  1: PastelesContent, //Pasteles
  2: CotizacionContentv2, //Bocaditos
  3: CotizacionContent, //Shots
  4: CotizacionContent, //Cupcakes
  5: PaqueteContent,
};

const DatosCotizacion = ({ UpdateForm }) => {
  const [formData, setFormData] = useState({
    producto: "",
    field: false,
    id_producto: 0,
  });

  const [dataProduct, setDataProduct] = useState([]);
  const [productSelect, setProductSelect] = useState("-");

  const Component = COTIZACIONES_MAP[formData?.id_producto];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const isFormValid = () =>
    Object.values(formData).every((value) => value !== "");

  useEffect(() => {
    if (Number(formData["id_producto"]) !== 5) {
      UpdateForm({
        emptyValues: !isFormValid(),
        nameData: "cotizacion",
        formData: isFormValid() ? formData : null,
      });
    }
  }, [formData]);

  useEffect(() => {
    if (dataProduct.length === 0) {
      getMethod({
        path: "/producto/",
        setData: (datos) => {
          const dataSelect = datos.slice(0, 5);
          setDataProduct(dataSelect);
        },
        setIsLoading: () => {},
        showSwal: false,
      });
    }
  }, []);

  useEffect(() => {
    if (productSelect === "-") return;

    const { id_producto, nombre } = JSON.parse(productSelect);

    setFormData({
      producto: nombre,
      id_producto,
      estado: "Nt",
      fecha_cotizacion: "",
    });
  }, [productSelect]);

  const handleChangeProd = (e) => {
    setFormData({
      producto: "",
      id_producto: 0,
      fecha_cotizacion: "",
    });

    setProductSelect(e.target.value);
  };

  return (
    <div
      className="border-0 m-auto px-4"
      style={{ maxWidth: "90vw", minHeight: "45vh" }}
    >
      <FormHeader title="Datos de la cotización" />

      <Row className="flex w-full justify-between items-center">
        <FormSelect
          label="Producto"
          name="producto"
          handleChange={handleChangeProd}
          value={productSelect}
          disabled={dataProduct.length === 0}
        >
          {dataProduct &&
            dataProduct.map(({ id_producto, nombre }) => {
              const _nombre = nombre.split(" ")[0];
              return (
                <option
                  key={id_producto}
                  value={JSON.stringify({ id_producto, nombre: _nombre })}
                >
                  {_nombre}
                </option>
              );
            })}
        </FormSelect>
      </Row>

      {productSelect === "-" && (
        <div className="px-4 pb-4 pt-5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
          Sellecciona un producto para empezar la cotización
        </div>
      )}

      {Component && (
        <Component
          handleChange={handleChange}
          formData={formData}
          setFormData={(newForm) => setFormData(newForm)}
          UpdateForm={UpdateForm}
          dataProduct={dataProduct}
        />
      )}
    </div>
  );
};

export default DatosCotizacion;
