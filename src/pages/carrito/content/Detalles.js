import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Tabla from "../Components/Tabla";
import DatosCliente from "./DatosCliente";
import PayPalButton from "../../paypal/PayPalButton";

const Detalles = ({ dataCar, user }) => {
  const cartDetails = JSON.parse(localStorage.getItem("Carrito") || null);
  const { login } = user;
  const [data, setData] = useState(null);

  const UpdateForm = (datos) => setData(datos);

  const formikRef = useRef();

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="w-full">
        <Tabla data={cartDetails} user={user} />
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-start mb-20">
        <div className="w-full xl:w-7/12">
          {login ? (
            <DatosCliente
              UpdateForm={UpdateForm}
              formikRef={formikRef}
              user={user}
            />
          ) : (
            <div className="w-full bg-white/60 backdrop-blur-md rounded-3xl p-10 border border-white/60 text-center shadow-lg">
               <div className="w-20 h-20 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6">
                 <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
               </div>
               <h3 className="text-2xl font-extrabold text-gray-800 mb-4 tracking-tight">Ingresa para continuar</h3>
               <p className="text-gray-500 mb-8 font-medium">Debes iniciar sesión para ingresar tus datos y proceder de manera segura con tu compra.</p>
               <Link to="/login">
                 <button className="px-10 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-bold shadow-lg shadow-blue-500/30 w-full sm:w-auto tracking-widest text-sm hover:scale-105 transition-all">
                   INICIAR SESIÓN
                 </button>
               </Link>
            </div>
          )}
        </div>

        <div className="w-full xl:w-5/12 sticky top-24">
          <div className="w-full bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 border border-white/60 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-200/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-0"></div>
             
             <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight mb-8 relative z-10 border-b border-gray-100 pb-5">
               Resumen de Compra
             </h2>
             
             <div className="flex flex-col gap-5 relative z-10 mb-8 font-medium">
               <div className="flex justify-between items-center text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-700">${dataCar.subtotal}</span>
               </div>
               <div className="flex justify-between items-center text-gray-500">
                  <span>Impuestos (IVA {dataCar.iva}%)</span>
                  <span className="font-bold text-gray-700">{dataCar.totalIva}</span>
               </div>
               
               {dataCar.descuento ? (
                 <div className="flex justify-between items-center text-green-600 p-3 bg-green-50/50 rounded-xl border border-green-100/50">
                    <span className="font-bold">Descuento ({dataCar.descuento}%)</span>
                    <span className="font-extrabold">- ${dataCar.totalDesc}</span>
                 </div>
               ) : null}
             </div>

             <div className="border-t-2 border-dashed border-gray-200/80 pt-6 mb-8 relative z-10">
               <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total a Pagar</span>
                  <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">${dataCar.total}</span>
               </div>
             </div>

             <div className="relative z-10">
                {login && data && (
                  <div className="animate-fade-in p-2 bg-slate-50 border border-slate-100 rounded-3xl">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center mb-3 mt-2">PAGO SEGURO CON PAYPAL</p>
                    <PayPalButton datosCliente={data} />
                  </div>
                )}

                {login && !data && (
                  <button
                    className="w-full px-6 py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold tracking-widest uppercase transition-all shadow-xl active:scale-[0.98] focus:ring-4 focus:ring-gray-300 text-sm"
                    onClick={() => formikRef.current.submitForm()}
                  >
                    Confirmar Datos y Pagar
                  </button>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalles;
