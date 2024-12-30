import { useState } from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import { Row, Col, Card, Button } from "react-bootstrap";
import { IoEye, IoEyeOff } from "react-icons/io5";

import { FormControl } from "../../components/FormContent";
import { postMethod } from "../../fetch/postMethod";
import validationUser from "../../utils/validations/usuario";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const validationSchema = validationUser;

  const handleSubmit = (formData) => {
    postMethod({
      path: "/usuario/login",
      data: { formData, title: "INIICIO DE SESION" },
      showBtn: false,
      callbck: (tkn) => {
        localStorage.setItem("token", tkn);
        window.location.href = "/";
      },
    });
  };
  return (
    <>
      <div
        className="py-4 d-flex justify-content-center bg-[#f4fffe9e]"
        style={{ minHeight: "70vh" }}
      >
        <Card className="mx-5 my-5" style={{ width: "700px", margin: "auto" }}>
          <div className="border-0 my-4 px-0 py-4" style={{ maxWidth: "85vw" }}>
            <h3 className="pt-3 text-center text-2xl font-semibold text-gray-600 uppercase tracking-wider">
              Iniciar Sesión
            </h3>
            <Row className="mx-3">
              <Col md={6}>
                <Formik
                  initialValues={{ username: "", pass: "" }}
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
                        <Col md={12}>
                          <FormControl
                            label="Correo"
                            name="username"
                            value={values.username}
                            handleChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.username && !!errors.username}
                            errorsMsg={errors.username}
                            maxLength={50}
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
                              Iniciar Sesión
                            </Button>

                            <Link
                              className="mx-1 mt-2 text-gray-600"
                              to="/Register"
                            >
                              No tienes cuenta?. Registrate
                            </Link>
                            <Link
                              className="mx-1 mt-2 text-gray-600"
                              to="/Recovery"
                            >
                              Recuperar contraseña
                            </Link>
                          </div>
                        </Col>
                      </Row>
                    </form>
                  )}
                </Formik>
              </Col>
              <Col md={6}>
                <div className="flex justify-center items-center h-full">
                  <img src="/logo.png" alt="logo" className="mt-3 max-h-44" />
                </div>
              </Col>
            </Row>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Login;
