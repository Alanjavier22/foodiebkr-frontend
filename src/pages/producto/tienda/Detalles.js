import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import Breadcrumb from "react-bootstrap/Breadcrumb";
import Placeholder from "react-bootstrap/Placeholder";
import { AiOutlineHome } from "react-icons/ai";

import DetalleContent from "./DetalleContent";
import { getMethod } from "../../../fetch/getMethod";

export default function Detalles() {
  let { id_categoria, detalle } = useParams();

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMethod({
      path: `/producto/consultar/detalles/categoria/${id_categoria}`,
      setData,
      setIsLoading,
      showSwal: false,
    });
  }, [id_categoria]);

  const goToTienda = () => {
    navigate(`/tienda`);
  };

  const goToProduct = () => {
    navigate(
      `/categoria-producto/${data[0]?.id_producto}/${data[0]?.nombre_producto}`
    );
  };

  const goToSubProduct = () => {
    navigate(
      `/categoria-producto/${data[0]?.id_producto}/${data[0]?.nombre_producto}/${data[0]?.id_subproducto}/${data[0]?.nombre_subproducto}`
    );
  };

  return (
    <>
      <div className="px-0 py-4">
        {IsLoading && (
          <>
            <Placeholder className="flex justify-start ml-4" animation="glow">
              <Placeholder md={4} className="m-3 h-7" />
            </Placeholder>
            <Placeholder className="flex justify-start ml-4" animation="glow">
              <Placeholder md={6} className="m-3 h-80" />
              <Placeholder md={5} className="m-3 h-80" />
            </Placeholder>
          </>
        )}

        {data && !IsLoading && (
          <>
            <Breadcrumb className="px-5 pb-1 fs-6 pt-1">
              <Breadcrumb.Item
                onClick={goToTienda}
                id="canvasText"
                className="min-w-14 py-0 text-center font-semibold capitalize tracking-wider"
              >
                <AiOutlineHome className="min-w-6" /> Tienda
              </Breadcrumb.Item>
              <Breadcrumb.Item
                onClick={goToProduct}
                id="canvasText"
                className="min-w-14 py-0 text-center font-semibold capitalize tracking-wider"
              >
                {data[0]?.nombre_producto.toLowerCase() || "_"}
              </Breadcrumb.Item>
              <Breadcrumb.Item
                onClick={goToSubProduct}
                id="canvasText"
                className="min-w-14 py-0 text-center font-semibold capitalize tracking-wider"
              >
                {data[0]?.nombre_subproducto.toLowerCase() || "_"}
              </Breadcrumb.Item>
              <Breadcrumb.Item
                active
                className="min-w-14 py-0 text-center font-semibold capitalize tracking-wider"
              >
                {data[0]?.nombre.toLowerCase() || "_"}
              </Breadcrumb.Item>
            </Breadcrumb>

            <div className="px-5">
              <DetalleContent item={data[0]} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
