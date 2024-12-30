import { useState } from "react";
import { Nav, Tab, Container } from "react-bootstrap";

import Visual from "./components/Visual";
import Create from "./components/Create";
import Asignar from "./components/Asignar";

const Offers = () => {
  const [activeTab, setActiveTab] = useState("crear");

  const handleSelect = (selectedKey) => {
    setActiveTab(selectedKey);
  };

  return (
    <>
      <div className="border-0 m-auto p-4" style={{ maxWidth: "90vw" }}>
        <div className="p-2 border-b-2 mb-5">
          <h2 className="text-gray-600 font-semibold">Códigos de Descuento</h2>
          <span className="text-xs uppercase">
            Genera y visualiza códigos de descuento
          </span>
        </div>

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
                  eventKey="crear"
                  className="uppercase tracking-wider text-xs font-semibold"
                >
                  Generar
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="visual"
                  className="uppercase tracking-wider text-xs font-semibold"
                >
                  Visualizar y Actualizar
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="asignar"
                  className="uppercase tracking-wider text-xs font-semibold"
                >
                  Asignar
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="mt-3">
              <Tab.Pane eventKey="crear">
                <Create />
              </Tab.Pane>
              <Tab.Pane eventKey="visual">
                {activeTab === "visual" && <Visual />}
              </Tab.Pane>
              <Tab.Pane eventKey="asignar">
                {activeTab === "asignar" && <Asignar />}
              </Tab.Pane>
            </Tab.Content>
          </Container>
        </Tab.Container>
      </div>
    </>
  );
};

export default Offers;
