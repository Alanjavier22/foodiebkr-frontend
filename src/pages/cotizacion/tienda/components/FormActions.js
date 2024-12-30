import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import TooltipCustom from "../../../../components/Tooltip";
import { AiOutlineDelete } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";

const FormActions = ({
  handleChange,
  formData,
  elements,
  title,
  anotation = "*Los valores presentados no están con iva",
  elementsHasValor = true,
  duplicateField,
  removeField,
}) => {
  const groupedItems = {};

  elements.forEach((element) => {
    const baseName = element.nombre.split("_")[0];
    if (!groupedItems[baseName]) {
      groupedItems[baseName] = [];
    }
    groupedItems[baseName].push(element);
  });

  const resetData = (nombre) => {
    handleChange({
      target: {
        name: nombre,
        value: "-",
      },
    });

    handleChange({
      target: {
        name: "cantidad " + nombre,
        value: " ",
      },
    });
  };

  const handleChangeOption = ({ target }) => {
    const { name, value } = target;

    handleChange({
      target: { name, value },
    });

    handleChangeAmount({ target: { name, value: "12" } }); // Cambiar valor inicial a 12
  };

  const handleChangeAmount = (e) => {
    const { name, value } = e.target;

    if (/^\d*$/.test(value) && value.length <= 3) {
      let adjustedValue = parseInt(value, 10) || 0;

      if (adjustedValue % 12 !== 0) {
        if (adjustedValue < parseInt(formData["cantidad " + name], 10)) {
          adjustedValue = Math.floor(adjustedValue / 12) * 12;
        } else {
          adjustedValue = Math.ceil(adjustedValue / 12) * 12;
        }
      }

      handleChange({
        target: {
          name: "cantidad " + name,
          value: adjustedValue,
        },
      });
    }
  };

  const preventNonNumericInput = (e) => {
    if (e.key === "+")
      handleChangeAmount({ target: { name: e.target.name, value: "12" } });

    if (
      e.key !== "ArrowUp" &&
      e.key !== "ArrowDown" &&
      e.keyCode !== 8 &&
      !/^\d*$/.test(e.key)
    ) {
      e.preventDefault();
    } else {
      if (/^\d$/.test(e.key)) {
        handleChangeAmount({ target: { name: e.target.name, value: "" } });
      }
    }
  };

  return (
    <>
      {title && (
        <>
          <Form.Label className="w-full px-4 pt-5 pb-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
            {title}
          </Form.Label>
          <Form.Label
            className="w-full px-4 pb-4 font-semibold text-gray-600 uppercase tracking-wider"
            style={{ fontSize: "10px" }}
          >
            {anotation}
          </Form.Label>
        </>
      )}

      <Row>
        {groupedItems &&
          Object.keys(groupedItems).map((groupName) => {
            return (
              <Col md={12} key={groupName} className="mb-5">
                <Row>
                  {groupedItems[groupName].map((item, index) => {
                    return (
                      <Col
                        md={12}
                        key={item.nombre}
                        className="mb-3 items-baseline"
                      >
                        <div className="flex w-full pl-2 items-baseline">
                          <TooltipCustom
                            descripcion={item?.descripcion || item?.nombre}
                          >
                            <Form.Label className="w-2/5 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              {!index && (
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
                              onChange={handleChangeOption}
                              disabled={item?.opciones?.length === 0}
                              className="w-full h-full ml-4 px-4 py-2 my-0 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                            >
                              <option value="-" disabled>
                                Selecciona un {item.nombre.toLowerCase()}
                              </option>
                              {item?.opciones?.length !== 0 &&
                                item?.opciones.map(
                                  ({ nombre, key, valor, especificar }) => {
                                    if (elementsHasValor)
                                      return (
                                        <option
                                          key={key}
                                          value={JSON.stringify({
                                            nombre,
                                            key,
                                            valor,
                                          })}
                                        >
                                          ${valor} - {nombre}
                                        </option>
                                      );

                                    if (!elementsHasValor)
                                      return (
                                        <option
                                          key={key}
                                          value={
                                            especificar ? "especificar" : nombre
                                          }
                                        >
                                          {nombre}
                                        </option>
                                      );
                                  }
                                )}
                            </Form.Select>
                            <div
                              className="mx-1"
                              style={{ marginTop: "-24px" }}
                            >
                              <Form.Label className="px-4 mb-0 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Cantidad/docena
                              </Form.Label>
                              <Form.Control
                                type="number"
                                // size="sm"
                                name={item.nombre}
                                value={
                                  !formData[item.nombre] ||
                                  formData[item.nombre] === "-"
                                    ? ""
                                    : formData["cantidad " + item.nombre] || ""
                                }
                                onChange={handleChangeAmount}
                                onKeyDown={preventNonNumericInput}
                                placeholder={"Cantidad"}
                                maxLength={3}
                                min={1}
                                disabled={
                                  !formData[item.nombre] ||
                                  formData[item.nombre] === "-"
                                }
                                style={{
                                  maxWidth: "170px",
                                  minWidth: "100px",
                                  borderRadius: "0px",
                                  paddingLeft: 23,
                                }}
                                className="text-left text-xs font-semibold text-gray-600 tracking-wider"
                              />
                            </div>

                            {!item.nombre.includes("_") && (
                              <Button
                                className="btnStore bg-slate-400 px-3 py-2 border-0"
                                onClick={() => duplicateField(item)}
                              >
                                <FaPlus />
                              </Button>
                            )}
                            {item.nombre.includes("_") && (
                              <Button
                                className="btnDelete bg-slate-400 px-3 py-2 border-0 ml-2"
                                onClick={() => removeField(item.nombre)}
                              >
                                <AiOutlineDelete />
                              </Button>
                            )}
                            <Button
                              className="btnEdit text-gray-600 px-3 py-2 border-0"
                              onClick={() => resetData(item.nombre)}
                            >
                              <AiOutlineClear />
                            </Button>
                          </InputGroup>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default FormActions;
