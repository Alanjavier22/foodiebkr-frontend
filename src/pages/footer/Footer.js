import React from "react";
import { motion } from "framer-motion";
import { FiInstagram, FiMail, FiMapPin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="relative mt-20 pt-16 pb-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden border-t border-gray-800 shadow-2xl">
      {/* Decorative Blur Circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full mix-blend-overlay filter blur-3xl opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full mix-blend-overlay filter blur-3xl opacity-50 transform translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full place-items-center md:place-items-start text-center md:text-left mb-12">
          
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-40 sm:w-48 bg-white/5 p-4 rounded-xl backdrop-blur-md border border-white/10 shadow-lg"
            >
              <img src="/logo.png" width="100%" alt="Foodie Baker Logo" className="drop-shadow-lg" />
            </motion.div>
            <p className="text-gray-400 text-sm font-medium mt-2 max-w-[200px]">
              Arte en repostería creando momentos dulces para ti.
            </p>
          </div>

          {/* Contact & Location Info */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-white font-bold text-xl tracking-wider mb-2">CAKE STUDIO</h4>
            <div className="flex items-center space-x-3 text-gray-300 hover:text-pink-400 transition-colors">
              <span className="p-2 bg-white/5 rounded-full border border-white/10"><FiMapPin /></span>
              <span className="font-light">Guayaquil, Ecuador 📍</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300 hover:text-pink-400 transition-colors">
              <span className="p-2 bg-white/5 rounded-full border border-white/10"><FiMail /></span>
              <span className="font-light">Creamos el pastel de tus sueños ✨</span>
            </div>
          </div>

          {/* Socials & Links */}
          <div className="flex flex-col md:items-end w-full">
            <h5 className="text-white font-bold tracking-widest mb-4">SÍGUENOS</h5>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ y: -5, scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.instagram.com/lafoodiebaker/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gradient-to-tr from-pink-500 to-orange-400 text-white rounded-xl shadow-lg border border-white/20 flex items-center justify-center"
              >
                <FiInstagram size={24} />
              </motion.a>
              <motion.a
                whileHover={{ y: -5, scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.instagram.com/fancake.ec/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gradient-to-tr from-blue-600 to-purple-500 text-white rounded-xl shadow-lg border border-white/20 flex items-center justify-center"
              >
                <span className="font-bold text-xs leading-none">FAN<br/>CAKE</span>
              </motion.a>
            </div>
            <motion.a
              whileHover={{ color: '#fbcfe8' }}
              href="https://drive.google.com/file/d/1aezWSffEoG1xSp69L5npIwibjlKFDhWO/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 text-xs text-gray-400 underline underline-offset-4 decoration-gray-600 hover:decoration-pink-300 transition-all font-medium"
            >
              Políticas de envío y reembolso
            </motion.a>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6"></div>
        <p className="text-gray-500 text-xs font-light tracking-wide text-center">
          &copy; {new Date().getFullYear()} Maria Gabriela Foodie Baker, Inc. Desarrollado con ❤️ para dulces momentos.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
