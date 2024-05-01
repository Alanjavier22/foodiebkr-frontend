import { useEffect, useState } from "react";

import swal from "sweetalert";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
const FormularioCotizacion = () => {
  const [formulario, setFormulario] = useState({
    username: "",
    pass: "",
  });

  const [enviar, setEnviar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }));
  };

  const handleSubmit = () => setEnviar(true);

  useEffect(() => {
    const enviarData = () => {
      fetch(`${process.env.REACT_APP_URL_API}/insert/login`, {
        method: "POST",
        body: JSON.stringify(formulario),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then(({ error, datos, mensaje }) => {
          setEnviar(false);
          swal({
            title: "LOGIN",
            text: mensaje || "Login exitoso",
            icon: error ? "error" : "success",
          });
          if (!error) {
            localStorage.setItem("token", datos);
            window.location.href = "/";
          }
        })
        .catch((err) => console.warn(err));
    };

    if (enviar) enviarData();
    // eslint-disable-next-line
  }, [enviar]);

  return (
    <div className="border-0 m-auto p-4" style={{ maxWidth: "70vw" }}>
      <h3 className="text-center mb-4">LOGIN</h3>
      <Row>
        <Col>
          <form className="formulario px-5">
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control type="text" name="username" onChange={handleChange} />

            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control type="password" name="pass" onChange={handleChange} />

            <Button
              className="btnStore border-0 rounded-0 mt-4"
              style={{ width: "200px" }}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </form>
        </Col>
        <Col>
          <img src="/logo.png" alt="logo" className="mt-3" width={"300px"} />
        </Col>
      </Row>
    </div>
  );
};

const Login = () => {
  return (
    <>
      <div
        className="py-4 d-flex justify-content-center"
        style={{ height: "70vh" }}
      >
        <Card className="mx-5">
          <FormularioCotizacion />
        </Card>
      </div>
    </>
  );
};

export default Login;
