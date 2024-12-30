import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ImagenReferencial from "../../../../components/ImagenReferencial";
import {
  FormHeader,
  FormCol,
  FormControl,
} from "../../../../components/FormContent";
import dateCurrent from "../../../../utils/DateCurrent";

const DatosExtra = ({ handleChange, formData, showImg = true }) => {
  return (
    <>
      <FormHeader title={`Datos Extras de ${formData?.producto}`} />

      {showImg && (
        <Row className="flex w-full justify-between items-center">
          <Col md={12} xl={6}>
            <FormControl
              label="fecha de cotización"
              type="date"
              min={dateCurrent()}
              name="fecha_cotizacion"
              value={formData?.fecha_cotizacion}
              handleChange={handleChange}
              directionColumn={true}
            />
          </Col>
        </Row>
      )}

      <Row className="flex w-full justify-between items-center">
        <FormCol
          label="Descripción"
          name="descripcion"
          value={formData.descripcion}
          handleChange={handleChange}
          rows={3}
          requerido={false}
          maxLength={500}
          fullCol={true}
        />
      </Row>

      {showImg && <ImagenReferencial handleChange={handleChange} />}
    </>
  );
};

export default DatosExtra;
