import { useState } from "react";

import { Nav, Tab, Row, Col, Card } from "react-bootstrap";

import Seccion from "./components/Seccion";
import { FormHeader } from "../../components/FormContent";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Clientes");

  const handleSelect = (selectedKey) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setActiveTab(selectedKey);
  };

  return (
    <div className="border-0 m-auto px-3 pt-4" style={{ minHeight: "70vh" }}>
      <Card className="mx-4 p-0 mb-3">
        <Tab.Container activeKey={activeTab} onSelect={handleSelect}>
          <Row>
            <Col md={3} xl={2} className="border-r-2 my-0">
              <Nav
                justify
                variant="pills"
                className="flex-column bg-white ml-2 pr-1 py-5"
                activeKey={activeTab}
              >
                <FormHeader
                  title="Secciones"
                  className="text-lg text-start border-b-2 pt-3"
                />
                {["Clientes", "Cotizaciones", "Ventas"].map((text, idx) => (
                  <Nav.Item key={idx}>
                    <Nav.Link
                      eventKey={text}
                      className={`btnNav ${
                        activeTab === text ? "selected" : ""
                      } uppercase tracking-wider text-sm font-semibold my-1 w-36`}
                      style={{ fontSize: "13px" }}
                    >
                      {text}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
            <Col md={9} xl={10}>
              <Tab.Content className="mt-3">
                <Tab.Pane eventKey={activeTab}>
                  <Seccion _seccion={activeTab} />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Card>
    </div>
  );
};

export default Dashboard;
