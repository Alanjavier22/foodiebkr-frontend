import { useState, useEffect } from "react";
import { Formik } from "formik";
import { Row, Col } from "react-bootstrap";
import { FormControl } from "../../../components/FormContent";
import { getMethod } from "../../../fetch/getMethod";
import validationClient from "../../../utils/validations/cliente";
import handleCustomChange from "../../../utils/handleCustomChange";

const DatosCliente = ({ UpdateForm, formikRef, user }) => {
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

  const emptyFields = () => UpdateForm(null);

  const onSubmitForm = (values) => UpdateForm(values);

  useEffect(() => {
    if (user.login) {
      getMethod({
        path: `/cliente/consultar-cedula/${user.cedula}`,
        setData: (datos) => {
          delete datos[0].codigo_descuento;
          delete datos[0].usuario_ingreso;
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
  }, [user.cedula, user.login]);

  return (
    <div className="w-full bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] p-8 lg:p-10 shadow-2xl relative overflow-hidden">
      {/* Subtle background element */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 z-0"></div>

      <div className="relative z-10 text-left mb-8 border-b border-gray-100/80 pb-5 flex items-center gap-5">
         <div className="w-14 h-14 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30 shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
         </div>
         <div>
           <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">Datos para la Facturación</h2>
           <p className="text-sm font-medium text-gray-500 mt-1">* Completar todos los campos es requerido para el envío</p>
         </div>
      </div>

      <Formik
        enableReinitialize
        initialValues={data}
        validationSchema={validationSchema}
        onSubmit={onSubmitForm}
        innerRef={formikRef}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form className="relative z-10 flex flex-col gap-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="w-full">
                <FormControl
                  label="Nombres"
                  name="nombre"
                  value={values.nombre}
                  handleChange={(event) =>
                    handleCustomChange(event, validationSchema, handleChange)
                  }
                  onBlur={handleBlur}
                  isInvalid={touched.nombre && !!errors.nombre}
                  errorsMsg={errors.nombre}
                  directionColumn={true}
                  comprobation={emptyFields}
                />
              </div>
              <div className="w-full">
                <FormControl
                  label="Apellidos"
                  name="apellido"
                  value={values.apellido}
                  handleChange={(event) =>
                    handleCustomChange(event, validationSchema, handleChange)
                  }
                  onBlur={handleBlur}
                  isInvalid={touched.apellido && !!errors.apellido}
                  errorsMsg={errors.apellido}
                  directionColumn={true}
                  comprobation={emptyFields}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="w-full">
                <FormControl
                  label="Correo Electrónico"
                  name="email"
                  value={values.email}
                  handleChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.email && !!errors.email}
                  errorsMsg={errors.email}
                  directionColumn={true}
                  disabled={user.login}
                  comprobation={emptyFields}
                  maxLength={50}
                />
              </div>
              <div className="w-full">
                <FormControl
                  label="Cédula"
                  name="cedula"
                  value={values.cedula}
                  handleChange={(event) =>
                    handleCustomChange(event, validationSchema, handleChange)
                  }
                  onBlur={handleBlur}
                  isInvalid={touched.cedula && !!errors.cedula}
                  errorsMsg={errors.cedula}
                  disabled={user.login}
                  maxLength={10}
                  directionColumn={true}
                  comprobation={emptyFields}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="w-full">
                <FormControl
                  label="Número de Teléfono"
                  name="telefono"
                  value={values.telefono}
                  handleChange={(event) =>
                    handleCustomChange(event, validationSchema, handleChange)
                  }
                  onBlur={handleBlur}
                  isInvalid={touched.telefono && !!errors.telefono}
                  errorsMsg={errors.telefono}
                  maxLength={10}
                  directionColumn={true}
                  comprobation={emptyFields}
                />
              </div>
            </div>

            <div className="w-full">
              <FormControl
                label="Dirección de Envío Completa"
                name="direccion"
                value={values.direccion}
                handleChange={(event) =>
                  handleCustomChange(event, validationSchema, handleChange)
                }
                onBlur={handleBlur}
                isInvalid={touched.direccion && !!errors.direccion}
                errorsMsg={errors.direccion}
                rows={3}
                maxLength={150}
                directionColumn={true}
                comprobation={emptyFields}
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default DatosCliente;
