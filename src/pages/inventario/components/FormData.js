import { useEffect, useState } from "react";

import ContentForm from "./ContentForm";
import { getMethod } from "../../../fetch/getMethod";

const FormProduct = ({ formData, handleChange }) => {
  //Fetch
  const [data, setData] = useState([{}]);
  //Recargar consulta
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getMethod({
      path: "/inventario/consultar/all",
      setData,
      setIsLoading: () => {},
      showSwal: false,
    });
  }, [reload]);

  return (
    <>
      <ContentForm
        key={formData}
        data={data}
        formData={formData}
        handleChange={handleChange}
        form="Producto"
        reload={() => setReload((current) => !current)}
        es_inventario={true}
      />
    </>
  );
};

const FormSubProduct = ({ formData, handleChange, isLoading }) => {
  //Fetch
  const [data, setData] = useState([]);
  //Recargar consulta
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (formData["producto"] !== "-") {
      getMethod({
        path: `/inventario/consultar/subproducto/${formData["producto"]}/all`,
        setData,
        setIsLoading: () => {},
        showSwal: false,
      });
    }
  }, [formData["producto"], reload]);

  return (
    <>
      <ContentForm
        key={formData}
        data={data}
        formData={formData}
        handleChange={handleChange}
        prop="Subproducto"
        alter="SubCategoria"
        reload={() => setReload((current) => !current)}
        isLoading={isLoading}
      />
    </>
  );
};

export { FormProduct, FormSubProduct };
