import { useContext } from "react";
import swal from "sweetalert";
import { Formik } from "formik";
import * as Yup from "yup";

import { Row, Col, Button, Form, Modal, Image } from "react-bootstrap";

import { FormControl } from "../../../../components/FormContent";
import { LoadContext } from "../../../../context/LoadContext";
import { postMethod } from "../../../../fetch/postMethod";
import dateCurrent from "../../../../utils/DateCurrent";
import ImagenReferencial from "../../../../components/ImagenReferencial";

// Esquema de validación
const validationSchema = Yup.object({
  nombre: Yup.string()
    .matches(/^[a-zA-Z0-9\s]+$/, "Solo caracteres alfanuméricos")
    .required("El nombre es requerido"),
  duracion_horas: Yup.string()
    .matches(/^\d+$/, "Solo número")
    .required("La duración es requerida"),
  valor: Yup.string()
    .matches(/^\d+$/, "Solo número")
    .required("El valor del curso es requerido"),
  modalidad: Yup.string()
    .matches(/^[a-zA-Z-]+$/, "Solo caracteres alfabeticos")
    .required("La modalidad es requerida"),
  fecha_inicio_curso: Yup.string().required(
    "La fecha de inicio del curso es requerido"
  ),
  fecha_fin_curso: Yup.string().required(
    "La fecha de finalizacion del curso es requerido"
  ),
  descripcion: Yup.string().required("La descripción es requerida"),
});

