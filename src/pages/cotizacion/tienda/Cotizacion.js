import { useState, useContext } from "react";
import { Tab } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";

import DatosCliente from "./content/DatosCliente";
import DatosCotizacion from "./content/DatosCotizacion";

import { LoadContext } from "../../../context/LoadContext";
import { postMethod } from "../../../fetch/postMethod";

const Cotizacion = ({ user }) => {
  const { setLoadSpinner } = useContext(LoadContext);

  const [key, setKey] = useState("dt-cliente");
  const [datosCotizar, setDatosCotizar] = useState(null);
  const [emptyValue, setEmptyValue] = useState(true);

  const UpdateForm = ({ emptyValues, nameData, formData }) => {
    setEmptyValue(emptyValues);

    if (!emptyValues) {
      setDatosCotizar((prevFormulario) => ({
        ...prevFormulario,
        [nameData]: formData,
      }));
    }
  };

  const enviarCotizacion = () => {
    setLoadSpinner(true);
    postMethod({
      path: "/cotizacion/insert",
      data: { formData: datosCotizar, title: "" },
      showBtn: true,
      reload: () => {
        window.location.reload();
      },
      setIsLoading: setLoadSpinner,
    });
  };

  return (
    <div className="min-h-screen bg-[#f9fbfc] pt-12 pb-20 relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-100/60 to-purple-100/50 rounded-full blur-[100px] -z-10 mix-blend-multiply opacity-60"></div>
      
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 relative z-10 w-full flex flex-col items-center">
        
        {/* Header Options */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 w-full"
        >
          <div className="inline-block p-4 rounded-full bg-indigo-50 text-indigo-600 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-gray-800 tracking-tight uppercase">
            Sistema de <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Cotizaciones</span>
          </h1>
          <p className="text-gray-500 font-medium text-lg mt-4 max-w-2xl mx-auto">Completa el asistente en dos pasos rápidos para emitir tu solicitud comercial. Es sencillo y transparente.</p>
        </motion.div>

        {/* Wizard Container */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-50 rounded-full blur-2xl"></div>

          {/* Stepper Navigation */}
          <div className="flex justify-center mb-10 relative z-10 w-full max-w-2xl mx-auto">
             <div className="flex items-center w-full relative">
                
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2 rounded-full"></div>
                <div className={`absolute top-1/2 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 -z-10 -translate-y-1/2 rounded-full transition-all duration-500 ${key === 'dt-cotizacion' ? 'w-full' : 'w-0'}`}></div>

                {/* Paso 1 */}
                <button 
                  onClick={() => setKey("dt-cliente")}
                  className={`flex flex-col items-center w-1/2 transition-all ${key === 'dt-cliente' ? 'scale-110' : 'opacity-70 hover:opacity-100'}`}
                >
                   <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-md transition-colors ${key === 'dt-cliente' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                      1
                   </div>
                   <span className={`mt-3 text-sm font-bold uppercase tracking-widest ${key === 'dt-cliente' ? 'text-indigo-600' : 'text-gray-400'}`}>
                      Datos del Cliente
                   </span>
                </button>

                {/* Paso 2 */}
                <button 
                  disabled={emptyValue}
                  onClick={() => setKey("dt-cotizacion")}
                  className={`flex flex-col items-center w-1/2 transition-all ${key === 'dt-cotizacion' ? 'scale-110' : emptyValue ? 'opacity-40 cursor-not-allowed' : 'opacity-70 hover:opacity-100'}`}
                >
                   <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-md transition-colors ${key === 'dt-cotizacion' ? 'bg-purple-600 text-white' : emptyValue ? 'bg-gray-100 text-gray-400 shadow-none' : 'bg-indigo-100 text-indigo-600'}`}>
                      2
                   </div>
                   <span className={`mt-3 text-sm font-bold uppercase tracking-widest ${key === 'dt-cotizacion' ? 'text-purple-600' : 'text-gray-400'}`}>
                      Detalles y Artículos
                   </span>
                </button>
             </div>
          </div>

          {/* Form Area */}
          <div className="relative z-10 w-full bg-white/40 p-6 md:p-8 rounded-3xl border border-white/50 shadow-inner">
            <Tab.Container activeKey={key}>
              <Tab.Content>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Tab.Pane eventKey="dt-cliente">
                      <DatosCliente
                        UpdateForm={UpdateForm}
                        goToNextTab={() => setKey("dt-cotizacion")}
                        disabledBtn={emptyValue}
                        user={user}
                      />
                    </Tab.Pane>
                    
                    <Tab.Pane eventKey="dt-cotizacion">
                      <DatosCotizacion
                        datosCotizar={datosCotizar}
                        UpdateForm={UpdateForm}
                      />
                    </Tab.Pane>
                  </motion.div>
                </AnimatePresence>
              </Tab.Content>
            </Tab.Container>
          </div>

          {/* Submit Action */}
          {key === "dt-cotizacion" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mt-10 relative z-10"
            >
              <button
                className={`py-4 px-12 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all shadow-xl hover:-translate-y-1 ${emptyValue ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-indigo-500/30'}`}
                onClick={enviarCotizacion}
                disabled={emptyValue}
              >
                Emitir Cotización Formal
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Cotizacion;
