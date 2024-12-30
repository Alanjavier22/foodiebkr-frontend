import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Formik } from "formik";
import * as Yup from "yup";

import { Row, Col, Button } from "react-bootstrap";
import { FormControl } from "../../../components/FormContent";
import { postMethod } from "../../../fetch/postMethod";
import { LoadContext } from "../../../context/LoadContext";

// Esquema de validación
const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es requerido"),
  telefono: Yup.string()
    .min(10, "El número de teléfono debe tener minimo 10 caracteres")
    .required("El número de teléfono es requerido"),
  email: Yup.string()
    .email("Correo electrónico no valido")
    .required("El correo electrónico es requerido"),
  asunto: Yup.string().required("El asunto es requerido"),
  mensaje: Yup.string().required("El mensaje es requerido"),
});

const Formulario = () => {
  const { setLoadSpinner } = useContext(LoadContext);
  const navigate = useNavigate();

  const sendData = (values) => {
    setLoadSpinner(true);

    postMethod({
      path: "/email/send/notification",
      data: {
        formData: values,
        title: "Datos enviados",
      },
      showBtn: true,
      reload: () => navigate(`/`),
      setIsLoading: setLoadSpinner,
    });
  };

  return (
    <div className="border-0 m-auto p-4 px-5" style={{ maxWidth: "90vw" }}>
      <Formik
        initialValues={{
          nombre: "",
          email: "",
          telefono: "",
          asunto: "",
          mensaje: "",
        }}
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
              <Col md={12} xl={12}>
                <FormControl
                  label="Nombres"
                  name="nombre"
                  value={values.nombre}
                  handleChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.nombre && !!errors.nombre}
                  errorsMsg={errors.nombre}
                  directionColumn={true}
                />
              </Col>
            </Row>

            <Row className="flex w-full justify-between items-center">
              <Col md={12} xl={12}>
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
            </Row>

            <Row className="flex w-full justify-between items-center">
              <Col md={12} xl={12}>
                <FormControl
                  label="Teléfono"
                  name="telefono"
                  value={values.telefono}
                  handleChange={handleChange}
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
                  label="Asunto"
                  name="asunto"
                  value={values.asunto}
                  handleChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.asunto && !!errors.asunto}
                  errorsMsg={errors.asunto}
                  maxLength={150}
                  directionColumn={true}
                />
              </Col>
            </Row>

            <Row className="flex w-full justify-between items-center">
              <Col md={12} xl={12}>
                <FormControl
                  label="Mensaje"
                  name="mensaje"
                  value={values.mensaje}
                  handleChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.mensaje && !!errors.mensaje}
                  errorsMsg={errors.mensaje}
                  rows={2}
                  maxLength={250}
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
                    Solicitar que me contacten
                  </Button>
                </div>
              </Col>
            </Row>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Formulario;
