import { useState } from "react";

import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";

import { Row, Col, Card, Button } from "react-bootstrap";
import { IoEye, IoEyeOff } from "react-icons/io5";

import { FormControl } from "../../components/FormContent";
import { postMethod } from "../../fetch/postMethod";
import handleCustomChange from "../../utils/handleCustomChange";
import validationRegister from "../../utils/validations/registro";

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
    <>
      <div
        className="py-4 d-flex justify-content-center bg-[#f4fffe9e]"
        style={{ minHeight: "70vh" }}
      >
        <Card className="mx-5 my-5" style={{ width: "600px", margin: "auto" }}>
          <div className="border-0 my-4 px-0 py-4" style={{ maxWidth: "85vw" }}>
            <h3 className="pt-3 text-center text-2xl font-semibold text-gray-600 uppercase tracking-wider">
              Registro
            </h3>
            <Row className="mx-3">
              <Col md={12}>
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
                    handleSubmit,
                  }) => (
                    <form>
                      <Row className="flex w-full justify-between items-center">
                        <Col>
                          <FormControl
                            label="Nombre"
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
                            // directionColumn={true}
                          />

                          <FormControl
                            label="Apellido"
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
                            // directionColumn={true}
                          />

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
                            // directionColumn={true}
                          />

                          <FormControl
                            label="Correo"
                            name="email"
                            value={values.email}
                            handleChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.email && !!errors.email}
                            errorsMsg={errors.email}
                            maxLength={50}
                            // directionColumn={true}
                          />

                          <div className="flex items-end w-full">
                            <FormControl
                              label="Contraseña"
                              name="pass"
                              value={values.pass}
                              handleChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.pass && !!errors.pass}
                              errorsMsg={errors.pass}
                              type={showPass ? "text" : "password"}
                            />
                            <Button
                              className="btnStore bg-slate-400 px-3 py-2 border-0 h-10 ml-5 -mr-4"
                              style={{
                                marginBottom:
                                  touched.pass && !!errors.pass
                                    ? "33px"
                                    : "8px",
                              }}
                              onClick={() => setShowPass((prev) => !prev)}
                            >
                              {showPass ? <IoEye /> : <IoEyeOff />}
                            </Button>
                          </div>

                          <div className="flex flex-col justify-center items-center ml-4 pt-3 w-full">
                            <Button
                              onClick={handleSubmit}
                              className="btnStore border-0 rounded-0 w-full"
                            >
                              Registrarse
                            </Button>

                            <Link
                              className="mx-1 mt-2 text-gray-600"
                              to="/login"
                            >
                              Ya tienes cuenta, inicia sesión
                            </Link>
                          </div>
                        </Col>
                      </Row>
                    </form>
                  )}
                </Formik>
              </Col>
              {/* <Col md={6}>
                <div className="flex justify-center items-center h-full">
                  <img src="/logo.png" alt="logo" className="mt-3 max-h-44" />
                </div>
              </Col> */}
            </Row>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Register;
