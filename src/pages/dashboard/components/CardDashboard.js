import { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { BsCashCoin } from "react-icons/bs";
import { getMethod } from "../../../fetch/getMethod";
import { motion } from "framer-motion";

const CardDashboard = ({ path, label, icon }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getMethod({
      path: `/dashboard/${path}`,
      setData,
      showSwal: false,
      setIsLoading: () => {},
    });
  }, [path]);

  const gradientFrom = icon === "shop" ? "from-pink-500" : "from-emerald-500";
  const gradientTo = icon === "shop" ? "to-rose-400" : "to-teal-400";
  const glowColor = icon === "shop" ? "bg-pink-400/20" : "bg-teal-400/20";

  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-white/70 backdrop-blur-xl border border-white shadow-xl rounded-[2rem] p-6 flex flex-row items-center justify-between h-full relative overflow-hidden group cursor-pointer"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 ${glowColor} group-hover:scale-150 transition-transform duration-700`}></div>

      <div className="flex flex-col justify-between w-2/3 relative z-10">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 leading-relaxed">
          {label}
        </h4>
        <span className="text-3xl md:text-4xl font-black text-gray-800 tracking-tight">
          ${data && data.total_ventas ? data.total_ventas : "0.00"}
        </span>
      </div>

      <div className="relative z-10 w-1/3 flex justify-end">
        <div className={`w-16 h-16 rounded-full bg-gradient-to-tr ${gradientFrom} ${gradientTo} flex items-center justify-center text-white shadow-lg`}>
          {icon === "shop" && <FiShoppingCart size={28} />}
          {icon === "cash" && <BsCashCoin size={28} />}
        </div>
      </div>
    </motion.div>
  );
};

export default CardDashboard;
