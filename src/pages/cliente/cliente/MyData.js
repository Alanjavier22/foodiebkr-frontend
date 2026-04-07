import { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import { LoadContext } from "../../../context/LoadContext";
import PlaceholderCustom from "../../../components/Placeholder";
import { FormControl } from "../../../components/FormContent";
import { getMethod } from "../../../fetch/getMethod";
import { postMethod } from "../../../fetch/postMethod";
import validationClient from "../../../utils/validations/cliente";
import handleCustomChange from "../../../utils/handleCustomChange";
import { motion } from "framer-motion";

const MyData = ({ user }) => {
  const { setLoadSpinner } = useContext(LoadContext);
  const validationSchema = validationClient;

  const [data, setData] = useState(null);

  useEffect(() => {
    getMethod({
      path: `/cliente/consultar-cedula/${user.cedula}`,
      setData: (datos) => {
        setData({
          ...datos[0],
          apellido: datos[0].apellido || "",
          telefono: datos[0].telefono || "",
          direccion: datos[0].direccion || "",
        });
      },
      setIsLoading: () => {},
      showSwal: false,
    });
  }, [user.cedula]);

  const sendData = (values) => {
    setLoadSpinner(true);

    postMethod({
      path: "/cliente/upsert",
      data: {
        formData: values,
        title: "ACTUALIZACIÓN",
      },
      showBtn: true,
      reload: () => {},
      setIsLoading: setLoadSpinner,
    });
  };

  return (
    <div className="min-h-screen bg-[#f9fbfc] pt-10 pb-20 relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-teal-100/50 to-blue-100/30 rounded-full blur-[100px] -z-10 mix-blend-multiply opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-100/40 rounded-full blur-[100px] -z-10 mix-blend-multiply opacity-50"></div>

      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 relative z-10 w-full flex flex-col items-center">
        {!data && <PlaceholderCustom />}

        {data && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full xl:w-2/3"
          >
            {/* Control Center Header & Avatar */}
            <div className="flex flex-col items-center mb-10">
              <div className="w-28 h-28 bg-gradient-to-tr from-teal-400 to-blue-500 rounded-full p-1 shadow-2xl mb-6 relative">
                 <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white">
                    <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-teal-400 to-blue-500 uppercase">
                       {data.nombre ? data.nombre.charAt(0) : "U"}
                    </span>
                 </div>
                 {/* Online badge */}
                 <div className="absolute bottom-1 right-2 w-5 h-5 bg-green-400 border-4 border-white rounded-full"></div>
              </div>
              <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Centro de <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">Perfil</span></h1>
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">Mantén actualizada tu información de contacto y envío</span>
            </div>

            {/* Profile Form Container */}
            <div className="w-full bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
               <div className="absolute -top-10 -left-10 w-40 h-40 bg-teal-50 rounded-full blur-2xl"></div>
               
               <Formik
                  initialValues={data}
                  validationSchema={validationSchema}
                  onSubmit={sendData}
               >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => (
                    <form className="relative z-10 flex flex-col gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <FormControl
                          label="Correo Electrónico"
                          name="email"
                          value={values.email}
                          handleChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.email && !!errors.email}
                          errorsMsg={errors.email}
                          disabled={true}
                          directionColumn={true}
                          maxLength={50}
                        />
                        <FormControl
                          label="Cédula"
                          name="cedula"
                          value={values.cedula}
                          handleChange={(event) => handleCustomChange(event, validationSchema, handleChange)}
                          onBlur={handleBlur}
                          isInvalid={touched.cedula && !!errors.cedula}
                          errorsMsg={errors.cedula}
                          maxLength={10}
                          disabled={true}
                          directionColumn={true}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <FormControl
                          label="Teléfono de Contacto"
                          name="telefono"
                          value={values.telefono}
                          handleChange={(event) => handleCustomChange(event, validationSchema, handleChange)}
                          onBlur={handleBlur}
                          isInvalid={touched.telefono && !!errors.telefono}
                          errorsMsg={errors.telefono}
                          maxLength={10}
                          directionColumn={true}
                        />
                        <div className="hidden md:block"></div> {/* spacer */}
                      </div>

                      <div className="w-full">
                        <FormControl
                          label="Dirección Fija de Envío"
                          name="direccion"
                          value={values.direccion}
                          handleChange={(event) => handleCustomChange(event, validationSchema, handleChange)}
                          onBlur={handleBlur}
                          isInvalid={touched.direccion && !!errors.direccion}
                          errorsMsg={errors.direccion}
                          rows={2}
                          maxLength={150}
                          fullCol={true}
                          directionColumn={true}
                        />
                      </div>

                      <div className="flex justify-end pt-6 border-t border-gray-100 mt-4">
                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="px-8 py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold tracking-widest uppercase transition-all shadow-xl hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] text-sm"
                        >
                          Guardar Cambios
                        </button>
                      </div>
                    </form>
                  )}
               </Formik>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyData;
