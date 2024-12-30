import { useState, useEffect } from "react";

import { Button, Modal, Nav, Tab, Container } from "react-bootstrap";

import Actualizar from "../components/Actualizar";
import ActualizarCl from "../../cliente/components/Actualizar";
import DatosCliente from "../content/DatosCliente";
import CotizacionContent from "../content/CotizacionContent";
import CotizacionBocaditos from "../content/CotizacionBocaditos";
import CotizacionPasteles from "../content/CotizacionPasteles";
import CotizacionPaquetes from "../content/CotizacionPaquetes";
import PlaceholderCustom from "../../../../components/Placeholder";

import { getMethod } from "../../../../fetch/getMethod";

const COTIZACIONES_MAP = {
  1: CotizacionPasteles, //Pasteles
  2: CotizacionBocaditos, //Bocaditos
  3: CotizacionContent, //Shots
  4: CotizacionContent, //Cupcakes
  5: CotizacionPaquetes,
};

const Detalles = (props) => {
  const { id, show, onHide, user, ...moreProps } = props;

  const [activeTab, setActiveTab] = useState("home");

  //Fetch
  const [item, setItems] = useState(null);
  const [adicional, setAdicional] = useState(null);
  const [IsLoading, setIsLoading] = useState(true);

  const Component = COTIZACIONES_MAP[item?.cotizacion?.id_producto];

  const handleSelect = (selectedKey) => {
    setActiveTab(selectedKey);
  };

  useEffect(() => {
    getMethod({
      path: `/cotizacion/detalles/${id}`,
      setData: ({ adicionales, ...data }) => {
        setItems(data);
        setAdicional(adicionales);
      },
      setIsLoading,
      showSwal: false,
    });
  }, [id]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ fontSize: "15px" }}
          className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >
          Cotización #{item?.cotizacion.id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ minHeight: "70vh" }}>
        {IsLoading && <PlaceholderCustom />}

        {item && (
          <div className="border-0 m-auto px-4" style={{ maxWidth: "85vw" }}>
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
                      eventKey="home"
                      className="uppercase tracking-wider text-xs font-semibold"
                    >
                      Estado de la Cotización
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="cliente"
                      className="uppercase tracking-wider text-xs font-semibold"
                    >
                      Datos del Cliente
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="cotizacion"
                      className="uppercase tracking-wider text-xs font-semibold"
                    >
                      Datos de Cotización
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content className="mt-3">
                  <Tab.Pane eventKey="home">
                    {Number(user.id_rol) === 4 && <ActualizarCl rows={item} />}

                    {Number(user.id_rol) !== 4 && (
                      <Actualizar {...moreProps} onHide={onHide} rows={item} />
                    )}
                  </Tab.Pane>
                  <Tab.Pane eventKey="cliente">
                    <DatosCliente item={item.cliente} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="cotizacion">
                    {Component && (
                      <Component item={item.cotizacion} adicional={adicional} />
                    )}
                  </Tab.Pane>
                </Tab.Content>
              </Container>
            </Tab.Container>
          </div>
        )}
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
