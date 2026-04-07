import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const GridServices = ({
  producto,
  categoria,
  subCategoria,
  detalle,
  title,
}) => {
  const navigate = useNavigate();

  const seccion = localStorage.getItem("seccion");

  const {
    id_producto,
    id_subproducto,
    id_categoria,
    id_inventario,
    nombre,
    imagen = "NoImage",
  } = producto;

  const viewPage = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const _seccion = seccion === "inventario" ? seccion : "categoria";

    if (subCategoria) {
      navigate(
        `/${_seccion}-producto/${id_producto}/${categoria}/${id_subproducto}/${nombre}`
      );
    } else if (detalle) {
      if (seccion === "inventario")
        navigate(`/inventario/${id_inventario}/${categoria}`);
      else navigate(`/producto/${id_categoria}/${categoria}`);
    } else navigate(`/${_seccion}-producto/${id_producto}/${nombre}`);
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative w-[340px] h-[400px] my-5 rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] overflow-hidden cursor-pointer"
      onClick={viewPage}
    >
      {title && (
        <div className="absolute top-4 left-0 right-0 z-50 px-4">
          <div className="flex justify-center w-full">
            <span className="bg-white/80 backdrop-blur-sm text-pink-500 font-semibold py-1.5 px-6 rounded-full shadow-sm text-sm tracking-wide">
              {title}
            </span>
          </div>
        </div>
      )}
      <div className="h-full w-full flex flex-col items-center justify-start p-6 bg-gradient-to-b from-gray-50/50 to-white">
        <motion.div 
          className="relative w-full h-[65%] rounded-2xl overflow-hidden shadow-inner flex items-center justify-center bg-gray-100"
        >
          <div
            className="absolute inset-0 bg-cover bg-center filter blur-xl opacity-40 scale-110 object-cover"
            style={{ backgroundImage: `url(${imagen})` }}
          />
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 w-full h-full object-cover rounded-2xl"
            src={imagen}
            alt={nombre}
          />
        </motion.div>
        
        <div className="mt-6 text-center px-4 w-full flex flex-col justify-end h-full mb-4">
          <h3 className="text-gray-800 font-bold text-lg leading-tight mb-2 truncate">
            {nombre}
          </h3>
          <div className="flex justify-center mt-auto">
            <button className="bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-md shadow-pink-200 py-2.5 px-8 rounded-full font-medium text-sm hover:from-pink-500 hover:to-pink-600 transition-all duration-300 w-full">
              Ver Detalles
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GridServices;
