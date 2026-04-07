import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { Row, Col, Form } from "react-bootstrap";

import Servicios from "../../../components/Servicios";
import { getMethod } from "../../../fetch/getMethod";
import { motion } from "framer-motion";

export default function Resultados() {
  let { nombre } = useParams();

  const [data, setData] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const [totalMostrado, setTotalMostrado] = useState(0);

  useEffect(() => {
    setIsLoading(true);

    getMethod({
      path: `/producto/buscar/${nombre}/-`,
      setData,
      setIsLoading,
      showSwal: false,
    });
  }, [nombre]);

  return (
    <>
      <div className="px-5 pb-4 max-w-7xl mx-auto min-h-[61vh]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-xl rounded-3xl p-8 mt-6 mb-6 text-center relative overflow-hidden"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 tracking-tight mb-4 relative z-10">
            Resultados para <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">"{nombre}"</span>
          </h2>
          <div className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-white to-gray-50/50 px-5 py-2 rounded-full shadow-inner border border-gray-100 text-sm font-semibold text-gray-600 relative z-10">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50 animate-pulse"></span>
            <span>Mostrando {totalMostrado} de {data.length} coincidencias</span>
          </div>
        </motion.div>

        {data && (
          <Servicios
            item={data}
            categoria={"producto"}
            detalle={true}
            IsLoading={IsLoading}
            totalMostrado={(x) => setTotalMostrado(x)}
            search={true}
          />
        )}
      </div>
    </>
  );
}
