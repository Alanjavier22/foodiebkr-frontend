import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Row, Col, Form, Breadcrumb } from "react-bootstrap";
import { AiOutlineHome } from "react-icons/ai";

import Servicios from "../../../components/Servicios";
import { getMethod } from "../../../fetch/getMethod";

const InventarioTd = () => {
  let { id_producto, producto, id_subproducto, subproducto } = useParams();

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);

  const [totalMostrado, setTotalMostrado] = useState(0);

  useEffect(() => {
    getMethod({
      path: `/inventario/consultar/inventario/${id_producto}/${id_subproducto}/true`,
      setData,
      setIsLoading,
      showSwal: false,
    });
  }, [id_subproducto]);

  const orden = ({ target }) => {
    let newOrden = [];

    if (target.value === "id asc") {
      newOrden = [...data].sort((a, b) => a.id_categoria - b.id_categoria);
    }

    if (target.value === "id desc") {
      newOrden = [...data].sort((a, b) => b.id_categoria - a.id_categoria);
    }

    if (target.value === "precio asc") {
      newOrden = [...data].sort((a, b) => Number(a.valor) - Number(b.valor));
    }

    if (target.value === "precio desc") {
      newOrden = [...data].sort((a, b) => Number(b.valor) - Number(a.valor));
    }

    setData(newOrden);
  };

  const goToTienda = () => {
    navigate("/productos");
  };

  const goToProduct = () => {
    navigate(`/inventario-producto/${id_producto}/${producto}`);
  };

  return (
    <>
      <div className="px-5 pb-4">
        <Breadcrumb className="pt-3 fs-6">
          <Breadcrumb.Item
            onClick={goToTienda}
            id="canvasText"
            className="min-w-14 py-0 text-center font-semibold capitalize tracking-wider"
          >
            <AiOutlineHome className="min-w-6" />
            Producto
          </Breadcrumb.Item>
          <Breadcrumb.Item
            onClick={goToProduct}
            id="canvasText"
            className="min-w-14 py-0 text-center font-semibold capitalize tracking-wider"
          >
            {producto}
          </Breadcrumb.Item>
          <Breadcrumb.Item
            active
            className="min-w-14 py-0 text-center font-semibold capitalize tracking-wider"
          >
            {subproducto.toLowerCase()}
          </Breadcrumb.Item>
        </Breadcrumb>

        <Row className="flex w-full justify-end items-center px-2 mt-2">
          <Col md={8} lg={5} className="pb-0 d-flex flex-row ordenarResp">
            <div className="flex w-full pb-2 items-baseline">
              <Form.Label className="w-40 px-2 py-0 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Ordenar por
              </Form.Label>
              <Form.Select
                size="sm"
                onChange={orden}
                className="w-full h-full ml-4 px-4 py-2 my-0 border-b-2 text-left text-xs font-semibold uppercase text-gray-600 tracking-wider"
              >
                <option className="capitalize" value="id asc">
                  Predeterminado
                </option>
                <option className="capitalize" value="id desc">
                  últimos agregados
                </option>
                <option className="capitalize" value="precio asc">
                  Precio más bajo al más alto
                </option>
                <option className="capitalize" value="precio desc">
                  Precio más alto al más bajo
                </option>
              </Form.Select>
            </div>
          </Col>
        </Row>

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
            categoria={producto}
            detalle={true}
            IsLoading={IsLoading}
            totalMostrado={(x) => setTotalMostrado(x)}
          />
        )}
      </div>
    </>
  );
};

export default InventarioTd;
