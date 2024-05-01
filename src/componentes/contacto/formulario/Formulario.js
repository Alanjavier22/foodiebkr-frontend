import React from "react";
import "../../../App.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Formulario = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="border-0 m-auto p-4 px-5" style={{ maxWidth: "70vw" }}>
      <form onSubmit={handleSubmit} className="formulario">
        <Form.Label htmlFor="Nombre">Nombres y Apellidos</Form.Label>
        <Form.Control type="text" id="Nombre" />
        <Form.Label htmlFor="Email">Email</Form.Label>
        <Form.Control type="email" id="Email" />
        <Form.Label htmlFor="Asunto">Asunto</Form.Label>
        <Form.Control
          as="textarea"
          type="text"
          rows={3}
          style={{ resize: "none" }}
          id="Asunto"
        />
        <Form.Label htmlFor="Mensaje">Mensaje</Form.Label>
        <Form.Control
          as="textarea"
          type="text"
          rows={3}
          style={{ resize: "none" }}
          id="Mensaje"
        />

        <Button
          className="btnStore border-0 rounded-0 mt-4"
          style={{ width: "200px" }}
        >
          Solicitar que me contacten
        </Button>
      </form>
    </div>
  );
};

export default Formulario;
