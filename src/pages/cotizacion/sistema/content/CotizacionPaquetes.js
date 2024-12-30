import { useState } from "react";

import { Nav, Tab, Container } from "react-bootstrap";

import FormDatosIniciales from "../components/FormDatosIniciales";
import CotizacionPasteles from "./CotizacionPasteles";
import CotizacionBocaditos from "./CotizacionBocaditos";
import CotizacionContent from "./CotizacionContent";
import { FormSubheader } from "../../../../components/FormContent";

const COTIZACIONES_MAP = {
  1: CotizacionPasteles, //Pasteles
  2: CotizacionBocaditos, //Bocaditos
  3: CotizacionContent, //Shots
  4: CotizacionContent, //Cupcakes
};

function CotizacionPaquetes({ item, adicional }) {
  const [key, setKey] = useState("");

  return (
    <>
      <FormDatosIniciales item={item} />

      <div className="pt-4" />

      <FormSubheader text="Selecciona un tab para ver los detalles" />

      <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
        <Container>
          <Nav
            fill
            variant="tabs"
            className="justify-content-start custom-nav-tabs"
          >
            {item &&
              item.opciones.map((item) => {
                return (
                  <Nav.Item key={item.nombre} className="w-auto">
                    <Nav.Link
                      eventKey={item.nombre}
                      className="pt-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {item.nombre}
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
          </Nav>
          <Tab.Content className="mt-3">
            {item &&
              key &&
              item.opciones.map((data) => {
                const Component = COTIZACIONES_MAP[Number(data.id_producto)];
                return (
                  <Tab.Pane key={data.id_producto} eventKey={data.nombre}>
                    {Component && (
                      <Component
                        item={data.datos}
                        adicional={adicional}
                        showValor={true}
                      />
                    )}
                  </Tab.Pane>
                );
              })}
          </Tab.Content>
        </Container>
      </Tab.Container>
    </>
  );
}

export default CotizacionPaquetes;
