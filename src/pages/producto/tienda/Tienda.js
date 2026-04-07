import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Breadcrumb, Row, Col, Form } from "react-bootstrap";
import { AiOutlineHome } from "react-icons/ai";

import Servicios from "../../../components/Servicios";
import { getMethod } from "../../../fetch/getMethod";

import { motion } from "framer-motion";

const Tienda = () => {
  const navigate = useNavigate();

  //Fetch
  const [Data, setData] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);

  const [totalMostrado, setTotalMostrado] = useState(0);

  useEffect(() => {
    getMethod({
      path: "/producto/consultar/true",
      setData,
      setIsLoading,
      showSwal: false,
    });
    localStorage.setItem("seccion", "producto");
  }, []);

  return (
    <>
      <div className="px-5 pb-4 max-w-7xl mx-auto" style={{ minHeight: "61vh" }}>
        
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-xl rounded-3xl p-8 mt-6 mb-10 text-center relative overflow-hidden"
        >
          {/* Decorative glows */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-pink-300/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-200/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <button 
            onClick={() => navigate(`/`)}
            className="absolute top-4 left-4 p-2 bg-white/50 hover:bg-white rounded-full text-pink-500 transition-all shadow-sm flex items-center justify-center group"
          >
            <AiOutlineHome size={20} className="group-hover:scale-110 transition-transform" />
          </button>

          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 tracking-tight mb-4 relative z-10">
            Nuestra <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">Tienda</span>
          </h2>
          <div className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-white to-gray-50/50 px-5 py-2 rounded-full shadow-inner border border-gray-100 text-sm font-semibold text-gray-600 relative z-10">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-lg shadow-pink-500/50 animate-pulse"></span>
            <span>Mostrando {totalMostrado} de {Data?.length || 0} deliciosas opciones</span>
          </div>
        </motion.div>

        <Servicios
          item={Data}
          IsLoading={IsLoading}
          totalMostrado={(x) => setTotalMostrado(x)}
        />
      </div>
    </>
  );
};

export default Tienda;
