import { useEffect, useState } from "react";

import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";

import Tabla from "../../../components/Tabla";
import Visualizar from "./content/Visualizar";
import ClienteContent from "./content/ClienteContent";

import FormSearch from "../components/FormSearch";
import { getMethod } from "../../../fetch/getMethod";

import "../../../assets/styles/Cliente.css";

const column = [
  { field: "index", header: "Número" },
  { field: "nombre", header: "Nombre" },
  { field: "apellido", header: "Apellido" },
  { field: "email", header: "Correo" },
  { field: "telefono", header: "Telefono" },
  { field: "estadoStr", header: "Estado" },
  { field: "-", header: "Detalles" },
];

const Cliente = ({ user }) => {
  const [dataTabla, setDataTabla] = useState({
    noData: true,
    textNoData: "No datos",
  });

  //Modales
  const [contentCliente, setContentCliente] = useState(false);
  const [visualizar, setVisualizar] = useState(false);

  //Datos para modal
  const [DataR, setDataR] = useState(null);

  //Fetch
  const [Data, setData] = useState(null);
  const [IsLoading, setIsLoading] = useState(true);

  //Datos consulta
  const [estado, setEstado] = useState(true);

  //Recargar consulta
  const [reload, setReload] = useState(false);

  const LoadingTable = () => {
    setData(null);
    setDataTabla({ noData: true });
  };

  useEffect(() => {
    LoadingTable();
    getMethod({
      path: `/cliente/consultar/${estado}`,
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
  }, [estado, reload]);

  const mostrarDetalles = (item) => {
    setDataR(item);
    setVisualizar(true);
  };

  const mostrarContent = (item, editar) => {
    if (editar) setDataR(item);
    else setDataR({});
    setContentCliente(true);
  };

  const handleChange = (e) => setEstado(e.target.value);

  return (
    <>
      <div className="border-0 m-auto p-4" style={{ maxWidth: "90vw" }}>
        <div className="p-2 border-b-2 mb-3">
          <h2 className="text-gray-600 font-semibold">Clientes</h2>
          <span className="text-xs uppercase">Listado de los clientes</span>
        </div>

        <Tabla
          rows={Data}
          columns={column}
          detalles={mostrarDetalles}
          editar={Number(user.id_rol) === 1 ? mostrarContent : null}
          // loading={{
          //   isLoading: IsLoading,
          // }}
          loading={{
            isLoading: IsLoading,
            ...dataTabla,
          }}
        >
          <Row className="mb-3">
            <Col md={5}>
              <div className="flex w-full pl-2 items-center">
                <Form.Label className="min-w-28 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Estado
                </Form.Label>
                <Form.Select
                  name="estado"
                  size="sm"
                  onChange={handleChange}
                  className="w-full h-full ml-4 px-4 py-2 my-0 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  <option value={true}>Activo</option>
                  <option value={false}>Inactivo</option>
                </Form.Select>
              </div>
            </Col>
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
          <Row className="mb-3">
            <Col md={12} xl={8}>
              <FormSearch
                setData={setData}
                setDataTabla={setDataTabla}
                formData={{ estado }}
              />
            </Col>
          </Row>
        </Tabla>

        {contentCliente && (
          <ClienteContent
            show={contentCliente}
            onHide={() => setContentCliente(false)}
            item={DataR}
            reload={() => setReload((current) => !current)}
          />
        )}

        {visualizar && (
          <Visualizar
            show={visualizar}
            onHide={() => setVisualizar(false)}
            item={DataR}
          />
        )}
      </div>
    </>
  );
};

export default Cliente;