const Upsert = ({ item, show, onHide, update, reload }) => {
  const formData = item
    ? item
    : {
        nombre: "",
        descripcion: "",
        valor: "",
        modalidad: "",
        imagen: "",
        duracion_horas: "",
        fecha_inicio_curso: "",
        fecha_fin_curso: "",
        estado_curso: true,
      };

  const { setLoadSpinner } = useContext(LoadContext);

  const sendData = (values) => {
    setLoadSpinner(true);

    postMethod({
      path: "/cursos/upsert",
      data: {
        formData: values,
        title: update ? "Actualizado" : "Registrado",
      },
      showBtn: true,
      reload: () => {
        reload();
        onHide();
      },
      setIsLoading: setLoadSpinner,
    });
  };

  const handleCustomChange = (event, handleChange) => {
    const { name, value } = event.target;

    if (value === "") handleChange(event);

    if (validationSchema.fields[name].tests[0].OPTIONS.params) {
      const regex = validationSchema.fields[name].tests[0].OPTIONS.params.regex;
      if (regex.test(value)) {
        handleChange(event);
      }
    } else {
      handleChange(event);
    }
  };

  const handleChangeState = (event, values, handleChange) => {
    const fecha_actual = dateCurrent();
    if (
      !values.estado_oferta &&
      new Date(values.fecha_fin_oferta) < new Date(fecha_actual)
    ) {
      swal({
        text: "la fecha fin ya paso",
        icon: "warning",
        timer: 1600,
        buttons: false,
        className: "left-modal",
      });

      handleChange({ target: { name: "fecha_fin_oferta", value: "" } });
    }

    handleChange(event);
  };

  return (
    <>
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
            {update ? "Actualizar" : "Agregar"} Curso
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="py-4" style={{ minHeight: "40vh" }}>
            {formData && (
              <Formik
                initialValues={formData}
                enableReinitialize={true}
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
                          label="nombre"
                          name="nombre"
                          value={values.nombre}
                          handleChange={(e) =>
                            handleCustomChange(e, handleChange)
                          }
                          onBlur={handleBlur}
                          isInvalid={touched.nombre && !!errors.nombre}
                          errorsMsg={errors.nombre}
                          directionColumn={true}
                          maxLength={250}
                        />
                      </Col>
                      <Col md={12} xl={6}>
                        <FormControl
                          label="duracion horas"
                          name="duracion_horas"
                          value={values.duracion_horas}
                          handleChange={(e) =>
                            handleCustomChange(e, handleChange)
                          }
                          onBlur={handleBlur}
                          isInvalid={
                            touched.duracion_horas && !!errors.duracion_horas
                          }
                          errorsMsg={errors.duracion_horas}
                          directionColumn={true}
                          maxLength={2}
                        />
                      </Col>
                    </Row>
                    <Row className="flex w-full justify-between items-center">
                      <Col md={12} xl={6}>
                        <FormControl
                          label="modalidad"
                          name="modalidad"
                          value={values.modalidad}
                          handleChange={(e) =>
                            handleCustomChange(e, handleChange)
                          }
                          onBlur={handleBlur}
                          isInvalid={touched.modalidad && !!errors.modalidad}
                          errorsMsg={errors.modalidad}
                          directionColumn={true}
                          maxLength={50}
                        />
                      </Col>
                      <Col md={12} xl={6}>
                        <FormControl
                          label="valor"
                          name="valor"
                          value={values.valor}
                          handleChange={(e) =>
                            handleCustomChange(e, handleChange)
                          }
                          onBlur={handleBlur}
                          isInvalid={touched.valor && !!errors.valor}
                          errorsMsg={errors.valor}
                          directionColumn={true}
                          maxLength={3}
                        />
                      </Col>
                    </Row>
                    <Row className="flex w-full justify-between items-center">
                      <Col md={12} xl={12}>
                        <FormControl
                          label="descripcion"
                          name="descripcion"
                          value={values.descripcion}
                          handleChange={(e) =>
                            handleCustomChange(e, handleChange)
                          }
                          onBlur={handleBlur}
                          isInvalid={
                            touched.descripcion && !!errors.descripcion
                          }
                          errorsMsg={errors.descripcion}
                          directionColumn={true}
                          maxLength={250}
                          rows={9}
                          fullCol={true}
                          style={{ resize: "none" }}
                        />
                      </Col>
                    </Row>

                    <Row className="flex w-full justify-between items-center">
                      <Col md={12} xl={6}>
                        <FormControl
                          label="fecha inicio curso"
                          type="date"
                          name="fecha_inicio_curso"
                          value={values.fecha_inicio_curso}
                          handleChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={
                            touched.fecha_inicio_curso &&
                            !!errors.fecha_inicio_curso
                          }
                          errorsMsg={errors.fecha_inicio_curso}
                          directionColumn={true}
                        />
                      </Col>
                      <Col md={12} xl={6}>
                        <FormControl
                          label="fecha fin curso"
                          name="fecha_fin_curso"
                          type="date"
                          min={values.fecha_inicio_curso}
                          value={values.fecha_fin_curso}
                          handleChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={
                            touched.fecha_fin_curso && !!errors.fecha_fin_curso
                          }
                          errorsMsg={errors.fecha_fin_curso}
                          directionColumn={true}
                        />
                      </Col>
                    </Row>

                    {update && (
                      <Row className="flex w-full justify-between items-center">
                        <Col md={12} xl={6}>
                          <div className="flex w-full pl-2 items-center">
                            <Form.Label className="w-2/5 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Estado
                            </Form.Label>
                            <Form.Select
                              name="estado_curso"
                              size="sm"
                              value={values.estado_curso}
                              onChange={(e) =>
                                handleChangeState(e, values, handleChange)
                              }
                              className="w-full h-full ml-4 px-4 py-2 my-0 border-b-2 text-left text-xs font-semibold text-gray-600 tracking-wider"
                            >
                              <option value={true}>Activo</option>
                              <option value={false}>Inactivo</option>
                            </Form.Select>
                          </div>
                        </Col>
                      </Row>
                    )}

                    <Row className="flex w-full justify-between items-start">
                      {item?.id_cursos && (
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
                      <Col md={12} xl={item?.id_cursos ? 6 : 12}>
                        <div className="flex flex-col w-full pl-2 items-start">
                          <Form.Label className="w-full px-4 py-3 pt-4 border-b-0 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"></Form.Label>
                          <div className="flex row w-full pl-2 justify-center items-center">
                            <ImagenReferencial
                              handleChange={handleChange}
                              label={
                                item?.id_cursos
                                  ? "Actualizar Imagen"
                                  : "Agregar Imagen"
                              }
                              requireRows={false}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <div className="flex flex-col justify-end items-end mr-0 pt-3 w-full px-4">
                      <Button
                        className="btnStore bg-slate-400 px-4 py-2 border-0 rounded-3 tracking-wider"
                        onClick={handleSubmit}
                      >
                        {update ? "Actualizar" : "Agregar"} Curso
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
            )}
          </div>
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
    </>
  );
};

export default Upsert;
