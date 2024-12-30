import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Breadcrumb, Row, Col, Form } from "react-bootstrap";
import { AiOutlineHome } from "react-icons/ai";

import Servicios from "../../../components/Servicios";
import { getMethod } from "../../../fetch/getMethod";

const TiendaInventario = () => {
  const navigate = useNavigate();

  //Fetch
  const [Data, setData] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);

  const [totalMostrado, setTotalMostrado] = useState(0);

  useEffect(() => {
    getMethod({
      path: "/inventario/consultar/true",
      setData,
      setIsLoading,
      showSwal: false,
    });

    localStorage.setItem("seccion", "inventario");
  }, []);

  return (
    <>
      <div className="px-5 pb-4" style={{ minHeight: "61vh" }}>
        <Breadcrumb className="pt-3 fs-6">
          <Breadcrumb.Item
            onClick={() => navigate(`/`)}
            id="canvasText"
            className="min-w-14 py-0 text-center font-semibold capitalize tracking-wider"
          >
            <AiOutlineHome className="min-w-6" /> Inicio
          </Breadcrumb.Item>
          <Breadcrumb.Item
            active
            className="min-w-14 py-0 text-center font-semibold capitalize tracking-wider"
          >
            Productos
          </Breadcrumb.Item>
        </Breadcrumb>

        <Row className="flex w-full justify-center items-center px-2 mt-2">
          <Col mdlg={12}>
            <Form.Label className="w-full px-2 py-0 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Mostrando {totalMostrado} de {Data?.length} resultados
            </Form.Label>
          </Col>
        </Row>

        <Servicios
          item={Data}
          IsLoading={IsLoading}
          totalMostrado={(x) => setTotalMostrado(x)}
        />
      </div>
    </>
  );
};

export default TiendaInventario;
