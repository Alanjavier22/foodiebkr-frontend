import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { AiOutlineClear } from "react-icons/ai";

import FormEspecificar from "./FormEspecificar";
import FormInfor from "./FormInfor";
import { FormHeader, FormSubheader } from "../../../../components/FormContent";
import TooltipCustom from "../../../../components/Tooltip";

const FormDinamico = ({
  handleChange,
  formData,
  elements,
  title,
  anotation = "*Los valores presentados no están con iva",
  elementsHasValor = true,
  required = [""],
  removeElement = [""],
}) => {
  const groupedItems = [];

  const filteredElements = elements.filter(
    (element) => element.opciones?.length !== 0
  );

  for (let i = 0; i < filteredElements.length; i += 2) {
    groupedItems.push(filteredElements.slice(i, i + 2));
  }

  const resetData = (nombre) => {
    handleChange({
      target: {
        name: nombre,
        value: "-",
      },
    });

    if (formData[nombre + "_"]) {
      handleChange({
        target: {
          name: nombre + "_",
          value: " ",
        },
      });
      delete formData[nombre + "_"];
    }
  };

  return (
    <>
      {title && (
        <>
          <FormHeader title={title} />
          <FormSubheader text={anotation} />
        </>
      )}

      {groupedItems.map((group, index) => (
        <Row className="flex w-full justify-between items-center" key={index}>
          {group.map((item) => {
            if (removeElement.some((nombre) => nombre === item.nombre))
              return null;
            return (
              <Col
                md={12}
                xl={groupedItems.length === 1 ? 8 : 6}
                key={item.key}
                className="mb-3 items-baseline"
              >
                <div className="flex w-full pl-2 items-end">
                  <TooltipCustom
                    descripcion={
                      item?.descripcion ||
                      "Selecciona una opción para ver más detalles"
                    }
                  >
                    <Form.Label className="w-2/5 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      {(item?.requerido ||
                        required.some((nombre) => nombre === item.nombre)) && (
                        <span
                          className="text-red-500"
                          style={{ fontSize: "1rem" }}
                        >
                          *
                        </span>
                      )}
                      {item.nombre}
                    </Form.Label>
                  </TooltipCustom>
                  <InputGroup className="mb-3">
                    <Form.Select
                      size="sm"
                      name={item.nombre}
                      value={formData[item.nombre] || "-"}
                      onChange={handleChange}
                      disabled={item?.opciones?.length === 0}
                      className="w-full h-full ml-4 px-4 py-2 my-0 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      <option value="-" disabled>
                        Selecciona una opción
                      </option>
                      {item?.opciones?.length !== 0 &&
                        item?.opciones.map(
                          ({
                            nombre,
                            key,
                            valor,
                            especificar,
                            descripcion,
                          }) => {
                            if (elementsHasValor)
                              return (
                                <option
                                  key={key}
                                  value={JSON.stringify({
                                    nombre,
                                    key,
                                    valor,
                                    descripcion,
                                  })}
                                >
                                  ${valor} - {nombre}
                                </option>
                              );

                            if (!elementsHasValor)
                              return (
                                <option
                                  key={key}
                                  value={especificar ? "especificar" : nombre}
                                >
                                  {nombre}
                                </option>
                              );
                          }
                        )}
                    </Form.Select>

                    {/* Se presenta la informacion adicional si se ha escogido alguna opción */}
                    {formData[item.nombre] && formData[item.nombre] !== "-" && (
                      <FormInfor item={formData[item.nombre]} />
                    )}

                    {/* Se muestra si la opción no está marcada como requerido */}
                    {!item?.requerido &&
                      required.every((nombre) => nombre !== item.nombre) && (
                        <Button
                          className="btnEdit bg-slate-400 px-3 py-2 border-0"
                          onClick={() => resetData(item.nombre)}
                        >
                          <AiOutlineClear />
                        </Button>
                      )}
                  </InputGroup>
                </div>

                {/* Si es un campo que requiere de algo especifico */}
                {formData[item.nombre] === "especificar" && (
                  <FormEspecificar
                    key={item.key}
                    handleChange={handleChange}
                    formData={formData}
                    item={item}
                  />
                )}
              </Col>
            );
          })}
          {/* {group.length === 1 && <Col md={12} xl={6}></Col>} */}
        </Row>
      ))}
    </>
  );
};
export default FormDinamico;
