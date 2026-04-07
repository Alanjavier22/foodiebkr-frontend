import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import AddCart from "../../../components/AddCart";
import { motion } from "framer-motion";

const DetalleContent = ({ item }) => {
  const [formulario, setFormulario] = useState({
    nombre: item.nombre,
    imagen: item.imagen,
    descripcion: item.descripcion,
    cantidad: 1,
    valor: item.valor,
    subtotal: 0,
    total: 0,
    seccion: "producto",
  });

  const [total, setTotal] = useState(1 * item.valor);

  //SE REALIZA OPERACIONES REQUERIDAS
  useEffect(() => {
    if (formulario) {
      let cantidad = Number(formulario?.cantidad) ?? 1;

      if (formulario.valor) {
        let precio = parseFloat(formulario.valor);
        setTotal(precio * cantidad);
      }
    }
  }, [formulario]);

  //FUNCION PARA TOMAR VALORES SELECCIONADOS
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.match(/^\d*$/) && value.length <= 3) {
      setFormulario((prevFormulario) => ({
        ...prevFormulario,
        [name]: value,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      setFormulario((prevFormulario) => ({
        ...prevFormulario,
        [name]: "1",
      }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-4 lg:py-8" style={{ minHeight: "70vh" }}>
      <div className="flex flex-col lg:flex-row gap-12 xl:gap-16 items-start">
        {/* Left Side: Product Image */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2 flex justify-center lg:sticky lg:top-24 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-200 to-indigo-100 rounded-3xl blur-2xl opacity-40 scale-105"></div>
          <img
            src={item?.imagen}
            alt={item?.nombre}
            className="w-full max-w-md lg:max-w-lg h-auto object-cover rounded-3xl shadow-2xl z-10 border border-white/50"
          />
        </motion.div>

        {/* Right Side: Product Details */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:w-1/2 flex flex-col"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight leading-tight mb-4 uppercase">
            {item?.nombre || "-"}
          </h1>

          {/* Pricing Row */}
          <div className="flex items-center gap-4 mb-6">
             <div className="px-4 py-2 bg-pink-50 rounded-2xl border border-pink-100 shadow-sm">
               <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest block mb-1">Precio (Sin IVA)</span>
               <span className="text-3xl font-bold text-pink-600">${item?.valor.replace("$", "")}</span>
             </div>
          </div>

          {/* Description Section - Replaced Textarea! */}
          {item?.descripcion && (
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
               <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Descripción</h3>
               <p className="text-gray-600 leading-relaxed font-medium text-lg whitespace-pre-wrap">
                 {item?.descripcion}
               </p>
            </div>
          )}

          {/* Cart Interaction */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 border border-white/60 shadow-xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
             
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto relative z-10">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">CANTIDAD</span>
                <Form.Control
                  className="w-24 text-center rounded-xl border-gray-200 focus:ring-2 focus:ring-pink-400 shadow-inner font-bold text-xl h-14"
                  name="cantidad"
                  value={formulario.cantidad}
                  maxLength={3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            <div className="flex flex-col items-start sm:items-end w-full sm:w-auto mt-2 sm:mt-0 relative z-10 border-t sm:border-t-0 sm:border-l border-gray-200 pt-4 sm:pt-0 sm:pl-6">
               <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Calculado</span>
               <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">${total}</span>
            </div>
          </div>
          
          <div className="w-full flex justify-end mb-10">
            <div className="w-full sm:w-1/2 lg:w-2/3">
              <AddCart item={formulario} total={total} />
            </div>
          </div>

          {/* Categories / Tags */}
          <div className="pt-6 border-t border-gray-200 flex flex-col md:flex-row md:items-center gap-4">
             <span className="text-sm font-bold text-gray-400 uppercase tracking-widest flex-[shrink-0]">Etiquetas:</span>
             <div className="flex flex-wrap gap-2">
                <Link to={`/categoria-producto/${item?.id_producto}/${item?.nombre_producto}`} className="px-4 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-full text-sm font-bold capitalize transition-colors shadow-sm">
                  {item?.nombre_producto.toLowerCase()}
                </Link>
                <Link to={`/categoria-producto/${item?.id_producto}/${item?.nombre_producto}/${item?.id_subproducto}/${item?.nombre_subproducto}`} className="px-4 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-full text-sm font-bold capitalize transition-colors shadow-sm border border-gray-200">
                  {item?.nombre_subproducto.toLowerCase()}
                </Link>
             </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default DetalleContent;
