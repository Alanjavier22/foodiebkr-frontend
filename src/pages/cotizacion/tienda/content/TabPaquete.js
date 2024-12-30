import { useEffect, useState } from "react";

import { Nav, Tab, Container, Form } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";

import PastelesContent from "./PastelesContent";
import CotizacionContent from "../components/CotizacionContent";
import CotizacionContentv2 from "../components/CotizacionContentv2";

const COTIZACIONES_MAP = {
  1: PastelesContent, //Pasteles
  2: CotizacionContentv2, //Bocaditos
  3: CotizacionContent, //Shots
  4: CotizacionContent, //Cupcakes
};

const TabPaquete = ({ dataTab, handleChange, formDataTab, setFormDataTab }) => {
  const [key, setKey] = useState("");

  const deleteFormDataTab = (item) => {
    const { nombre } = item;

    if (formDataTab[nombre]) {
      const newFormDataTab = { ...formDataTab };
      delete newFormDataTab[nombre];

      setFormDataTab(newFormDataTab);

      const newActiveKey =
        Object.keys(newFormDataTab).length > 0
          ? Object.keys(newFormDataTab)[0]
          : "";
      setKey(newActiveKey);
    }
  };

  const updateFormData = (item) => {
    setFormDataTab((prevFormDataTab) => ({
      ...prevFormDataTab,
      [item.nombre]: {
        producto: item.nombre,
        id_producto: item.id_producto,
        ...prevFormDataTab[item.nombre],
      },
    }));
  };

  const updateFormDataTab = (newForm) => {
    setFormDataTab((prevFormDataTab) => ({
      ...prevFormDataTab,
      [key]: {
        ...prevFormDataTab[key],
        ...newForm,
      },
    }));
  };

  const updateFormPasteles = (newForm) => {
    const fieldRequired = newForm();
    setFormDataTab((prevFormDataTab) => ({
      ...prevFormDataTab,
      [key]: {
        ...fieldRequired,
        ...prevFormDataTab[key],
      },
    }));
  };

  const handleChangeTab = (e) => {
    const { name, value } = e.target;

    setFormDataTab((prevFormDataTab) => ({
      ...prevFormDataTab,
      [key]: {
        ...prevFormDataTab[key],
        [name]: value,
      },
    }));
  };

  useEffect(() => {
    if (formDataTab) {
      handleChange({
        target: {
          name: "opciones",
          value: formDataTab,
        },
      });
    }
  }, [formDataTab]);

  return (
    <>
      <div className="border-0 m-auto p-2 pt-4" style={{ maxWidth: "100vw" }}>
        <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
          <Container>
            <Nav
              fill
              variant="tabs"
              className="justify-content-star custom-nav-tabs"
            >
              {dataTab &&
                dataTab.map((item) => {
                  return (
                    <Nav.Item key={item.id_producto} className="w-auto">
                      <Nav.Link
                        eventKey={item.nombre}
                        onClick={() => updateFormData(item)}
                        className="pt-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                      >
                        <div
                          id="example-modal-sizes-title-sm"
                          className="flex items-center justify-between w-full"
                        >
                          <Form.Label className="px-4 my-0 text-center text-base font-semibold text-gray-600 uppercase tracking-wider">
                            {item.nombre}
                          </Form.Label>
                          {item.nombre in formDataTab && (
                            <IoMdClose
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteFormDataTab(item);
                              }}
                              className="cursor-pointer"
                            />
                          )}
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                  );
                })}
            </Nav>
            <Tab.Content className="mt-3">
              {dataTab &&
                dataTab.map((item) => {
                  const Component = COTIZACIONES_MAP[Number(item?.id_producto)];
                  return (
                    <Tab.Pane key={item.id_producto} eventKey={item.nombre}>
                      {Component && formDataTab[item.nombre] && (
                        <Component
                          handleChange={handleChangeTab}
                          formData={formDataTab[item.nombre]}
                          setFormData={updateFormDataTab}
                          setFormDataTab={updateFormPasteles}
                          showImg={false}
                        />
                      )}
                    </Tab.Pane>
                  );
                })}
            </Tab.Content>

            {key === "" && (
              <div className="px-4 pb-4 pt-5 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Selecciona alguna pestaña para empezar la cotización
              </div>
            )}
          </Container>
        </Tab.Container>
      </div>
    </>
  );
};

export default TabPaquete;
