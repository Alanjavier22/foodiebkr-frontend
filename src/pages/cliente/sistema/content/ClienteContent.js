import { useContext, useRef } from "react";
import { Formik } from "formik";

import { Row, Col, Form, Modal, Button } from "react-bootstrap";

import { postMethod } from "../../../../fetch/postMethod";
import { FormControl } from "../../../../components/FormContent";
import { LoadContext } from "../../../../context/LoadContext";
import validationClient from "../../../../utils/validations/cliente";
import handleCustomChange from "../../../../utils/handleCustomChange";

const ClienteContent = (props) => {
  const { item, show, onHide, reload } = props;

  const validationSchema = validationClient;

  const { setLoadSpinner } = useContext(LoadContext);

  const formikRef = useRef();

  const formData = item?.id
    ? item
    : {
        nombre: "",
        id_rol: 4,
        apellido: "",
        email: "",
        telefono: "",
        cedula: "",
        direccion: "",
        estado: false,
      };

  console.log(formData);

  const sendData = (values) => {
    setLoadSpinner(true);

    postMethod({
      path: "/cliente/upsert",
      data: {
        formData: values,
        title: item?.id ? "ACTUALIZACIÓN" : "REGISTRO",
      },
      showBtn: true,
      callbck: onHide,
      reload: reload,
      setIsLoading: setLoadSpinner,
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ fontSize: "15px" }}
          className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >
          Datos del Cliente
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className="border-0 m-auto px-4"
          style={{ maxWidth: "75vw", minHeight: "40vh" }}
        >
          {/* Datos de la persona */}
          <>
            {item?.id && (
              <Row className="flex w-full justify-between items-center pb-2">
                <Col xs={4} xl={5}>
                  <div className="px-4 pb-4 pt-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Cliente #{item?.id}
                  </div>
                </Col>

                <Col xs={8} xl={7}>
                  <div className="flex justify-end px-4 pb-4 pt-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Fecha registro: {item?.fecha_ingreso}
                  </div>
                </Col>
              </Row>
            )}

            {!item?.id && (
              <Row className="flex w-full justify-between items-center pb-2">
                <Col xs={4} xl={5}>
                  <div className="px-4 pb-4 pt-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Registro de cliente
                  </div>
                </Col>
              </Row>
            )}

            <Formik
              innerRef={formikRef}
              initialValues={formData}
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
                        disabled={item?.id}
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
                        disabled={item?.id}
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

                  <Row className="flex w-full justify-between items-center">
                    <Col md={12} xl={6}>
                      <div className="flex w-full pl-2 items-center">
                        <Form.Label className="w-2/5 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Rol
                        </Form.Label>
                        <Form.Select
                          name="id_rol"
                          size="sm"
                          defaultValue={formData["id_rol"]}
                          onChange={handleChange}
                          className="w-full h-full ml-4 px-4 py-2 my-0 border-b-2 text-left text-xs font-semibold text-gray-600 tracking-wider"
                        >
                          <option value={2}>Supervisor</option>
                          <option value={3}>Empleado</option>
                          <option value={4}>Cliente</option>
                        </Form.Select>
                      </div>
                    </Col>
                    {item?.id && (
                      <Col md={12} xl={6}>
                        <div className="flex w-full pl-2 items-center">
                          <Form.Label className="w-2/5 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Estado
                          </Form.Label>
                          <Form.Select
                            name="estado"
                            size="sm"
                            // value={formData["estado"]}
                            defaultValue={formData["estado"]}
                            onChange={handleChange}
                            className="w-full h-full ml-4 px-4 py-2 my-0 border-b-2 text-left text-xs font-semibold text-gray-600 tracking-wider"
                          >
                            <option value={true}>Activo</option>
                            <option value={false}>Inactivo</option>
                          </Form.Select>
                        </div>
                      </Col>
                    )}
                  </Row>
                </form>
              )}
            </Formik>
          </>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btnStore bg-slate-400 px-4 py-2 border-0 rounded-3"
          onClick={() => formikRef.current.submitForm()}
        >
          {item?.id ? "Actualizar" : "Agregar"}
        </Button>
        <Button
          className="btnStore bg-slate-400 px-4 py-2 border-0 rounded-3"
          onClick={onHide}
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClienteContent;
