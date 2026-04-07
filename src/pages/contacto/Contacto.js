import React from "react";
import Formulario from "./components/Formulario";
import { motion } from "framer-motion";

const Contacto = () => {
  return (
    <div className="min-h-screen bg-[#f9fbfc] pt-24 pb-20 relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl -z-10 mix-blend-multiply opacity-60"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl -z-10 mix-blend-multiply opacity-60"></div>

      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight mb-4">
            Ponte en <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Contacto</span>
          </h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            ¿Tienes alguna consulta o necesitas una cotización especial? Escríbenos o visítanos, ¡haremos tus ideas realidad!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col h-full"
          >
            <Formulario />
          </motion.div>

          {/* Map Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col h-full bg-white/60 backdrop-blur-xl rounded-3xl p-3 border border-white/60 shadow-xl overflow-hidden"
          >
             <iframe
              title="Mapa del sitio"
              width="100%"
              height="100%"
              className="rounded-2xl flex-grow grayscale-[50%] hover:grayscale-0 transition-all duration-500"
              style={{ minHeight: "400px" }}
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1993.5314909626072!2d-79.88937742121381!3d-2.1294798772620385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMsKwMDcnNDQuNyJTIDc5wrA1MycyMS43Ilc!5e0!3m2!1ses-419!2sec!4v1701921054267!5m2!1ses-419!2sec"
             ></iframe>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
