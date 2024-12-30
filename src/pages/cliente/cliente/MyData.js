import { useContext, useEffect, useState } from "react";
import { Formik } from "formik";
import { Row, Col, Button } from "react-bootstrap";

import { LoadContext } from "../../../context/LoadContext";
import PlaceholderCustom from "../../../components/Placeholder";
import { FormControl, FormHeader } from "../../../components/FormContent";
import { getMethod } from "../../../fetch/getMethod";
import { postMethod } from "../../../fetch/postMethod";
import validationClient from "../../../utils/validations/cliente";
import handleCustomChange from "../../../utils/handleCustomChange";

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
  }, []);

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
    <div
      className="border-2 rounded-md m-auto my-5 px-4 py-3"
      style={{ maxWidth: "75vw", minHeight: "70vh" }}
    >
      {!data && <PlaceholderCustom />}

      {/* Datos de la persona */}
      {data && (
        <>
          <FormHeader title="Mis Datos" className="text-sm text-center pt-5" />

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
              <form>
                <Row className="flex w-full justify-between items-center">
                  <Col md={12} xl={6}>
                    <FormControl
                      label="Nombres"
                      name="nombre"
                      value={values.nombre}
                      handleChange={(event) =>
                        handleCustomChange(
                          event,
                          validationSchema,
                          handleChange
                        )
                      }
                      onBlur={handleBlur}
                      isInvalid={touched.nombre && !!errors.nombre}
                      errorsMsg={errors.nombre}
                      directionColumn={true}
                    />
                  </Col>
                  <Col md={12} xl={6}>
                    <FormControl
                      label="Apellidos"
                      name="apellido"
                      value={values.apellido}
                      handleChange={(event) =>
                        handleCustomChange(
                          event,
                          validationSchema,
                          handleChange
                        )
                      }
                      onBlur={handleBlur}
                      isInvalid={touched.apellido && !!errors.apellido}
                      errorsMsg={errors.apellido}
                      directionColumn={true}
                    />
                  </Col>
                </Row>

                <Row className="flex w-full justify-between items-center">
                  <Col md={12} xl={6}>
                    <FormControl
                      label="Correo"
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
                  </Col>
                  <Col md={12} xl={6}>
                    <FormControl
                      label="Cédula"
                      name="cedula"
                      value={values.cedula}
                      handleChange={(event) =>
                        handleCustomChange(
                          event,
                          validationSchema,
                          handleChange
                        )
                      }
                      onBlur={handleBlur}
                      isInvalid={touched.cedula && !!errors.cedula}
                      errorsMsg={errors.cedula}
                      maxLength={10}
                      disabled={true}
                      directionColumn={true}
                    />
                  </Col>
                </Row>

                <Row className="flex w-full justify-between items-center">
                  <Col md={12} xl={6}>
                    <FormControl
                      label="Teléfono"
                      name="telefono"
                      value={values.telefono}
                      handleChange={(event) =>
                        handleCustomChange(
                          event,
                          validationSchema,
                          handleChange
                        )
                      }
                      onBlur={handleBlur}
                      isInvalid={touched.telefono && !!errors.telefono}
                      errorsMsg={errors.telefono}
                      maxLength={10}
                      directionColumn={true}
                    />
                  </Col>
                </Row>

                <Row className="flex w-full justify-between items-center">
                  <Col md={12} xl={12}>
                    <FormControl
                      label="Dirección"
                      name="direccion"
                      value={values.direccion}
                      handleChange={(event) =>
                        handleCustomChange(
                          event,
                          validationSchema,
                          handleChange
                        )
                      }
                      onBlur={handleBlur}
                      isInvalid={touched.direccion && !!errors.direccion}
                      errorsMsg={errors.direccion}
                      rows={2}
                      maxLength={150}
                      fullCol={true}
                      directionColumn={true}
                    />
                  </Col>
                </Row>

                <div className="flex flex-col justify-end items-end mr-0 pt-3 w-full px-4">
                  <Button
                    className="btnStore bg-slate-400 px-4 py-2 border-0 rounded-3 tracking-wider"
                    onClick={handleSubmit}
                  >
                    Actualizar datos
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </>
      )}
    </div>
  );
};

export default MyData;
