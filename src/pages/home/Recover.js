import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FormControl } from "../../components/FormContent";
import { postMethod } from "../../fetch/postMethod";
import { motion } from "framer-motion";

// Esquema de validación
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Correo electrónico no valido")
    .required("El correo electrónico es requerido"),
});

const Recover = () => {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    postMethod({
      path: "/usuario/account-recovery",
      data: { formData, title: "RECUPERACIÓN" },
      showBtn: true,
      reload: () => {
        navigate(`/login`);
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f9fbfc] flex relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-gradient-to-br from-indigo-100/60 to-purple-100/60 rounded-full blur-[100px] -z-10 mix-blend-multiply opacity-60"></div>
      
      <div className="flex w-full max-w-[1500px] mx-auto min-h-screen">
        {/* Left Side: Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-[2.5rem] p-10 relative overflow-hidden flex flex-col justify-center"
            style={{ minHeight: "500px" }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="mb-10 text-center relative z-10">
              <img src="/logo.png" alt="Foodie Baker" className="h-20 mx-auto mb-6 object-contain drop-shadow-md lg:hidden" />
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                 <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
              </div>
              <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-2">Recuperar Acceso</h2>
              <p className="text-gray-500 font-medium text-sm">Te enviaremos un correo con las instrucciones.</p>
            </div>

            <Formik
              initialValues={{ email: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit: formikSubmit,
              }) => (
                <form className="relative z-10 flex flex-col gap-6">
                  <div className="w-full">
                    <FormControl
                      label="Correo Electrónico Registrado"
                      name="email"
                      value={values.email}
                      handleChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.email && !!errors.email}
                      errorsMsg={errors.email}
                      maxLength={50}
                      directionColumn={true}
                    />
                  </div>

                  <div className="flex flex-col gap-4 mt-4">
                    <button
                      type="button"
                      onClick={formikSubmit}
                      className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold tracking-widest uppercase transition-all shadow-xl shadow-indigo-500/30 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] text-sm"
                    >
                      Enviar Instrucciones
                    </button>

                    <div className="flex flex-col items-center gap-3 mt-4 text-sm font-semibold">
                      <Link className="text-gray-500 hover:text-indigo-600 transition-colors" to="/login">
                        <span className="flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> Volver a Iniciar Sesión</span>
                      </Link>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </motion.div>
        </div>

        {/* Right Side: Hero Image Area */}
        <div className="hidden lg:flex w-1/2 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-full h-full bg-gradient-to-br from-indigo-500/10 via-purple-400/20 to-blue-400/20 rounded-[3rem] p-10 flex flex-col justify-center items-center relative overflow-hidden shadow-inner border border-white/40"
          >
             <div className="absolute inset-0 bg-white/20 backdrop-blur-sm z-0"></div>
             <div className="w-full h-full absolute inset-0 mix-blend-overlay opacity-30 bg-[url('https://images.unsplash.com/photo-1509315811345-672d83ef2fbc?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
             
             <div className="relative z-10 flex border flex-col items-center p-16 bg-white/40 backdrop-blur-md rounded-[3rem] shadow-2xl border-white/60">
                 <img src="/logo.png" alt="Foodie Baker Logo" className="drop-shadow-xl h-32 md:h-48 object-contain mb-8 hover:scale-105 transition-transform duration-500" />
                 <h2 className="text-3xl font-black text-gray-800 tracking-tight text-center">Tranquilidad para ti</h2>
                 <p className="text-gray-600 font-medium text-lg mt-4 text-center max-w-sm">Recupera el acceso rápido a tus cotizaciones y la tienda principal.</p>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Recover;
