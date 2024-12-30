import { useEffect, useState } from "react";

import Tabla from "../../../components/Tabla";
import { getMethod } from "../../../fetch/getMethod";
import Update from "./Update";

const column = [
  { field: "codigo_descuento", header: "Codigo Descuento" },
  { field: "porcentaje_descuento", header: "Porcentaje" },
  { field: "_fecha_inicio_oferta", header: "Inicio de Oferta" },
  { field: "_fecha_fin_oferta", header: "Fin de Oferta" },
  { field: "estadoStr", header: "Estado" },
  { field: "-", header: "Actualizar" },
];

const Visual = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormData] = useState(null);

  const [dataTabla, setDataTabla] = useState({
    noData: false,
    textNoData: "-",
  });

  //Fetch
  const [data, setData] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);

  //Recargar consulta
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setData(null);
    getMethod({
      path: `/oferta/registradas/`,
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
      setIsLoading,
    });
  }, [reload]);

  const editData = (item) => {
    setFormData(item);
    setShowEdit(true);
  };

  return (
    <>
      <Tabla
        rows={data}
        columns={column}
        showTotal={true}
        editar={editData}
        title="Ofertas"
        loading={{
          isLoading: IsLoading,
          ...dataTabla,
        }}
      />

      {showEdit && (
        <Update
          show={showEdit}
          onHide={() => setShowEdit(false)}
          item={formData}
          reload={() => setReload((current) => !current)}
        />
      )}
    </>
  );
};

export default Visual;
