import { useState } from "react";
import { Button, Modal, Form, Nav, Tab, Container } from "react-bootstrap";

import DatosCliente from "../../content/DatosCliente";
import DetallesTotales from "../../components/DetallesTotales";
import TabsSales from "../../components/TabsSales";
import { FormHeader } from "../../../../components/FormContent";

function formatDate(isoDate) {
  const date = new Date(isoDate);

  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  return date.toLocaleString("es-ES", options).replace(".", "");
}

const Detalles = ({ item, show, onHide }) => {
  const [activeTab, setActiveTab] = useState("cliente");

  const handleSelect = (selectedKey) => {
    setActiveTab(selectedKey);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ fontSize: "15px" }}
          className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >
          Detalles de la compra
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ minHeight: "70vh" }}>
        <Tab.Container activeKey={activeTab} onSelect={handleSelect}>
          <Container>
            <Nav
              justify
              variant="tabs"
              activeKey={activeTab}
              className="custom-nav-tabs"
            >
              <Nav.Item>
                <Nav.Link
                  eventKey="cliente"
                  className="uppercase tracking-wider text-xs font-semibold"
                >
                  Datos del cliente
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="compra"
                  className="uppercase tracking-wider text-xs font-semibold"
                >
                  Datos de compra
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="mt-3">
              <Tab.Pane eventKey="cliente">
                {item.cliente && <DatosCliente item={item.cliente} />}
              </Tab.Pane>
              <Tab.Pane eventKey="compra">
                <div className="flex justify-between items-center border-b-2 pt-3">
                  <Form.Label className="min-w-36 px-4 pt-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Fecha de compra
                  </Form.Label>
                  <Form.Label className="min-w-36 px-4 pt-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {formatDate(item.fecha)}
                  </Form.Label>
                </div>

                <FormHeader title="Detalles" />

                {item && <TabsSales items={item.items} />}

                <FormHeader title="Detalle total de compra" />

                {item.datosTotales && (
                  <DetallesTotales datosTotales={item.datosTotales} />
                )}
              </Tab.Pane>
            </Tab.Content>
          </Container>
        </Tab.Container>
      </Modal.Body>
      <Modal.Footer>
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

export default Detalles;
