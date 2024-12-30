import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

import { Row, Col, Card, Button } from "react-bootstrap";

import { FormControl } from "../../components/FormContent";
import { postMethod } from "../../fetch/postMethod";

// Esquema de validación
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Correo electrónico no valido")
    .required("El correo electrónico es requerido"),
});

const Recover = () => {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    postMethod({
      path: "/usuario/account-recovery",
      data: { formData, title: "RECUPERACIÓN" },
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
        <Card className="mx-5 my-5" style={{ width: "700px", margin: "auto" }}>
          <div className="border-0 my-4 px-0 py-4" style={{ maxWidth: "85vw" }}>
            <h3 className="pt-3 text-center text-2xl font-semibold text-gray-600 uppercase tracking-wider">
              Recuperar contraseña
            </h3>
            <Row className="mx-3">
              <Col md={6}>
                <Formik
                  initialValues={{ email: "" }}
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
                            name="email"
                            value={values.email}
                            handleChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.email && !!errors.email}
                            errorsMsg={errors.email}
                            maxLength={50}
                          />

                          <div className="flex flex-col justify-center items-center ml-4 pt-3 w-full">
                            <Button
                              onClick={handleSubmit}
                              className="btnStore border-0 rounded-0 w-full"
                            >
                              Recuperar contraseña
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

export default Recover;
