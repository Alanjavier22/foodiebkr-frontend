import { useState } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FormControl } from "../../components/FormContent";
import { postMethod } from "../../fetch/postMethod";
import validationUser from "../../utils/validations/usuario";
import { motion } from "framer-motion";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const validationSchema = validationUser;

  const handleSubmit = (formData) => {
    postMethod({
      path: "/usuario/login",
      data: { formData, title: "INICIO DE SESION" },
      showBtn: false,
      callbck: (tkn) => {
        localStorage.setItem("token", tkn);
        window.location.href = "/";
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f9fbfc] flex relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-100/60 to-pink-100/60 rounded-full blur-[100px] -z-10 mix-blend-multiply opacity-60"></div>
      
      <div className="flex w-full max-w-[1500px] mx-auto min-h-screen">
        {/* Left Side: Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-[2.5rem] p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="mb-10 text-center relative z-10">
              <img src="/logo.png" alt="Foodie Baker" className="h-20 mx-auto mb-6 object-contain drop-shadow-md lg:hidden" />
              <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-2">¡Bienvenido!</h2>
              <p className="text-gray-500 font-medium text-sm">Ingresa a tu cuenta para continuar</p>
            </div>

            <Formik
              initialValues={{ username: "", pass: "" }}
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
                      label="Correo Electrónico"
                      name="username"
                      value={values.username}
                      handleChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.username && !!errors.username}
                      errorsMsg={errors.username}
                      maxLength={50}
                      directionColumn={true}
                    />
                  </div>

                  <div className="w-full relative">
                    <FormControl
                      label="Contraseña"
                      name="pass"
                      value={values.pass}
                      handleChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.pass && !!errors.pass}
                      errorsMsg={errors.pass}
                      type={showPass ? "text" : "password"}
                      directionColumn={true}
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-[42px] text-gray-400 hover:text-blue-500 transition-colors p-1"
                      onClick={() => setShowPass((prev) => !prev)}
                    >
                      {showPass ? <IoEye size={22} /> : <IoEyeOff size={22} />}
                    </button>
                  </div>

                  <div className="flex flex-col gap-4 mt-4">
                    <button
                      type="button"
                      onClick={formikSubmit}
                      className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold tracking-widest uppercase transition-all shadow-xl hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] text-sm"
                    >
                      Iniciar Sesión
                    </button>

                    <div className="flex flex-col items-center gap-3 mt-4 text-sm font-semibold">
                      <Link className="text-gray-500 hover:text-blue-600 transition-colors" to="/Register">
                        ¿No tienes cuenta? <span className="text-blue-600 underline">Regístrate</span>
                      </Link>
                      <Link className="text-gray-400 hover:text-gray-800 transition-colors text-xs" to="/Recovery">
                        Olvidé mi contraseña
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
            className="w-full h-full bg-gradient-to-br from-blue-500/10 via-indigo-400/20 to-pink-400/20 rounded-[3rem] p-10 flex flex-col justify-center items-center relative overflow-hidden shadow-inner border border-white/40"
          >
             <div className="absolute inset-0 bg-white/20 backdrop-blur-sm z-0"></div>
             {/* Replace this div with an actual lifestyle/bakery image if available */}
             <div className="w-full h-full absolute inset-0 mix-blend-overlay opacity-30 bg-[url('https://images.unsplash.com/photo-1549646549-3bc8b8b056af?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
             
             <div className="relative z-10 flex border flex-col items-center p-16 bg-white/40 backdrop-blur-md rounded-[3rem] shadow-2xl border-white/60">
                 <img src="/logo.png" alt="Foodie Baker Logo" className="drop-shadow-xl h-32 md:h-48 object-contain mb-8 hover:scale-105 transition-transform duration-500" />
                 <h2 className="text-3xl font-black text-gray-800 tracking-tight text-center">Inspiración en  cada hornada</h2>
                 <p className="text-gray-600 font-medium text-lg mt-4 text-center max-w-sm">Descubre el balance perfecto entre sabor tradicional y estética moderna.</p>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
