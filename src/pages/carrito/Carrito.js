import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import Detalles from "./content/Detalles";
import { motion } from "framer-motion";

const Carrito = ({ user }) => {
  const { dataCar } = useContext(CartContext);

  return (
    <div className="min-h-screen bg-[#f9fbfc] pt-5 pb-20 relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-3xl -z-10 mix-blend-multiply opacity-50"></div>
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-pink-200/40 rounded-full blur-3xl -z-10 mix-blend-multiply opacity-50"></div>

      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight mb-4">
            Tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Carrito</span>
          </h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mx-auto mb-6"></div>
        </motion.div>

        {/* SI NO TIENE NADA EN EL CARRITO */}
        {Number(dataCar.cantidad) === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center items-center w-full max-w-3xl mx-auto bg-white/60 backdrop-blur-xl border border-white/80 shadow-2xl rounded-[2rem] p-12 text-center"
            style={{ minHeight: "50vh" }}
          >
            {/* Custom Empty Cart Illustration via CSS/HTML */}
            <div className="relative w-40 h-40 mb-8 mx-auto">
              <div className="absolute inset-0 bg-blue-100/50 rounded-full blur-xl animate-pulse"></div>
              <div className="relative z-10 flex items-center justify-center w-full h-full bg-white rounded-full shadow-lg border border-gray-100">
                <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <div className="absolute top-10 right-10 w-4 h-4 bg-pink-500 rounded-full animate-ping"></div>
                <div className="absolute top-10 right-10 w-4 h-4 bg-pink-500 rounded-full"></div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-wide mb-3">
              TU CARRITO ESTÁ VACÍO
            </h2>
            <p className="max-w-md mx-auto text-gray-500 text-lg mb-10 font-medium">
              Parece que aún no has agregado deliciosos pasteles o bocaditos. ¡Explora la tienda!
            </p>
            
            <Link to="/tienda">
              <button className="px-10 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full font-bold tracking-wider shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1">
                VOLVER A TIENDA
              </button>
            </Link>
          </motion.div>
        )}

        {/* SI TIENE ALGO EN EL CARRITO */}
        {Number(dataCar.cantidad) !== 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <Detalles dataCar={dataCar} user={user} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Carrito;
