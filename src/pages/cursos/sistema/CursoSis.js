import { useEffect, useState } from "react";

import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";

import Tabla from "../../../components/Tabla";
// import Visualizar from "./content/Visualizar";
// import ClienteContent from "./content/ClienteContent";

import { getMethod } from "../../../fetch/getMethod";
import Upsert from "./components/Upsert";

const column = [
  { field: "index", header: "Número" },
  { field: "nombre", header: "Nombre" },
  { field: "_duracion_horas", header: "Duración" },
  { field: "modalidad", header: "modalidad" },
  { field: "_fecha_inicio_curso", header: "Inicio de curso", width: 200 },
  { field: "_fecha_fin_curso", header: "Fin de curso" },
  { field: "_estado", header: "Estado" },
  { field: "-", header: "Detalles" },
];

const CursoSis = ({ user }) => {
  const [dataTabla, setDataTabla] = useState({
    noData: true,
    textNoData: "No datos",
  });

  //Modales
  const [modal, setModal] = useState(false);
  const [visualizar, setVisualizar] = useState(false);

  //Datos para modal
  const [DataR, setDataR] = useState(null);

  //Fetch
  const [Data, setData] = useState(null);
  const [IsLoading, setIsLoading] = useState(true);

  //Recargar consulta
  const [reload, setReload] = useState(false);

  const LoadingTable = () => {
    setData(null);
    setDataTabla({ noData: true });
  };

  useEffect(() => {
    LoadingTable();
    getMethod({
      path: `/cursos/all`,
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

  const mostrarDetalles = (item) => {
    setDataR(item);
    setModal(true);
  };

  const mostrarContent = () => {
    setDataR(null);
    setModal(true);
  };

  return (
    <>
      <div className="border-0 m-auto p-4" style={{ maxWidth: "90vw" }}>
        <div className="p-2 border-b-2 mb-3">
          <h2 className="text-gray-600 font-semibold">Cursos</h2>
          <span className="text-xs uppercase">Listado de los cursos</span>
        </div>

        <Tabla
          rows={Data}
          columns={column}
          editar={mostrarDetalles}
          loading={{
            isLoading: IsLoading,
            ...dataTabla,
          }}
        >
          <Row className="mb-3">
            <Col md={5}></Col>
            {Number(user.id_rol) === 1 && (
              <Col md={7}>
                <div className="flex justify-end">
                  <Button
                    className="btnStore border-0 rounded-3 mb-3 text-white font-semibold tracking-wide"
                    style={{ width: "200px" }}
                    onClick={mostrarContent}
                  >
                    Agregar
                  </Button>
                </div>
              </Col>
            )}
          </Row>
        </Tabla>

        {modal && (
          <Upsert
            show={modal}
            onHide={() => setModal(false)}
            item={DataR}
            update={DataR}
            reload={() => setReload((current) => !current)}
          />
        )}
      </div>
    </>
  );
};

export default CursoSis;
