import { useEffect, useState } from "react";

import ContentForm from "./ContentForm";
import { FormSearching } from "../../../components/FormContent";
import { getMethod } from "../../../fetch/getMethod";

const FormProduct = ({ formData, handleChange }) => {
  //Fetch
  const [data, setData] = useState([]);
  //Recargar consulta
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getMethod({
      path: "/producto/consultar/all",
      setData,
      setIsLoading: () => {},
      showSwal: false,
    });
  }, [reload]);

  return (
    <>
      <ContentForm
        data={data}
        formData={formData}
        handleChange={handleChange}
        form="Producto"
        reload={() => setReload((current) => !current)}
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
        path: `/producto/consultar/subproducto/${formData["producto"]}/all`,
        setData,
        setIsLoading: () => {},
        showSwal: false,
      });
    }
  }, [formData["producto"], reload]);

  return (
    <>
      <ContentForm
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

const FormSearch = ({ setData, setDataTabla, formData }) => {
  //Fetch
  const [search, setSearch] = useState(false);
  //Recargar consulta
  const [nombre, setNombre] = useState("");

  const LoadingTable = () => {
    setData(null);
    setDataTabla({ noData: true });
  };

  useEffect(() => {
    if (search) {
      getMethod({
        path: `/producto/buscar/${nombre}/${formData["producto"]}`,
        setData: (datos) => {
          if (datos.length === 0) {
            setDataTabla({
              noData: false,
              textNoData: "No se encontraron resultados para la búsqueda",
              isLoading: true,
            });
          }
          setData(datos);
        },
        setIsLoading: () => {
          setSearch(false);
        },
        showSwal: false,
      });
    }
  }, [search]);

  useEffect(() => {
    if (nombre !== "") {
      setNombre("");
    }
  }, [formData]);

  const searchName = () => {
    // handleChange({ target: { name: "producto", value: "-" } });
    LoadingTable();
    setSearch(true);
  };

  return (
    <>
      <FormSearching
        handleChange={(e) => setNombre(e.target.value)}
        input={{
          placeholder: "Búsqueda por nombre",
          name: "nombre",
          value: nombre,
          handleChange: (e) => setNombre(e.target.value)
        }}
        button={{
          name: "Buscar",
          disabled: nombre === "",
          onclick: searchName,
        }}
        requerido={false}
      />
    </>
  );
};

export { FormProduct, FormSubProduct, FormSearch };
