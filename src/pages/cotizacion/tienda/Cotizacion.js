import { useState, useContext } from "react";

import { Nav, Tab, Button, Container } from "react-bootstrap";

import DatosCliente from "./content/DatosCliente";
import DatosCotizacion from "./content/DatosCotizacion";

import { LoadContext } from "../../../context/LoadContext";
import { postMethod } from "../../../fetch/postMethod";

import "../../../assets/styles/Cotizacion.css";

const Cotizacion = ({ user }) => {
  const { setLoadSpinner } = useContext(LoadContext);

  const [key, setKey] = useState("dt-cliente");
  const [datosCotizar, setDatosCotizar] = useState(null);
  const [emptyValue, setEmptyValue] = useState(true);

  const UpdateForm = ({ emptyValues, nameData, formData }) => {
    setEmptyValue(emptyValues);

    if (!emptyValues) {
      setDatosCotizar((prevFormulario) => ({
        ...prevFormulario,
        [nameData]: formData,
      }));
    }
  };

  const enviarCotizacion = () => {
    setLoadSpinner(true);
    postMethod({
      path: "/cotizacion/insert",
      data: { formData: datosCotizar, title: "" },
      showBtn: true,
      reload: () => {
        window.location.reload();
      },
      setIsLoading: setLoadSpinner,
    });
  };

  return (
    <>
      <div className="textCotizar py-2">
        <h1 className="pt-3 text-center text-2xl font-semibold text-slate-100 uppercase tracking-wider">
          COTIZACIONES
        </h1>
      </div>

      <div className="py-4">
        {/* <FormularioCotizacion /> */}

        <div className="border-0 m-auto p-2 pt-4" style={{ maxWidth: "100vw" }}>
          <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
            <Container>
              <Nav
                variant="tabs"
                className="justify-content-start custom-nav-tabs"
              >
                <Nav.Item className="min-w-80">
                  <Nav.Link
                    eventKey="dt-cliente"
                    className="pt-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Datos Cliente
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="min-w-80">
                  <Nav.Link
                    eventKey="dt-cotizacion"
                    disabled={emptyValue}
                    className="pt-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Cotización
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content className="mt-3">
                <Tab.Pane eventKey="dt-cliente">
                  <DatosCliente
                    UpdateForm={UpdateForm}
                    goToNextTab={() => setKey("dt-cotizacion")}
                    disabledBtn={emptyValue}
                    user={user}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="dt-cotizacion">
                  <DatosCotizacion
                    datosCotizar={datosCotizar}
                    UpdateForm={UpdateForm}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Container>
          </Tab.Container>
        </div>

        {key === "dt-cotizacion" && (
          <div className="flex justify-center pt-3 px-2">
            <Button
              className="btnStore bg-slate-400 px-4 py-2 border-0 rounded-3"
              onClick={enviarCotizacion}
              disabled={emptyValue}
              style={{ borderRadius: "50px", width: "200px", padding: "13px" }}
            >
              Realizar Cotización
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cotizacion;
