import { useContext, useRef } from "react";
import { LoadContext } from "../../../../context/LoadContext";

import { Formik } from "formik";

import { Row, Col, Form, Modal, Button, Image } from "react-bootstrap";

import ImagenReferencial from "../../../../components/ImagenReferencial";
import { FormControl } from "../../../../components/FormContent";
import { postMethod } from "../../../../fetch/postMethod";
import handleCustomChange from "../../../../utils/handleCustomChange";
import validationInventary from "../../../../utils/validations/inventario";

const ModalInventario = (props) => {
  const { item, id_producto, id_subproducto, show, onHide, reload } = props;

  const validationSchema = validationInventary;

  const formikRef = useRef();

  const { setLoadSpinner } = useContext(LoadContext);

  const formData = item?.id_inventario
    ? { ...item, descripcion: item.descripcion ? item.descripcion : " " }
    : {
        id_producto,
        id_subproducto,
        nombre: "",
        stock: "",
        valor: "",
        estado_inventario: true,
      };

  const sendData = (values) => {
    setLoadSpinner(true);
    postMethod({
      path: "/inventario/upsert",
      data: {
        formData: values,
        title: item?.id_inventario ? "ACTUALIZACIÓN" : "REGISTRO",
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
          Producto
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="border-0 m-auto px-4" style={{ maxWidth: "75vw" }}>
          <>
            <Formik
              innerRef={formikRef}
              initialValues={formData}
              validationSchema={validationSchema}
              onSubmit={sendData}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <form>
                  <Row className="flex w-full justify-between items-center">
                    <Col md={12} xl={6}>
                      <FormControl
                        label="Nombres"
                        name="nombre"
                        value={values.nombre}
                        handleChange={(event) =>
                          handleCustomChange(
                            event,
                            validationSchema,
                            handleChange
                          )
                        }
                        onBlur={handleBlur}
                        isInvalid={touched.nombre && !!errors.nombre}
                        errorsMsg={errors.nombre}
                        directionColumn={true}
                      />
                    </Col>

                    <Col md={12} xl={6}>
                      <div className="flex w-full pl-2 items-center">
                        <Form.Label className="w-2/5 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Estado
                        </Form.Label>
                        <Form.Select
                          name="estado_categoria"
                          size="sm"
                          value={formData["estado_categoria"]}
                          onChange={handleChange}
                          className="w-full h-full ml-4 px-4 py-2 my-0 border-b-2 text-left text-xs font-semibold text-gray-600 tracking-wider"
                        >
                          <option value={true}>Activo</option>
                          <option value={false}>Inactivo</option>
                        </Form.Select>
                      </div>
                    </Col>
                  </Row>

                  <Row className="flex w-full justify-between items-center">
                    <Col md={12} xl={6}>
                      <FormControl
                        label="stock"
                        name="stock"
                        value={values.stock}
                        handleChange={(event) =>
                          handleCustomChange(
                            event,
                            validationSchema,
                            handleChange
                          )
                        }
                        onBlur={handleBlur}
                        isInvalid={touched.stock && !!errors.stock}
                        errorsMsg={errors.stock}
                        directionColumn={true}
                        maxLength={3}
                      />
                    </Col>
                  </Row>

                  <Row className="flex w-full justify-between items-center">
                    <Col md={12} xl={6}>
                      <FormControl
                        label="Precio"
                        name="valor"
                        value={values.valor}
                        handleChange={(event) =>
                          handleCustomChange(
                            event,
                            validationSchema,
                            handleChange
                          )
                        }
                        onBlur={handleBlur}
                        isInvalid={touched.valor && !!errors.valor}
                        errorsMsg={errors.valor}
                        directionColumn={true}
                        maxLength={5}
                      />
                    </Col>
                  </Row>

                  <Row className="flex w-full justify-between items-center">
                    <Col md={12} xl={12}>
                      <FormControl
                        label="Descripción"
                        name="descripcion"
                        value={values.descripcion}
                        handleChange={(event) =>
                          handleCustomChange(
                            event,
                            validationSchema,
                            handleChange
                          )
                        }
                        onBlur={handleBlur}
                        isInvalid={touched.descripcion && !!errors.descripcion}
                        errorsMsg={errors.descripcion}
                        rows={6}
                        maxLength={350}
                        fullCol={true}
                        directionColumn={true}
                      />
                    </Col>
                  </Row>

                  <Row className="flex w-full justify-between items-start">
                    {item?.id_inventario && (
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
                    <Col md={12} xl={item?.id_inventario ? 6 : 12}>
                      <div className="flex flex-col w-full pl-2 items-start">
                        <Form.Label className="w-full px-4 py-3 pt-4 border-b-0 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"></Form.Label>
                        <div className="flex row w-full pl-2 justify-center items-center">
                          <ImagenReferencial
                            handleChange={handleChange}
                            label={
                              item?.id_inventario
                                ? "Actualizar Imagen"
                                : "Agregar Imagen"
                            }
                            requireRows={false}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </form>
              )}
            </Formik>
          </>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btnStore bg-slate-400 px-4 py-2 border-0 rounded-3"
          onClick={() => formikRef.current.submitForm()}
        >
          {item?.id_inventario ? "Actualizar" : "Agregar"}
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

export default ModalInventario;
