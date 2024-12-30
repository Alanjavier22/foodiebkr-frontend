import { useEffect, useState } from "react";

import { Nav, Tab, Container } from "react-bootstrap";
import FormContent from "./FormContent";
import { FormHeader } from "../../../components/FormContent";

const TabsSales = ({ items }) => {
  const [activeTab, setActiveTab] = useState("crear");

  const handleSelect = (selectedKey) => {
    setActiveTab(selectedKey);
  };

  const [data, setData] = useState(null);
  const [dataForm, setDataForm] = useState(null);

  useEffect(() => {
    let datos = null;
    if (data) {
      if (data.seccion === "producto") {
        datos = data.items.map((data) => ({
          producto: data.name,
          ["valor unitario"]: `$${data.unit_amount.value}`,
          cantidad: data.quantity,
          ["valor total"]: `$${data.unit_amount.value * data.quantity}`,
        }));
      }
      if (data.seccion === "inventario") {
        datos = data.items.map((data) => ({
          producto: data.name,
          ["valor unitario"]: `$${data.unit_amount.value}`,
          cantidad: data.quantity,
          ["valor total"]: `$${data.unit_amount.value * data.quantity}`,
        }));
      }
      if (data.seccion === "cursos") {
        datos = data.items.map((data) => ({
          ["Curso"]: data.name,
          ["valor/persona"]: `$${data.unit_amount.value}`,
          ["persona"]: data.quantity,
          ["valor total"]: `$${data.unit_amount.value * data.quantity}`,
        }));
        setDataForm(null);
      }
    }

    setDataForm(datos);
  }, [data]);

  const loadData = (item) => {
    setData({ seccion: item, items: items[item] });
  };

  return (
    <>
      <Tab.Container activeKey={activeTab} onSelect={handleSelect}>
        <Container>
          <Nav
            justify
            variant="tabs"
            activeKey={activeTab}
            className="custom-nav-tabs"
          >
            {Object.keys(items).map((item) => {
              const _item = item === "inventario" ? "pastelería" : item;
              return (
                <Nav.Item key={item} onClick={() => loadData(item)}>
                  <Nav.Link
                    eventKey={item}
                    className="uppercase tracking-wider text-xs font-semibold"
                  >
                    {_item}
                  </Nav.Link>
                </Nav.Item>
              );
            })}
          </Nav>
          <Tab.Content className="mt-3">
            {dataForm &&
              dataForm.map((item, index) => {
                return (
                  <FormContent
                    key={index}
                    elementos={item}
                    rows={{ row_1: 1, row_2: 3 }}
                  />
                );
              })}

            {!dataForm && (
              <FormHeader title="Selecciona una pestaña para ver más detalles" />
            )}
          </Tab.Content>
        </Container>
      </Tab.Container>
    </>
  );
};

export default TabsSales;
