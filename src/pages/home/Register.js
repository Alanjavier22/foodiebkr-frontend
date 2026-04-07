import { useState } from "react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FormControl } from "../../components/FormContent";
import { postMethod } from "../../fetch/postMethod";
import handleCustomChange from "../../utils/handleCustomChange";
import validationRegister from "../../utils/validations/registro";
import { motion } from "framer-motion";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const validationSchema = validationRegister;

  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    postMethod({
      path: "/usuario/register",
      data: { formData, title: "REGISTRO" },
      showBtn: true,
      reload: () => {
        navigate(`/login`);
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f9fbfc] flex relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-pink-100/60 to-indigo-100/60 rounded-full blur-[100px] -z-10 mix-blend-multiply opacity-60"></div>
      
      <div className="flex w-full max-w-[1500px] mx-auto min-h-screen">
        
        {/* Left Side: Hero Image Area */}
        <div className="hidden lg:flex w-1/2 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-full h-full bg-gradient-to-tr from-pink-400/20 via-indigo-400/20 to-blue-500/10 rounded-[3rem] p-10 flex flex-col justify-center items-center relative overflow-hidden shadow-inner border border-white/40"
          >
             <div className="absolute inset-0 bg-white/20 backdrop-blur-sm z-0"></div>
             {/* Replace with lifestyle image */}
             <div className="w-full h-full absolute inset-0 mix-blend-overlay opacity-30 bg-[url('https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
             
             <div className="relative z-10 flex border flex-col items-center p-16 bg-white/40 backdrop-blur-md rounded-[3rem] shadow-2xl border-white/60">
                 <img src="/logo.png" alt="Foodie Baker Logo" className="drop-shadow-xl h-32 md:h-48 object-contain mb-8 hover:scale-105 transition-transform duration-500" />
                 <h2 className="text-3xl font-black text-gray-800 tracking-tight text-center">Únete a nuestra familia</h2>
                 <p className="text-gray-600 font-medium text-lg mt-4 text-center max-w-sm">Crea tu cuenta para acceder a cotizaciones rápidas, historial de compras y envíos directos.</p>
             </div>
          </motion.div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 z-10">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-lg bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-[2.5rem] p-8 sm:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-pink-50 rounded-full blur-2xl -translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="mb-8 text-center relative z-10">
              <img src="/logo.png" alt="Foodie Baker" className="h-16 mx-auto mb-4 object-contain drop-shadow-md lg:hidden" />
              <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight mb-2">Crear Cuenta</h2>
              <p className="text-gray-500 font-medium text-sm">Completa tus datos para registrarte</p>
            </div>

            <Formik
              initialValues={{
                nombre: "",
                apellido: "",
                cedula: "",
                email: "",
                pass: "",
              }}
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
                <form className="relative z-10 flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                    <div className="w-full">
                      <FormControl
                        label="Nombres"
                        name="nombre"
                        value={values.nombre}
                        handleChange={(event) => handleCustomChange(event, validationSchema, handleChange)}
                        onBlur={handleBlur}
                        isInvalid={touched.nombre && !!errors.nombre}
                        errorsMsg={errors.nombre}
                        directionColumn={true}
                      />
                    </div>
                    <div className="w-full">
                      <FormControl
                        label="Apellidos"
                        name="apellido"
                        value={values.apellido}
                        handleChange={(event) => handleCustomChange(event, validationSchema, handleChange)}
                        onBlur={handleBlur}
                        isInvalid={touched.apellido && !!errors.apellido}
                        errorsMsg={errors.apellido}
                        directionColumn={true}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                    <div className="w-full">
                      <FormControl
                        label="Cédula"
                        name="cedula"
                        value={values.cedula}
                        handleChange={(event) => handleCustomChange(event, validationSchema, handleChange)}
                        onBlur={handleBlur}
                        isInvalid={touched.cedula && !!errors.cedula}
                        errorsMsg={errors.cedula}
                        maxLength={10}
                        directionColumn={true}
                      />
                    </div>
                    <div className="w-full">
                      <FormControl
                        label="Correo Electrónico"
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
                      className="absolute right-4 top-[42px] text-gray-400 hover:text-pink-500 transition-colors p-1"
                      onClick={() => setShowPass((prev) => !prev)}
                    >
                      {showPass ? <IoEye size={22} /> : <IoEyeOff size={22} />}
                    </button>
                  </div>

                  <div className="flex flex-col gap-4 mt-2">
                    <button
                      type="button"
                      onClick={formikSubmit}
                      className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold tracking-widest uppercase transition-all shadow-xl hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] text-sm"
                    >
                      Registrarse
                    </button>

                    <div className="flex flex-col items-center gap-3 mt-4 text-sm font-semibold">
                      <Link className="text-gray-500 hover:text-pink-600 transition-colors" to="/login">
                        ¿Ya tienes cuenta? <span className="text-pink-600 underline">Inicia sesión</span>
                      </Link>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
