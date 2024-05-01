import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Menu from "../menu/Menu";
import Footer from "../footer/Footer";

import "./Cotizacion.css";

const porciones = [
  { pisos: 1, porciones: 10 },
  { pisos: 1, porciones: 20 },
  { pisos: 1, porciones: 30 },
  { pisos: 1, porciones: 40 },
  { pisos: 2, porciones: 35 },
  { pisos: 2, porciones: 50 },
  { pisos: 2, porciones: 70 },
];

const FormularioCotizacion = () => {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    celular: "",
    tipo_de_producto: "",
    tematica: "",
    cantidad: "",
    mensaje: "",
    sabores: "Vainilla",
    pisos: "",
    decoracion: "crema",
    mensaje: "mensaje",
  });

  const [porc, setPorc] = useState({ pisos: 1, porciones: 10 });

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
      fetch(`${process.env.REACT_APP_URL_API}/insert/cotizaciones/`, {
        method: "POST",
        body: JSON.stringify({ ...formulario, ...porc }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => {
          setEnviar(false);
          navigate(`/`);
        })
        .catch((err) => console.warn(err));
    };

    if (enviar) enviarData();
  }, [enviar]);

  return (
    <div className="border-0 m-auto p-2 pt-4" style={{ maxWidth: "70vw" }}>
      <form className="formulario">
        <div className="d-flex justify-content-center align-items-center mb-2 gap-3">
          <Form.Label style={{ width: "40%", textAlign: "left" }}>
            Nombres:
          </Form.Label>
          <Form.Control
            type="text"
            className="mx-2"
            name="nombre"
            onChange={handleChange}
          />
          <Form.Label style={{ width: "40%" }}>Apellidos:</Form.Label>
          <Form.Control type="text" name="apellido" onChange={handleChange} />
        </div>

        <div className="d-flex justify-content-center align-items-center mb-2 gap-3">
          <Form.Label style={{ width: "40%" }}>Correo:</Form.Label>
          <Form.Control
            type="email"
            className="mx-2"
            name="correo"
            onChange={handleChange}
          />
          <Form.Label style={{ width: "40%" }}>Celular:</Form.Label>
          <Form.Control
            type="text"
            name="celular"
            maxLength={10}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex justify-content-start align-items-center mb-2 gap-3">
          <Form.Label style={{ width: "40%" }}>Tipo de Producto:</Form.Label>
          <Form.Control
            type="text"
            name="tipo_de_producto"
            onChange={handleChange}
            className="mx-2"
          />
          {/* <Form.Label style={{ width: "40%" }}>Tipo de Producto:</Form.Label> */}
          <div style={{ width: "150%" }}></div>
        </div>

        <div className="d-flex justify-content-center align-items-center mb-2 gap-3">
          <Form.Label style={{ width: "40%" }}>Temática:</Form.Label>
          <Form.Control
            type="text"
            className="mx-2"
            name="tematica"
            onChange={handleChange}
          />

          <Form.Label style={{ width: "40%" }}>Cantidad:</Form.Label>
          <Form.Control type="number" name="cantidad" onChange={handleChange} />
        </div>

        <div className="d-flex justify-content-center align-items-center mb-2 gap-3">
          <Form.Label style={{ width: "40%" }}>Decoración:</Form.Label>
          <Form.Select
            name="decoracion"
            className="mx-3"
            onChange={handleChange}
          >
            <option value="crema">Con crema</option>
            <option value="foundant">Con foundant</option>
          </Form.Select>

          <Form.Label style={{ width: "40%" }}>Sabor:</Form.Label>
          <Form.Select name="sabores" onChange={handleChange}>
            <option value="Vainilla">Vainilla</option>
            <option value="Chocolate">Chocolate</option>
            <option value="Marmoleada">Marmoleada</option>
            <option value="RedVelvet">RedVelvet</option>
          </Form.Select>
        </div>

        <Form.Label htmlFor="cantidad">
          ¿Cuantos pisos y porciones necesitas?
        </Form.Label>
        <div className="d-flex gap-3">
          <Form.Select
            onChange={(e) =>
              setPorc({
                pisos: Number(e.target.value),
                porciones: Number(e.target.value) === 1 ? 10 : 35,
              })
            }
            // style={{ marginRight: "10px" }}
            className="mx-3"
          >
            <option value="1">1 piso</option>
            <option value="2">2 pisos</option>
          </Form.Select>

          <Form.Select
            onChange={(e) =>
              setPorc({ ...porc, porciones: Number(e.target.value) })
            }
            style={{ marginLeft: "10px" }}
          >
            {porciones.map((item, index) => {
              if (porc.pisos === item.pisos)
                return (
                  <option key={index} value={item.porciones}>
                    {item.porciones} porciones
                  </option>
                );
            })}
          </Form.Select>
        </div>

        <Form.Label htmlFor="mensaje">Mensaje</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          type="text"
          name="mensaje"
          onChange={handleChange}
          style={{ resize: "none" }}
        />

        <Button
          className="btnStore border-0 rounded-0 mt-4"
          style={{ width: "200px" }}
          onClick={handleSubmit}
        >
          Cotizar
        </Button>
      </form>
    </div>
  );
};

const Cotizacion = () => {
  return (
    <>
      <div className="textCotizar py-2">
        <h1 className="text-center text-light">COTIZACIONES</h1>
      </div>

      <div className="py-4">
        <p className="text-center px-3 text-muted">
          Por favor, ingrese sus datos para poder realizar la consulta que desee
        </p>

        <FormularioCotizacion />
      </div>
    </>
  );
};

export default Cotizacion;
