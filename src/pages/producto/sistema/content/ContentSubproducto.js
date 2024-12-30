import { useState, useEffect, useContext } from "react";

import { Row, Col, Form, Modal, Button, Image } from "react-bootstrap";

import ImagenReferencial from "../../../../components/ImagenReferencial";
import handleCustomChange from "../../../../utils/handleCustomChange";
import validationProduct from "../../../../utils/validations/productos";
import { LoadContext } from "../../../../context/LoadContext";
import { postMethod } from "../../../../fetch/postMethod";

const ContentSubproducto = (props) => {
  const { item, id_producto, title, show, onHide, reload } = props;
  const validationSchema = validationProduct;

  const { setLoadSpinner } = useContext(LoadContext);

  const [formData, setFormData] = useState(
    item?.id_subproducto
      ? item
      : { id_producto, nombre: "", estado_subproducto: true }
  );
  const [disabledBtn, setDisabledBtn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value !== "");
  };

  useEffect(() => {
    if (isFormValid()) setDisabledBtn(true);
    else setDisabledBtn(false);
  }, [formData]);

  const sendData = () => {
    setLoadSpinner(true);
    postMethod({
      path: "/producto/subproducto/upsert",
      data: {
        formData,
        title: item?.id_subproducto ? "ACTUALIZACIÓN" : "REGISTRO",
      },
      showBtn: true,
      callbck: onHide,
      reload,
      setIsLoading: setLoadSpinner,
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size={item?.id_subproducto ? "xl" : "lg"}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ fontSize: "15px" }}
          className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="border-0 m-auto px-4" style={{ maxWidth: "75vw" }}>
          <>
            <Row className="flex w-full justify-between items-center">
              <Col md={12} xl={item?.id_subproducto ? 6 : 12}>
                <div className="flex w-full pl-2 items-center">
                  <Form.Label className="min-w-28 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nombres
                    <span className="text-red-500" style={{ fontSize: "1rem" }}>
                      *
                    </span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    size="sm"
                    name="nombre"
                    value={formData["nombre"]}
                    onChange={(event) =>
                      handleCustomChange(event, validationSchema, handleChange)
                    }
                    maxLength={250}
                    className="w-full h-full ml-4 px-2 py-2 border-b-2 text-left text-xs font-semibold text-gray-600 tracking-wider"
                  />
                </div>
              </Col>
              <Col md={12} xl={6}>
                <div className="flex w-full pl-2 items-center">
                  <Form.Label className="min-w-28 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Estado
                  </Form.Label>
                  <Form.Select
                    name="estado_subproducto"
                    size="sm"
                    value={formData["estado_subproducto"]}
                    onChange={handleChange}
                    className="w-full h-full ml-4 px-4 py-2 my-0 border-b-2 text-left text-xs font-semibold text-gray-600 tracking-wider"
                  >
                    <option value={true}>Activo</option>
                    <option value={false}>Inactivo</option>
                  </Form.Select>
                </div>
              </Col>
            </Row>

            <Row className="flex w-full justify-between items-start">
              {item?.id_subproducto && (
                <Col md={12} xl={6}>
                  <div className="flex flex-col w-full pl-2">
                    <Form.Label className="min-w-28 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Imagen actual
                    </Form.Label>
                    <div className="flex row w-full pl-2 justify-center items-center h-64">
                      <Image
                        src={item?.imagen}
                        height={250}
                        className="w-auto"
                        rounded
                        fluid
                      />
                    </div>
                  </div>
                </Col>
              )}
              <Col md={12} xl={item?.id_subproducto ? 6 : 12}>
                <div className="flex flex-col w-full pl-2 items-start">
                  <Form.Label className="w-full px-4 py-3 pt-4 border-b-0 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"></Form.Label>
                  <div className="flex row w-full pl-2 justify-center items-center">
                    <ImagenReferencial
                      handleChange={handleChange}
                      label={
                        item?.id_subproducto
                          ? "Actualizar Imagen"
                          : "Agregar Imagen"
                      }
                      requireRows={false}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btnStore bg-slate-400 px-4 py-2 border-0 rounded-3"
          onClick={sendData}
          disabled={!disabledBtn}
        >
          {item?.id_subproducto ? "Actualizar" : "Agregar"}
        </Button>
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

export default ContentSubproducto;
