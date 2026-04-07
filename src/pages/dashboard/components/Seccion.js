import React, { useEffect, useState } from "react";
import BarChart from "../diagrams/BarChart";
import LineChart from "../diagrams/LineChart";
import RadarChart from "../diagrams/RadarChart ";
import CardDashboard from "./CardDashboard";
import { motion } from "framer-motion";

const seccionDsh = (_seccion, option, setOption) => {
  const selectClasses = "w-full md:w-auto min-w-[250px] bg-white border-none rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-indigo-300 text-gray-600 font-bold text-sm tracking-wider uppercase cursor-pointer outline-none transition-all";
  
  if (_seccion === "Clientes") {
    return (
      <div className="flex flex-col gap-8">
        <div className="bg-white/60 backdrop-blur-xl border border-white shadow-xl rounded-3xl p-6">
           <LineChart
             path="mayor-compra"
             text="Clientes con Mayor Venta [ Mostrando 5 ]"
             scale={{ textY: "Valor", textX: "" }}
             isnumeric={true}
           />
        </div>
        <div className="bg-white/60 backdrop-blur-xl border border-white shadow-xl rounded-3xl p-6">
           <LineChart
             path="cliente-mayor-cotizacion"
             text="Clientes con Mayor cotización relizada [ Mostrando 5 ]"
             scale={{ textY: "Valor", textX: "" }}
             isnumeric={true}
           />
        </div>
      </div>
    );
  }

  if (_seccion === "Cotizaciones") {
    return (
      <div className="flex flex-col gap-8">
        <div className="bg-white/60 backdrop-blur-xl border border-white shadow-xl rounded-3xl p-6">
           <BarChart
             path="producto-mas-cotizacion"
             text="Productos más cotizados [ Mostrando 5 ]"
             scale={{ textY: "Cantidad", textX: "" }}
           />
        </div>
        <div className="bg-white/60 backdrop-blur-xl border border-white shadow-xl rounded-3xl p-6">
           <div className="mb-6 flex justify-end">
             <select
               value={option || "cotizacion-fecha"}
               onChange={(event) => setOption(event.target.value)}
               className={selectClasses}
             >
               <option value="cotizacion-fecha">COTIZACIONES POR MES</option>
               <option value="cotizacion-fecha-semana">COTIZACIONES POR SEMANA</option>
             </select>
           </div>
           <BarChart
             path={option ? option : "cotizacion-fecha"}
             text="Cotizaciones por fecha"
             scale={{ textY: "Cantidad", textX: "" }}
           />
        </div>
      </div>
    );
  }

  if (_seccion === "Ventas") {
    return (
      <div className="flex flex-col gap-8">
        <div className="bg-white/60 backdrop-blur-xl border border-white shadow-xl rounded-3xl p-6 xl:w-2/3 mx-auto">
           <RadarChart
             path="producto-mas-vendido"
             text="Producto más Vendido"
             scale={{
               textY: "Valor",
               textX: "Producto",
             }}
             isnumeric={true}
           />
        </div>
        <div className="bg-white/60 backdrop-blur-xl border border-white shadow-xl rounded-3xl p-6">
           <div className="mb-6 flex justify-end">
             <select
               value={option || "ventas-fecha"}
               onChange={(event) => setOption(event.target.value)}
               className={selectClasses}
             >
               <option value="ventas-fecha">VENTAS POR MES</option>
               <option value="ventas-fecha-semana">VENTAS POR SEMANA</option>
             </select>
           </div>
           <BarChart
             path={option ? option : "ventas-fecha"}
             text="Ventas por fecha"
             scale={{ textY: "Valor", textX: "" }}
             isnumeric={true}
           />
        </div>
      </div>
    );
  }
};

const Seccion = ({ _seccion }) => {
  const [dashboard, setDashboard] = useState(null);
  const [option, setOption] = useState(null);

  useEffect(() => {
    const component = seccionDsh(_seccion, option, setOption);
    setDashboard(component);
  }, [_seccion, option]);

  useEffect(() => {
    setOption(null);
  }, [_seccion]);

  return (
    <div className="w-full flex flex-col gap-10">
      
      {/* Top Header & KPIs */}
      <div className="w-full">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-6">Visualización de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Métricas Principales</span></h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full lg:w-3/4">
          <CardDashboard path="" label="Total Acumulado de Ventas" icon="shop" />
          <CardDashboard path="dia" label="Ventas Registradas Hoy" icon="cash" />
        </div>
      </div>

      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full"
      >
        <div className="flex items-center mb-6">
           <h2 className="text-xl font-bold text-gray-700 uppercase tracking-widest bg-white/50 px-6 py-2 rounded-full border border-white shadow-sm inline-block">
             Análisis de {_seccion}
           </h2>
        </div>
        
        {/* Render Charts */}
        <div className="w-full pb-10">
          {dashboard}
        </div>
      </motion.div>
    </div>
  );
};

export default Seccion;
