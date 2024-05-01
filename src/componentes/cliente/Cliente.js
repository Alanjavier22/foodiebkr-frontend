import { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./Cliente.css";
import PaginationTabla from "../componentes/PaginationTabla";

const datosReset = {
  nombre: "",
  correo: "",
  cedula: "",
  apellido: "",
  numero_celular: "",
};

function FormData(props) {
  const { item, ...moreProps } = props;

  const [formulario, setFormulario] = useState(datosReset);

  const [enviar, setEnviar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }));
  };

  const handleSubmit = () => setEnviar(true);
  const onHide = () => {
    setFormulario(datosReset);
    moreProps.onHide();
  };

  useEffect(() => {
    const enviarData = () => {
      fetch(`${process.env.REACT_APP_URL_API}/insert/cliente/`, {
        method: "POST",
        body: JSON.stringify(formulario),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => {
          setEnviar(false);
          onHide();
        })
        .catch((err) => console.warn(err));
    };

    if (enviar) enviarData();
    // eslint-disable-next-line
  }, [enviar]);

  return (
    <Modal
      {...moreProps}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Registro de Clientes
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="border-0 m-auto px-4" style={{ maxWidth: "70vw" }}>
          <Form.Label className="mt-2">Nombre</Form.Label>
          <Form.Control type="text" name="nombre" onChange={handleChange} />

          <Form.Label className="mt-2">Apellido</Form.Label>
          <Form.Control type="text" name="apellido" onChange={handleChange} />

          <Form.Label className="mt-2">Teléfono</Form.Label>
          <Form.Control
            type="text"
            name="numero_celular"
            onChange={handleChange}
          />

          <Form.Label className="mt-2">Correo</Form.Label>
          <Form.Control type="email" name="correo" onChange={handleChange} />

          <Form.Label className="mt-2">Cédula</Form.Label>
          <Form.Control
            type="text"
            name="cedula"
            maxLength={10}
            onChange={handleChange}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleSubmit}
          disabled={
            formulario.nombre === "" ||
            formulario.apellido === "" ||
            formulario.cedula === "" ||
            formulario.correo === "" ||
            formulario.numero_celular === ""
          }
        >
          Registrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const Cliente = () => {
  const [modalShow, setModalShow] = useState(false);
  const [Data, setDataResp] = useState(null);
  const [DataR, setDataR] = useState(null);
  const [buscar, setBuscar] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handlePageChange = (page) => setCurrentPage(page);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Data?.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const consultar = () => {
      fetch(`${process.env.REACT_APP_URL_API}/consulta/clientes/`)
        .then((response) => response.json())
        .then((data) => {
          setDataResp(data?.datos);
          setDataR(data?.datos);
        })
        .catch((err) => console.warn(err));
    };

    consultar();
  }, []);

  const manejarKeyPress = (event) => {
    if (event.key === "Enter") {
      buscarEnCampos();
    }
  };

  const buscarEnCampos = () => {
    const valorBuscado = buscar.toLowerCase();

    const resultados = DataR?.filter((elemento) => {
      // Buscar en los tres campos (nombre, apellido, cedula)
      return (
        elemento.nombre.toLowerCase().includes(valorBuscado) ||
        elemento.apellido.toLowerCase().includes(valorBuscado) ||
        elemento.cedula.toLowerCase().includes(valorBuscado)
      );
    });

    setDataResp(resultados);
  };

  const ordenarPorCampo = ({ target }) => {
    const campo = target.value;
    const copiaDatos = [...Data]; // Hacemos una copia para no modificar el array original

    copiaDatos.sort((a, b) => {
      const valorA = a[campo].toLowerCase();
      const valorB = b[campo].toLowerCase();

      if (valorA < valorB) {
        return -1;
      }
      if (valorA > valorB) {
        return 1;
      }
      return 0;
    });

    setDataResp(copiaDatos);
  };

  return (
    <>
      <div className="textCotizar py-2">
        <h1 className="text-center text-light">CLIENTES</h1>
      </div>

      <div className="border-0 m-auto p-4 w-100" style={{ maxHeight: "70vh" }}>
        <Card className="px-5 pt-5 h-100">
          <Row className="mb-3">
            <Col>
              <div className="d-flex justify-content-start">
                <Button
                  className="btnStore border-0 rounded-3 mb-3"
                  style={{ width: "200px" }}
                  onClick={() => setModalShow(true)}
                >
                  Registrar Cliente
                </Button>
              </div>
            </Col>

            <Col>
              <div className="d-flex mx-5">
                <Form.Label className="mt-2">Ordenar: </Form.Label>
                <Form.Select onChange={ordenarPorCampo} className="mx-3">
                  <option value="nombre">Nombre</option>
                  <option value="apellido">Apellido</option>
                </Form.Select>
              </div>
            </Col>
            <Col>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  onChange={({ target }) => setBuscar(target.value)}
                  style={{ width: "400px" }}
                  onKeyDown={manejarKeyPress}
                />
                <Button
                  className="btnStore border-0 rounded-3 mb-0 mx-2"
                  style={{ width: "100px" }}
                  onClick={buscarEnCampos}
                >
                  Buscar
                </Button>
              </div>
            </Col>
          </Row>

          <div style={{ height: "37vh", overflow: "auto" }}>
            <Table responsive="md" className="h-100">
              <thead>
                <tr>
                  <th>#</th>
                  <th>CEDULA</th>
                  <th>NOMBRE</th>
                  <th>APELLIDOS</th>
                  <th>CORREO</th>
                  <th>TELÉFONO</th>
                  {/* <th></th> */}
                </tr>
              </thead>
              <tbody>
                {Data &&
                  currentItems.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item?.id}</td>
                        <td>{item?.cedula}</td>
                        <td>{item?.nombre}</td>
                        <td>{item?.apellido}</td>
                        <td>{item?.correo}</td>
                        <td>{item?.numero_celular}</td>
                        {/* <td>
                      <Button
                        className="btnStore border-0 rounded-3"
                        onClick={() => {
                          setModalShow(true);
                          setData(item);
                        }}
                      >
                        <FaRegEye />
                      </Button>
                    </td> */}
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
          {Data && (
            <PaginationTabla
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={Data.length}
              handlePageChange={handlePageChange}
            />
          )}
        </Card>
      </div>

      <FormData show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default Cliente;
