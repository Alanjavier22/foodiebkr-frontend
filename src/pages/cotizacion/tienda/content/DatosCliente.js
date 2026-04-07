import { useState, useEffect } from "react";
import { Formik } from "formik";
import { FormControl } from "../../../../components/FormContent";
import { getMethod } from "../../../../fetch/getMethod";
import handleCustomChange from "../../../../utils/handleCustomChange";
import validationClient from "../../../../utils/validations/cliente";
import { motion } from "framer-motion";

const DatosCliente = ({ UpdateForm, goToNextTab, user }) => {
  const validationSchema = validationClient;

  const [data, setData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    cedula: "",
    direccion: "",
    estado_cliente: false,
  });

  const isFormValid = (formData) => {
    return Object.values(formData).every((value) => value !== "");
  };

  const onSubmitForm = (values) => {
    const isFormValide = isFormValid(values);

    UpdateForm({
      emptyValues: !isFormValide,
      nameData: "cliente",
      formData: isFormValide ? values : null,
    });

    if (isFormValide) goToNextTab();
  };

  useEffect(() => {
    if (user.login) {
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
    }
  }, [user.login, user.cedula]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full flex-col max-w-4xl mx-auto flex"
    >
      <div className="mb-8 text-center sm:text-left border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Datos del Solicitante</h2>
        <p className="text-gray-500 font-medium text-sm mt-1">
          Llene la información requerida abajo para establecer a quién va dirigida la proforma.
        </p>
      </div>

      <Formik
        enableReinitialize
        initialValues={data}
        validationSchema={validationSchema}
        onSubmit={onSubmitForm}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
               <FormControl
                 label="Nombres Completos"
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
                 label="Correo para contacto"
                 name="email"
                 value={values.email}
                 handleChange={handleChange}
                 onBlur={handleBlur}
                 isInvalid={touched.email && !!errors.email}
                 errorsMsg={errors.email}
                 directionColumn={true}
                 maxLength={50}
               />
               <FormControl
                 label="RUC o Cédula"
                 name="cedula"
                 value={values.cedula}
                 handleChange={(event) => handleCustomChange(event, validationSchema, handleChange)}
                 onBlur={handleBlur}
                 isInvalid={touched.cedula && !!errors.cedula}
                 errorsMsg={errors.cedula}
                 disabled={user.login}
                 maxLength={10}
                 directionColumn={true}
               />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
               <FormControl
                 label="Teléfono Móvil"
                 name="telefono"
                 value={values.telefono}
                 handleChange={(event) => handleCustomChange(event, validationSchema, handleChange)}
                 onBlur={handleBlur}
                 isInvalid={touched.telefono && !!errors.telefono}
                 errorsMsg={errors.telefono}
                 maxLength={10}
                 directionColumn={true}
               />
               <div className="hidden md:block"></div>
            </div>

            <div className="w-full">
               <FormControl
                 label="Dirección de Envío"
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

            <div className="flex w-full pt-6 border-t border-gray-100 mt-2 justify-end">
               <button
                 type="button"
                 className="px-8 py-3.5 bg-gray-900 hover:bg-black text-white rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-xl hover:-translate-y-1 active:translate-y-0"
                 onClick={handleSubmit}
               >
                 Aceptar Datos y Continuar →
               </button>
            </div>
          </form>
        )}
      </Formik>
    </motion.div>
  );
};

export default DatosCliente;
