import { useEffect, useState } from "react";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";
import { Formik } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";

import { Row, Col, Card, Button } from "react-bootstrap";
import { IoEye, IoEyeOff } from "react-icons/io5";

import { postMethod } from "../../../fetch/postMethod";
import { FormControl } from "../../../components/FormContent";

const validationSchema = Yup.object({
  newPass: Yup.string()
    .min(5, "La contraseña debe tener al menos 5 caracteres")
    .matches(/\d/, "La contraseña debe tener al menos un número")
    .required("La nueva contraseña es requerida"),
  samePass: Yup.string()
    .min(5, "La contraseña debe tener al menos 5 caracteres")
    .matches(/\d/, "La contraseña debe tener al menos un número")
    .required("La nueva contraseña es requerida"),
});

const NewPass = () => {
  const routeParams = useParams();
  const navigate = useNavigate();

  const { id_usuario, token } = routeParams;
  const user = jwt_decode(token);

  const [show, setShow] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showPassNew, setShowPassNew] = useState(false);

  const handleSubmit = (formData) => {
    if (formData.newPass === formData.samePass) {
      postMethod({
        path: "/usuario/changed-pass",
        data: { formData, title: "Cambiar Contraseña" },
        showBtn: true,
        reload: () => {
          window.location.href = "/login";
          window.history.replaceState(null, null, "/home");
        },
      });
    } else {
      swal({
        text: "La contraseña no coinciden",
        icon: "warning",
        timer: 1600,
        buttons: false,
        className: "left-modal",
      });
    }
  };

  useEffect(() => {
    if (Number(user.id_usuario) === Number(id_usuario)) {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (user.exp > currentTimestamp) {
        setShow(true);
      } else {
        navigate("/home");
      }
    } else {
      navigate("/home");
    }

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {show && (
        <div
          className="py-4 d-flex justify-content-center bg-[#f4fffe9e]"
          style={{ minHeight: "70vh" }}
        >
          <Card
            className="mx-5 my-5"
            style={{ width: "700px", margin: "auto" }}
          >
            <div
              className="border-0 my-4 px-0 py-4"
              style={{ maxWidth: "85vw" }}
            >
              <h3 className="pt-3 text-center text-2xl font-semibold text-gray-600 uppercase tracking-wider">
                Cambiar contraseña
              </h3>
              <Row className="mx-3">
                <Col md={6}>
                  <Formik
                    initialValues={{
                      newPass: "",
                      samePass: "",
                      id_usuario,
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
                          <Col md={12}>
                            <div className="flex items-end w-full">
                              <FormControl
                                label="Contraseña nueva"
                                name="newPass"
                                value={values.newPass}
                                handleChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.newPass && !!errors.newPass}
                                errorsMsg={errors.newPass}
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

                            <div className="flex items-end w-full">
                              <FormControl
                                label="Repetir Contraseña"
                                name="samePass"
                                value={values.samePass}
                                handleChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={
                                  touched.samePass && !!errors.samePass
                                }
                                errorsMsg={errors.samePass}
                                type={showPassNew ? "text" : "password"}
                              />
                              <Button
                                className="btnStore bg-slate-400 px-3 py-2 border-0 h-10 ml-5 -mr-4"
                                style={{
                                  marginBottom:
                                    touched.pass && !!errors.pass
                                      ? "33px"
                                      : "8px",
                                }}
                                onClick={() => setShowPassNew((prev) => !prev)}
                              >
                                {showPassNew ? <IoEye /> : <IoEyeOff />}
                              </Button>
                            </div>

                            <div className="flex flex-col justify-center items-center ml-4 pt-3 w-full">
                              <Button
                                onClick={handleSubmit}
                                className="btnStore border-0 rounded-0 w-full"
                              >
                                Cambiar contraseña
                              </Button>
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
      )}
    </>
  );
};

export default NewPass;
