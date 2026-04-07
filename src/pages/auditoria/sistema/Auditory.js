import { useState, useEffect } from "react";
import Tabla from "../../../components/Tabla";
import { getMethod } from "../../../fetch/getMethod";
import { motion } from "framer-motion";

const column = [
  { field: "index", header: "Número" },
  { field: "seccion", header: "Seccion" },
  { field: "proceso", header: "proceso" },
  { field: "descripcion", header: "Descripcion" },
  { field: "_fecha", header: "Fecha de registro", width: 200 },
  { field: "usuario_ingreso", header: "Usuario de registro", width: 200 },
];

const Auditory = ({ user }) => {
  const [dataTabla, setDataTabla] = useState({
    noData: true,
    textNoData: "No datos",
  });

  const [Data, setData] = useState(null);
  const [IsLoading, setIsLoading] = useState(true);

  const LoadingTable = () => {
    setData(null);
    setDataTabla({ noData: true });
  };

  useEffect(() => {
    LoadingTable();
    getMethod({
      path: `/auditoria/`,
      setData: (datos) => {
        if (datos.length === 0) {
          setDataTabla({
            noData: false,
            textNoData: "No se encontraron datos",
            isLoading: true,
          });
        }
        setData(datos);
      },
      setIsLoading,
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#f9fbfc] pt-10 pb-20 relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-100/50 to-indigo-100/30 rounded-full blur-[100px] -z-10 mix-blend-multiply opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-100/40 rounded-full blur-[100px] -z-10 mix-blend-multiply opacity-50"></div>

      <div className="max-w-[90vw] mx-auto px-4 lg:px-8 relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-2">
             <div className="w-12 h-12 bg-gradient-to-tr from-gray-800 to-gray-600 rounded-full flex items-center justify-center text-white shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
             </div>
             <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Centro de <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-400">Auditoría</span></h1>
          </div>
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-[4rem]">Listado de todo proceso realizado en el sistema</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-[2rem] p-6 overflow-hidden"
        >
          <div className="overflow-x-auto custom-scrollbar">
            <Tabla
              rows={Data}
              columns={column}
              loading={{
                isLoading: IsLoading,
                ...dataTabla,
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auditory;
