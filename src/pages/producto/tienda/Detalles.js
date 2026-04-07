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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            <div className="max-w-7xl mx-auto px-5 pt-8 pb-4">
              <div className="flex flex-wrap gap-2 items-center text-sm font-semibold text-gray-500 mb-6 w-full">
                <button
                  onClick={goToTienda}
                  className="flex items-center gap-2 px-4 py-1.5 bg-white/60 hover:bg-white backdrop-blur-md rounded-full shadow-sm text-pink-500 transition-all border border-pink-100"
                >
                  <AiOutlineHome size={16} /> Tienda
                </button>
                <span className="text-pink-300">/</span>
                <button
                  onClick={goToProduct}
                  className="px-4 py-1.5 bg-white/60 hover:bg-white backdrop-blur-md rounded-full shadow-sm transition-all border border-gray-100 capitalize"
                >
                  {data[0]?.nombre_producto.toLowerCase() || "_"}
                </button>
                <span className="text-pink-300">/</span>
                <button
                  onClick={goToSubProduct}
                  className="px-4 py-1.5 bg-white/60 hover:bg-white backdrop-blur-md rounded-full shadow-sm transition-all border border-gray-100 capitalize"
                >
                  {data[0]?.nombre_subproducto.toLowerCase() || "_"}
                </button>
                <span className="text-pink-300">/</span>
                <span className="px-4 py-1.5 bg-pink-50 text-pink-600 rounded-full shadow-inner border border-pink-100 capitalize font-bold">
                  {data[0]?.nombre.toLowerCase() || "_"}
                </span>
              </div>
            </div>

            <div className="px-5">
              <DetalleContent item={data[0]} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
