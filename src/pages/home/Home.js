import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Button from "react-bootstrap/Button";

import Slider from "../../components/Carousel";
import Servicios from "../../components/Servicios";
import { getMethod } from "../../fetch/getMethod";

const Home = () => {
  const navigate = useNavigate();

  //Fetch
  const [Data, setData] = useState(null);
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMethod({
      path: "/producto/consultar/true",
      setData,
      setIsLoading,
      showSwal: false,
    });
  }, []);

  const toGoStore = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate(`/tienda`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="bg-[#f9fbfc] min-h-screen pb-10"
    >
      <Slider sliderData={Data} />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="py-16 px-4 max-w-4xl mx-auto"
      >
        <h4 className="text-center font-extrabold text-3xl md:text-4xl text-gray-800 tracking-tight leading-tight mb-4">
          Conoce nuestros productos y categorías <span className="text-pink-400">a continuación</span>
        </h4>
        <div className="flex justify-center mt-6">
          <div className="h-1.5 w-24 bg-gradient-to-r from-pink-300 to-pink-500 rounded-full" />
        </div>
      </motion.div>

      <div className="px-5 max-w-[1400px] mx-auto">
        <Servicios item={Data} IsLoading={IsLoading} />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-center py-12 px-2"
      >
        <button
          onClick={toGoStore}
          className="bg-gradient-to-r from-gray-800 to-gray-900 border-0 text-white font-bold tracking-wider hover:scale-105 hover:shadow-2xl transition-all duration-300"
          style={{ borderRadius: "50px", width: "220px", padding: "16px" }}
        >
          IR A TIENDA
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Home;
