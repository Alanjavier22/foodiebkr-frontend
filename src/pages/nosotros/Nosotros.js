import React from "react";
import { motion } from "framer-motion";
import { FiTarget, FiHeart, FiEye, FiInstagram, FiShoppingBag } from "react-icons/fi";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

export default function Nosotros() {
  return (
    <div className="min-h-screen pb-20 bg-[#f9fbfc] pt-24 overflow-hidden relative">
      {/* Background Ornaments */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl -z-10 mix-blend-multiply opacity-60"></div>
      <div className="absolute bottom-40 left-0 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl -z-10 mix-blend-multiply opacity-60"></div>

      <div className="max-w-6xl mx-auto px-5 lg:px-10">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight mb-4">
            Sobre <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">Nosotros</span>
          </h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-pink-300 to-pink-500 rounded-full mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            𝑴𝒂𝒓𝒊𝒂 𝑮𝒂𝒃𝒓𝒊𝒆𝒍𝒂 | Pastelería Creativa<br/>
            <span className="font-medium text-gray-800">Creamos el pastel de tus sueños ✨</span><br/>
            Guayaquil, Ecuador 📍
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8">
            <a href="https://www.instagram.com/mariagabriela.chef/" target="_blank" rel="noopener noreferrer" 
               className="flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-md shadow-sm border border-gray-100 rounded-full text-pink-500 hover:text-white hover:bg-gradient-to-r hover:from-pink-400 hover:to-orange-400 font-semibold transition-all duration-300 hover:-translate-y-1">
              <FiInstagram size={20} /> @mariagabriela.chef (Blog & Clases)
            </a>
            <a href="https://www.instagram.com/fancake.ec/" target="_blank" rel="noopener noreferrer" 
               className="flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-md shadow-sm border border-gray-100 rounded-full text-blue-500 hover:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 font-semibold transition-all duration-300 hover:-translate-y-1">
              <FiShoppingBag size={20} /> @fancake.ec (Insumos)
            </a>
          </div>
        </motion.div>

        {/* Mission / Vision / Objective Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative bg-white/70 backdrop-blur-lg rounded-3xl p-8 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-orange-400 flex items-center justify-center text-white mb-6 shadow-lg shadow-pink-200">
              <FiHeart size={28} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 tracking-wide">Misión</h2>
            <p className="text-gray-600 font-light leading-relaxed text-justify">
              Ofrecer delicias irresistibles que deleiten los sentidos y creen momentos memorables. Nos esforzamos por utilizar ingredientes frescos y de alta calidad, combinados con la pasión y la creatividad, para satisfacer los antojos de nuestros clientes y convertir cada ocasión en una celebración dulce.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group relative bg-white/70 backdrop-blur-lg rounded-3xl p-8 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-400 flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-200">
              <FiEye size={28} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 tracking-wide">Visión</h2>
            <p className="text-gray-600 font-light leading-relaxed text-justify">
              Ser reconocidos como la mejor pastelería de la región, destacando por nuestra excelencia en la calidad, innovación y servicio al cliente. Aspiramos a convertirnos en un destino favorito para los amantes de los postres, proporcionando experiencias gastronómicas únicas y construyendo una marca que inspire confianza y alegría.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="group relative bg-white/70 backdrop-blur-lg rounded-3xl p-8 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-200">
              <FiTarget size={28} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 tracking-wide">Objetivo</h2>
            <p className="text-gray-600 font-light leading-relaxed text-justify">
              En el próximo año, aumentar nuestra cuota de mercado en un 20% mediante la expansión de nuestra línea de productos, la mejora de la eficiencia operativa y el fortalecimiento de las asociaciones con proveedores locales. Aspiramos a fomentar la lealtad del cliente ofreciendo promociones especiales.
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
