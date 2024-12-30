import { useState } from "react";

import { Row, Col, Button } from "react-bootstrap";

import ContentProducto from "../../producto/sistema/content/ContentProducto";
import ContentSubproducto from "../../producto/sistema/content/ContentSubproducto";

import { FaRegFileAlt, FaPencilAlt } from "react-icons/fa";
import { FormSelect } from "../../../components/FormContent";

const CONTENT_FORM_MAP = {
  Producto: { Component: ContentProducto, title: "Categoría" },
  Subproducto: { Component: ContentSubproducto, title: "SubCategoría" },
};

const ContentForm = ({
  data,
  formData,
  handleChange,
  prop = "Producto",
  reload,
  isLoading,
  es_inventario = false,
}) => {
  //Datos para modal
  const [showContent, setShowContent] = useState(false);
  const [DataR, setDataR] = useState(null);

  const { Component, title } = CONTENT_FORM_MAP[prop];

  const formName = title.toLowerCase();
  const formProp = prop.toLowerCase();

  const _editData = () => {
    const item = data.filter(
      (item) => item[`id_${formProp}`] === formData[formProp]
    );

    if (item.length !== 0) {
      setDataR(item[0]);
      setShowContent(true);
    }
  };

  const _createData = () => {
    setDataR({});
    setShowContent(true);
  };

  const handleChangeData = (e) => {
    if (prop === "Producto") {
      handleChange({ target: { name: "subproducto", value: "-" } });
    }
    handleChange(e);
  };

  const resetSelect = () =>
    handleChange({ target: { name: formProp, value: "-" } });

  return (
    <>
      <Row className="flex w-full justify-between items-stretch">
        <FormSelect
          label={formName}
          name={formProp}
          handleChange={handleChangeData}
          value={formData[formProp]}
          disabled={data.length === 0 || isLoading}
          resetData={resetSelect}
          requerido={false}
          md={6}
        >
          {data &&
            data.map((item) => {
              return (
                <option
                  key={item[`id_${formProp}`]}
                  value={item[`id_${formProp}`]}
                >
                  {item.nombre}
                </option>
              );
            })}
        </FormSelect>
        <Col md={6}>
          <Button
            className="btnStore bg-slate-400 px-4 mx-1 my-1 py-2 border-0 rounded-3"
            onClick={_editData}
            disabled={formData[formProp] === "-"}
          >
            <FaPencilAlt />
          </Button>
          <Button
            className="btnStore bg-slate-400 px-4 mx-1 my-1 py-2 border-0 rounded-3"
            onClick={_createData}
            disabled={formData["producto"] === "-"}
          >
            <FaRegFileAlt />
          </Button>
        </Col>
      </Row>

      {showContent && Component && (
        <Component
          show={showContent}
          onHide={() => setShowContent((current) => !current)}
          item={DataR}
          title={title}
          reload={reload}
          id_producto={formData["producto"]}
          es_inventario={es_inventario}
        />
      )}
    </>
  );
};

export default ContentForm;
