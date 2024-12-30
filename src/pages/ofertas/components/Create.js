import { useContext, useState } from "react";

import { Formik } from "formik";
import * as Yup from "yup";

import { Row, Col, Button, Form } from "react-bootstrap";

import { FormControl } from "../../../components/FormContent";
import { LoadContext } from "../../../context/LoadContext";
import { postMethod } from "../../../fetch/postMethod";
import dateCurrent from "../../../utils/DateCurrent";

// Esquema de validación
const validationSchema = Yup.object({
  codigo_descuento: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Solo caracteres alfanuméricos")
    .required("El código de descuento es requerido"),
  porcentaje_descuento: Yup.string()
    .matches(/^\d+$/, "Solo número")
    .required("El porcentaje de descuento es requerido"),
  fecha_inicio_oferta: Yup.string().required(
    "La fecha inicial del descuento es requerida"
  ),
  fecha_fin_oferta: Yup.string().required(
    "La fecha final del descuento es requerida"
  ),
});

const generateRandomNumber = (min, max) => {
  let result = "";

  for (let i = 0; i < max; i++) {
    const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    result += randomIndex;
  }

  return result;
};

const Create = ({ updateData, update, hide, handleChangeState }) => {
  const [formData, setFormData] = useState(
    updateData
      ? updateData
      : {
          recarga: false,
          codigo_descuento: "",
          porcentaje_descuento: "",
          fecha_inicio_oferta: "",
          fecha_fin_oferta: "",
          estado_oferta: true,
        }
  );

  const { setLoadSpinner } = useContext(LoadContext);

  const sendData = (values) => {
    setLoadSpinner(true);

    postMethod({
      path: "/oferta/upsert",
      data: {
        formData: values,
        title: "Registrado",
      },
      showBtn: true,
      reload: () => {
        setFormData({
          recarga: true,
          codigo_descuento: "",
          porcentaje_descuento: "",
          fecha_inicio_oferta: "",
          fecha_fin_oferta: "",
          estado_oferta: true,
        });

        if (hide) hide();
      },
      setIsLoading: setLoadSpinner,
    });
  };

  const generateCode = (handleChange) => {
    const code = "MFBGIFT" + generateRandomNumber(3, 6);

    handleChange({ target: { name: "codigo_descuento", value: code } });
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

  return (
    <>
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
                {!update && (
                  <Row className="flex w-full justify-between items-center">
                    <Col md={12} xl={6}></Col>
                    <Col md={12} xl={6} className="flex justify-end">
                      <Button
                        className="btnStore bg-slate-400 h-10 ml-3 px-4 py-0 border-0 rounded-3 tracking-wider"
                        style={{ minWidth: "250px" }}
                        onClick={() => generateCode(handleChange)}
                      >
                        Código aleatorio
                      </Button>
                    </Col>
                  </Row>
                )}

                <Row className="flex w-full justify-between items-center">
                  <Col md={12} xl={6}>
                    <FormControl
                      label="codigo descuento"
                      name="codigo_descuento"
                      value={values.codigo_descuento}
                      handleChange={(e) => handleCustomChange(e, handleChange)}
                      onBlur={handleBlur}
                      isInvalid={
                        touched.codigo_descuento && !!errors.codigo_descuento
                      }
                      errorsMsg={errors.codigo_descuento}
                      directionColumn={true}
                      disabled={update}
                      maxLength={13}
                    />
                  </Col>
                  <Col md={12} xl={6}>
                    <FormControl
                      label="Porcentaje descuento (%)"
                      name="porcentaje_descuento"
                      value={values.porcentaje_descuento}
                      handleChange={(e) => handleCustomChange(e, handleChange)}
                      onBlur={handleBlur}
                      isInvalid={
                        touched.porcentaje_descuento &&
                        !!errors.porcentaje_descuento
                      }
                      errorsMsg={errors.porcentaje_descuento}
                      directionColumn={true}
                      maxLength={3}
                    />
                  </Col>
                </Row>

                <Row className="flex w-full justify-between items-center">
                  <Col md={12} xl={6}>
                    <FormControl
                      label="fecha inicio descuento"
                      type="date"
                      name="fecha_inicio_oferta"
                      min={dateCurrent()}
                      value={values.fecha_inicio_oferta}
                      // handleChange={handleChange}
                      handleChange={(e) => {
                        if (
                          values.fecha_inicio_oferta >
                            values.fecha_fin_oferta &&
                          values.fecha_fin_oferta
                        ) {
                          handleChange({
                            target: { name: "fecha_fin_oferta", value: "" },
                          });
                        }
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      isInvalid={
                        touched.fecha_inicio_oferta &&
                        !!errors.fecha_inicio_oferta
                      }
                      errorsMsg={errors.fecha_inicio_oferta}
                      directionColumn={true}
                    />
                  </Col>
                  <Col md={12} xl={6}>
                    <FormControl
                      label="fecha fin descuento"
                      name="fecha_fin_oferta"
                      type="date"
                      min={values.fecha_inicio_oferta}
                      value={values.fecha_fin_oferta}
                      handleChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={
                        touched.fecha_fin_oferta && !!errors.fecha_fin_oferta
                      }
                      errorsMsg={errors.fecha_fin_oferta}
                      directionColumn={true}
                    />
                  </Col>
                </Row>

                {update && (
                  <Row className="flex w-full justify-between items-center">
                    <Col md={12} xl={12}>
                      <div className="flex w-full pl-2 items-center">
                        <Form.Label
                          id="Ajuste-text"
                          className="w-2/5 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                        >
                          Estado
                        </Form.Label>
                        <Form.Select
                          name="estado_oferta"
                          size="sm"
                          value={values.estado_oferta}
                          // onChange={handleChange}
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

                <div className="flex flex-col justify-end items-end mr-0 pt-3 w-full px-4">
                  <Button
                    className="btnStore bg-slate-400 px-4 py-2 border-0 rounded-3 tracking-wider"
                    onClick={handleSubmit}
                  >
                    {update ? "Actualizar" : "Generar"} código descuento
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        )}
      </div>
    </>
  );
};

export default Create;
