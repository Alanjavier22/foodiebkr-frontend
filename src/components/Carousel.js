import { useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { motion } from "framer-motion";

const Slider = ({ sliderData }) => {
  const navigate = useNavigate();

  const viewProduct = ({ id_producto, nombre }) => {
    navigate(`/categoria-producto/${id_producto}/${nombre}`);
  };

  return (
    <div className="mt-20">
      <Carousel fade interval={5000} indicators={false}>
        {sliderData &&
          sliderData.map((item) => (
            <Carousel.Item
              key={item?.id_producto}
              onClick={() => viewProduct(item)}
              className="cursor-pointer"
            >
              <div className="relative flex justify-center items-center h-[70vh] min-h-[500px] overflow-hidden bg-gray-900 rounded-b-3xl shadow-2xl">
                <motion.div
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 6, ease: "easeOut" }}
                  className="absolute inset-0 bg-cover bg-center opacity-60"
                  style={{ backgroundImage: `url(${item.imagen})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative z-10 text-center px-4"
                >
                  <h2 className="text-white text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg mb-4">
                    {item?.nombre}
                  </h2>
                  <button className="bg-white/20 backdrop-blur-md border border-white/40 text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
                    Ver Más
                  </button>
                </motion.div>
              </div>
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
};

export default Slider;
