import { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

import "./Cotizacion.css";

import { FaRegEye } from "react-icons/fa";
import PaginationTabla from "../componentes/PaginationTabla";

function FormData(props) {
  const { item, ...moreProps } = props;
  return (
    <Modal
      {...moreProps}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cotizacion #{item?.id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="border-0 m-auto px-4" style={{ maxWidth: "70vw" }}>
          <Form.Label className="mt-2">Nombres</Form.Label>
          <Form.Control disabled value={item?.nombre} />

          <Form.Label className="mt-2">Apellidos</Form.Label>
          <Form.Control disabled value={item?.apellido} />

          <Form.Label className="mt-2">Correo</Form.Label>
          <Form.Control disabled value={item?.correo} />

          <Form.Label className="mt-2">Celular</Form.Label>
          <Form.Control disabled value={item?.celular} />

          <Form.Label className="mt-2">Producto</Form.Label>
          <Form.Control disabled value={item?.tipo_de_producto} />

          <Form.Label className="mt-2">Tematica</Form.Label>
          <Form.Control disabled value={item?.tematica} />

          <Form.Label className="mt-2">Cantidad</Form.Label>
          <Form.Control disabled value={item?.cantidad} />

          <Form.Label className="mt-2">Decorada</Form.Label>
          <Form.Control disabled value={item?.decoracion} />

          <Form.Label className="mt-2">Sabor</Form.Label>
          <Form.Control disabled value={item?.sabores} />

          <div className="mt-2 d-flex gap-2">
            <div className="w-50 mt-2">
              <Form.Label>Pisos</Form.Label>
              <Form.Control disabled value={item?.pisos} />
            </div>
            <div className="w-50 mt-2">
              <Form.Label>Porciones</Form.Label>
              <Form.Control disabled value={item?.porciones} />
            </div>
          </div>

          <Form.Label className="mt-2">Mensaje</Form.Label>
          <Form.Control
            disabled
            value={item?.mensaje}
            as="textarea"
            rows={3}
            style={{ resize: "none" }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Cotizaciones = () => {
  const [modalShow, setModalShow] = useState(false);
  const [Data, setDataResp] = useState(null);
  const [data, setData] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handlePageChange = (page) => setCurrentPage(page);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Data?.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const consultar = () => {
      fetch(`${process.env.REACT_APP_URL_API}/consulta/cotizaciones/`)
        .then((response) => response.json())
        .then((data) => setDataResp(data?.datos))
        .catch((err) => console.warn(err));
    };

    consultar();
  }, []);

  return (
    <>
      <div className="textCotizar py-2">
        <h1 className="text-center text-light">COTIZACIONES</h1>
      </div>

      <div className="border-0 m-auto p-4 w-100" style={{ minHeight: "61vh" }}>
        <Card className="p-5">
          <Table responsive="md" style={{ minHeight: "40vh" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>PRODUCTO</th>
                <th>CANTIDAD</th>
                <th>PISOS</th>
                <th>PORCIONES</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Data &&
                currentItems.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item?.numCotizacion || index + 1}</td>
                      <td>{item?.tipo_de_producto}</td>
                      <td>{item?.cantidad}</td>
                      <td>{item?.pisos}</td>
                      <td>{item?.porciones}</td>
                      <td>
                        <Button
                          className="btnStore border-0 rounded-3"
                          onClick={() => {
                            setModalShow(true);
                            setData(item);
                          }}
                        >
                          <FaRegEye />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>

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

      <FormData
        show={modalShow}
        onHide={() => setModalShow(false)}
        item={data}
      />
    </>
  );
};

export default Cotizaciones;
