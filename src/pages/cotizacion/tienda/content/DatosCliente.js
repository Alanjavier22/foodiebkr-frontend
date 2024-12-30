import { useState, useEffect } from "react";

import { Formik } from "formik";

import { Row, Col, Button } from "react-bootstrap";

import {
  FormSubheader,
  FormHeader,
  FormControl,
} from "../../../../components/FormContent";
import { getMethod } from "../../../../fetch/getMethod";
import handleCustomChange from "../../../../utils/handleCustomChange";
import validationClient from "../../../../utils/validations/cliente";

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
  }, []);

  return (
    <>
      <div
        className="border-0 m-auto px-4"
        style={{ maxWidth: "75vw", minHeight: "55vh" }}
      >
        <FormHeader title="Datos del Cliente" />
        <FormSubheader text="*Ingrese sus datos para poder realizar la cotización" />

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
            <form>
              <Row className="flex w-full justify-between items-center">
                <Col md={12} xl={6}>
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
                  />
                </Col>
                <Col md={12} xl={6}>
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
                      handleCustomChange(event, validationSchema, handleChange)
                    }
                    onBlur={handleBlur}
                    isInvalid={touched.cedula && !!errors.cedula}
                    errorsMsg={errors.cedula}
                    disabled={user.login}
                    maxLength={10}
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
                      handleCustomChange(event, validationSchema, handleChange)
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
                      handleCustomChange(event, validationSchema, handleChange)
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

              <Row className="flex w-full justify-between items-center">
                <Col md={12} xl={12}>
                  <div className="flex w-full pt-3 justify-end items-center">
                    <Button
                      className="btnStore bg-slate-400 px-4 py-2 border-0 rounded-3 tracking-wider"
                      onClick={handleSubmit}
                    >
                      Ir a Cotización
                    </Button>
                  </div>
                </Col>
              </Row>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default DatosCliente;
