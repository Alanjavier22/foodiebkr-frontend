import { useEffect, useState } from "react";

import { FormSearching } from "../../../components/FormContent";
import { getMethod } from "../../../fetch/getMethod";
import handleCustomChange from "../../../utils/handleCustomChange";
import validationClient from "../../../utils/validations/cliente";

const FormSearch = ({ setData, setDataTabla, formData }) => {
  const validationSchema = validationClient;
  //Fetch
  const [search, setSearch] = useState(false);
  //Recargar consulta
  const [formSearch, setFormSearch] = useState({ text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormSearch((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const LoadingTable = () => {
    setData(null);
    setDataTabla({ noData: true });
  };

  useEffect(() => {
    if (search) {
      formSearch.text = formSearch[formSearch.buscar]
      getMethod({
        path: `/cliente/buscar/${formSearch["buscar"]}/${formSearch["text"]}/${formData["estado"]}`,
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
    if (formSearch["buscar"] !== "") {
      handleChange({ target: { name: formSearch.buscar, value: "" } });
    }
  }, [formData["estado"]]);

  const searchName = () => {
    LoadingTable();
    setSearch(true);
  };

  return (
    <>
      <FormSearching
        label="Buscar"
        handleChange={(event) => {
          handleChange({ target: { name: formSearch.buscar, value: "" } });
          handleChange(event);
        }}
        input={{
          placeholder: "Búsqueda",
          name: formSearch.buscar,
          value: formSearch[formSearch.buscar],
          maxLength: formSearch.buscar === "cedula" ? 10 : 50,
          handleChange: (event) =>
            formSearch.buscar === "email"
              ? handleChange
              : handleCustomChange(event, validationSchema, handleChange),
        }}
        select={{
          name: "buscar",
          value: formSearch.buscar || "-",
          options: (
            <>
              <option value="cedula">Cédula</option>
              <option value="nombre">Nombre</option>
              <option value="apellido">Apellido</option>
              <option value="email">Correo</option>
            </>
          ),
        }}
        button={{
          name: "Buscar",
          disabled: formSearch[formSearch.buscar] === "",
          onclick: searchName,
        }}
        requerido={false}
      />
    </>
  );
};

export default FormSearch;
