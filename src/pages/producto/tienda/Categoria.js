import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Breadcrumb, Row, Col, Form } from "react-bootstrap";
import { AiOutlineHome } from "react-icons/ai";

import Servicios from "../../../components/Servicios";
import { getMethod } from "../../../fetch/getMethod";
import { motion } from "framer-motion";

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
      <div className="px-5 pb-4 max-w-7xl mx-auto" style={{ minHeight: "61vh" }}>
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-xl rounded-3xl p-8 mt-6 mb-10 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-300/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-200/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <button 
            onClick={goToTienda}
            className="absolute top-4 left-4 flex gap-2 items-center px-4 py-2 bg-white/50 hover:bg-white rounded-full text-purple-600 transition-all shadow-sm font-semibold text-sm group z-20"
          >
            <AiOutlineHome size={18} className="group-hover:scale-110 transition-transform" />
            {seccion === "producto" ? "Ir a Tienda" : "Atrás"}
          </button>

          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 tracking-tight mb-4 relative z-10 capitalize mt-4 md:mt-0">
            {producto}
          </h2>
          <div className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-white to-gray-50/50 px-5 py-2 rounded-full shadow-inner border border-gray-100 text-sm font-semibold text-gray-600 relative z-10">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50 animate-pulse"></span>
            <span>Mostrando {totalMostrado} de {data.length} deliciosos resultados</span>
          </div>
        </motion.div>

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
