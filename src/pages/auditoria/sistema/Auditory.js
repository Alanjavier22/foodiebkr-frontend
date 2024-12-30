import { useEffect, useState } from "react";

import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";

import Tabla from "../../../components/Tabla";

import { getMethod } from "../../../fetch/getMethod";

const column = [
  { field: "index", header: "Número" },
  { field: "seccion", header: "Seccion" },
  { field: "proceso", header: "proceso" },
  { field: "descripcion", header: "Descripcion" },
  { field: "_fecha", header: "Fecha de registro", width: 200 },
  { field: "usuario_ingreso", header: "Usuario de registro", width: 200 },
];

const Auditory = ({ user }) => {
  const [dataTabla, setDataTabla] = useState({
    noData: true,
    textNoData: "No datos",
  });

  //Fetch
  const [Data, setData] = useState(null);
  const [IsLoading, setIsLoading] = useState(true);

  const LoadingTable = () => {
    setData(null);
    setDataTabla({ noData: true });
  };

  useEffect(() => {
    LoadingTable();
    getMethod({
      path: `/auditoria/`,
      setData: (datos) => {
        if (datos.length === 0) {
          setDataTabla({
            noData: false,
            textNoData: "No se encontraron datos",
            isLoading: true,
          });
        }
        setData(datos);
      },
      setIsLoading,
    });
  }, []);

  return (
    <>
      <div className="border-0 m-auto p-4" style={{ maxWidth: "90vw" }}>
        <div className="p-2 border-b-2 mb-3">
          <h2 className="text-gray-600 font-semibold">Auditoría</h2>
          <span className="text-xs uppercase">Listado de todo proceso realizado</span>
        </div>

        <Tabla
          rows={Data}
          columns={column}
          loading={{
            isLoading: IsLoading,
            ...dataTabla,
          }}
        />
      </div>
    </>
  );
};

export default Auditory;
