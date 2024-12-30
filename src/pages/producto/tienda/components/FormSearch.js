import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { FormSearching } from "../../../../components/FormContent";

const FormSearch = () => {
  //Recargar consulta
  const [nombre, setNombre] = useState("");

  const navigate = useNavigate();

  const searchName = () => navigate(`/resultados/${nombre}`);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") searchName();
  };

  return (
    <>
      <div className="flex justify-center items-center pt-3">
        <FormSearching
          handleChange={(e) => setNombre(e.target.value)}
          input={{
            placeholder: "Búsqueda por nombre",
            name: "nombre",
            value: nombre,
            handleKeyDown,
          }}
          button={{
            name: "Buscar",
            disabled: nombre === "",
            onclick: searchName,
          }}
          requerido={false}
          style={{ maxWidth: "600px" }}
        />
      </div>
    </>
  );
};

export default FormSearch;
