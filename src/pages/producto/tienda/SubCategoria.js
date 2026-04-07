import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Row, Col, Form, Breadcrumb } from "react-bootstrap";
import { AiOutlineHome } from "react-icons/ai";

import Servicios from "../../../components/Servicios";
import { getMethod } from "../../../fetch/getMethod";
import { motion } from "framer-motion";

const SubCategoria = () => {
  let { id_producto, producto, id_subproducto, subproducto } = useParams();
  const seccion = localStorage.getItem("seccion");

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);

  const [totalMostrado, setTotalMostrado] = useState(0);

  useEffect(() => {
    getMethod({
      path: `/${seccion}/consultar/categoria/${id_producto}/${id_subproducto}/true`,
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
    let link = seccion === "producto" ? "/tienda" : "/productos";
    navigate(link);
  };

  const goToProduct = () => {
    const _seccion = seccion === "inventario" ? seccion : "categoria";

    navigate(`/${_seccion}-producto/${id_producto}/${producto}`);
  };

  return (
    <>
      <div className="px-5 pb-4 max-w-7xl mx-auto min-h-[61vh]">
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-xl rounded-3xl p-8 mt-6 mb-6 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-40 h-40 bg-amber-200/40 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-300/40 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>
          
          <div className="absolute top-4 left-4 flex gap-2 z-20">
            <button 
              onClick={goToTienda}
              className="px-4 py-2 bg-white/50 hover:bg-white rounded-full text-orange-600 transition-all shadow-sm font-semibold text-sm flex items-center gap-2 group"
            >
              <AiOutlineHome size={18} className="group-hover:scale-110 transition-transform" />
              {seccion === "producto" ? "Tienda" : "Inicio"}
            </button>
            <button 
              onClick={goToProduct}
              className="px-4 py-2 bg-white/50 hover:bg-white rounded-full text-amber-600 transition-all shadow-sm font-semibold text-sm group capitalize"
            >
              &larr; {producto}
            </button>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 tracking-tight mb-4 relative z-10 capitalize mt-10 md:mt-0">
            {subproducto.toLowerCase()}
          </h2>
          <div className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-white to-gray-50/50 px-5 py-2 rounded-full shadow-inner border border-gray-100 text-sm font-semibold text-gray-600 relative z-10">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50 animate-pulse"></span>
            <span>Explorando la variedad de {subproducto}</span>
          </div>
        </motion.div>
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

export default SubCategoria;
