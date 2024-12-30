import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Breadcrumb, Row, Col, Form } from "react-bootstrap";
import { AiOutlineHome } from "react-icons/ai";

import Servicios from "../../../components/Servicios";
import { getMethod } from "../../../fetch/getMethod";

const Categoria = () => {
  let { id_producto, producto } = useParams();

  const seccion = localStorage.getItem("seccion");

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);

  const [totalMostrado, setTotalMostrado] = useState(0);

  useEffect(() => {
    getMethod({
      path: `/${seccion}/consultar/subproducto/${id_producto}/true`,
      setData,
      setIsLoading,
      showSwal: false,
    });
  }, [id_producto]);

  const goToTienda = () => {
    let link = seccion === "producto" ? "/tienda" : "/productos"
    navigate(link);
  };

  return (
    <>
      <div className="px-5 pb-4" style={{ minHeight: "61vh" }}>
        <Breadcrumb className="pt-3 fs-6">
          <Breadcrumb.Item
            onClick={goToTienda}
            id="canvasText"
            className="min-w-14 py-0 text-center font-semibold capitalize tracking-wider"
          >
            <AiOutlineHome className="min-w-6" />
            {seccion === "producto" ? "Tienda" : "Producto"}
          </Breadcrumb.Item>
          <Breadcrumb.Item
            active
            className="min-w-14 py-0 text-center font-semibold capitalize tracking-wider"
          >
            {producto}
          </Breadcrumb.Item>
        </Breadcrumb>

        <Row className="flex w-full justify-center items-center px-2 mt-2">
          <Col mdlg={12}>
            <Form.Label className="w-full px-2 py-0 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Mostrando {totalMostrado} de {data.length} resultados
            </Form.Label>
          </Col>
        </Row>

        {data && (
          <Servicios
            item={data}
            subCategoria={true}
            categoria={producto}
            IsLoading={IsLoading}
            totalMostrado={(x) => setTotalMostrado(x)}
          />
        )}
      </div>
    </>
  );
};

export default Categoria;
