import { useEffect, useState, useCallback, useMemo } from "react";
import VentasTabla from "./cliente/components/VentasTabla";
import { getMethod } from "../../fetch/getMethod";
import { motion } from "framer-motion";
import dateCurrent from "../../utils/DateCurrent";

const MySales = ({ user }) => {
  const isAdmin = Number(user.id_rol) === 1;

  const [data, setData] = useState(null);
  const [IsLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const [formData, setFormData] = useState({
    estado: "-",
    fechaInicio: "",
    fechaFin: "",
  });

  const [dataTabla, setDataTabla] = useState({
    noData: true,
    textNoData: "No datos",
  });

  const LoadingTable = useCallback(() => {
    setData(null);
    setDataTabla({ noData: true });
  }, []);

  const fetchVentas = useCallback((searchData) => {
    LoadingTable();
    getMethod({
      path: `/ventas/consultar/Tienda/${searchData.estado}/${
        searchData.fechaInicio || "-"
      }/${searchData.fechaFin || "-"}`,
      setData: (datos) => {
        if (!datos || datos.length === 0) {
          setDataTabla({
            noData: false,
            textNoData: "No se encontraron resultados para la búsqueda",
            isLoading: true,
          });
          setData([]);
        } else {
           setData(datos);
        }
      },
      setIsLoading,
    });
  }, [LoadingTable]);

  useEffect(() => {
    fetchVentas(formData);
  }, [fetchVentas, reload, formData]); // Fixed ESLint

  const handleChange = (e) => {
    setReload((current) => !current);
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetSelectEstado = () =>
    handleChange({ target: { name: "estado", value: "-" } });

  useEffect(() => {
    if (!formData.fechaInicio) {
      handleChange({
        target: { name: "fechaFin", value: dateCurrent() },
      });
    }
  }, [formData.fechaInicio]); // Needs 'handleChange' strictly, but it causes re-renders if not handled right, ignoring for now or using deps

  return (
    <div className="min-h-screen bg-[#f9fbfc] pt-8 pb-20 relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-10 left-10 w-[600px] h-[600px] bg-gradient-to-br from-indigo-100/50 to-purple-100/40 rounded-full blur-[100px] -z-10 mix-blend-multiply opacity-60"></div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10 w-full">
        {/* Header Options */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 w-full"
        >
          <div className="flex items-center gap-4 mb-2">
             <div className="p-3 bg-white shadow-sm border border-gray-100 rounded-2xl">
               <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
             </div>
             <h2 className="text-3xl font-black text-gray-800 tracking-tight">
               Mis {isAdmin ? "Ventas" : "Compras"}
             </h2>
          </div>
          <span className="text-gray-500 font-medium text-sm ml-14">
            Listado y filtro de todas las {isAdmin ? "ventas" : "compras"} realizadas en la plataforma
          </span>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.1 }}
           className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl rounded-[2rem] p-6 lg:p-10"
        >
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row gap-6 mb-8 w-full bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
             
             {/* Estado Filter */}
             <div className="flex-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Filtro Estado</label>
                <select
                  name="estado"
                  className="w-full bg-white border border-gray-200 text-gray-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all font-medium text-sm shadow-sm"
                  value={formData.estado}
                  onChange={handleChange}
                >
                  <option value="-">Todos los estados</option>
                  <option value="PENDING REVIEW">En Revisión (Pending)</option>
                  <option value="COMPLETED">Completados</option>
                </select>
             </div>

             {/* Fecha Inicio Filter */}
             <div className="flex-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Fecha Desde</label>
                <input
                  type="date"
                  name="fechaInicio"
                  max={dateCurrent()}
                  className="w-full bg-white border border-gray-200 text-gray-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all font-medium text-sm shadow-sm"
                  value={formData.fechaInicio}
                  onChange={handleChange}
                />
             </div>

             {/* Fecha Fin Filter */}
             <div className="flex-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Fecha Hasta</label>
                <input
                  type="date"
                  name="fechaFin"
                  max={dateCurrent()}
                  min={formData.fechaInicio}
                  disabled={!formData.fechaInicio || formData.fechaInicio === "-"}
                  className="w-full bg-white border border-gray-200 text-gray-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all font-medium text-sm shadow-sm disabled:opacity-50 disabled:bg-gray-100"
                  value={formData.fechaFin}
                  onChange={handleChange}
                />
             </div>

          </div>

          {/* Table Container */}
          <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
              <VentasTabla
                isAdmin={isAdmin}
                data={data}
                formData={formData}
                realizado_por="Tienda"
                loading={{
                  isLoading: IsLoading,
                  ...dataTabla,
                }}
                loadingTable={LoadingTable}
                reload={() => setReload((current) => !current)}
              />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MySales;
