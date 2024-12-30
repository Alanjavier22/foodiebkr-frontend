import { useState, useEffect } from "react";

import { Formik } from "formik";

import { Row, Col, Card } from "react-bootstrap";

import {
  FormSubheader,
  FormHeader,
  FormControl,
} from "../../../components/FormContent";
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
  }, []);

  return (
    <>
      <Card
        className="px-4 mx-4 py-3 pb-5 mb-4 text-center marco justify-center"
        style={{ minHeight: "55vh" }}
      >
        <FormHeader title="Datos del Cliente" />
        <FormSubheader text="*Ingrese sus datos para poder realizar la compra" />

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
            <form>
              <Row className="flex w-full justify-between items-center">
                <Col md={12} xl={12}>
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
                </Col>
                <Col md={12} xl={12}>
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
                    disabled={user.login}
                    comprobation={emptyFields}
                    maxLength={50}
                  />
                </Col>
                <Col md={12} xl={12}>
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
                </Col>
              </Row>

              <Row className="flex w-full justify-between items-center">
                <Col md={12} xl={12}>
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
                    comprobation={emptyFields}
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
                    directionColumn={true}
                    comprobation={emptyFields}
                  />
                </Col>
              </Row>
            </form>
          )}
        </Formik>
      </Card>
    </>
  );
};

export default DatosCliente;
