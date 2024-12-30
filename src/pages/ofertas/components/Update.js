import swal from "sweetalert";

import { Modal, Button } from "react-bootstrap";

import Create from "./Create";
import dateCurrent from "../../../utils/DateCurrent";

const Update = (props) => {
  const { item, show, onHide, reload } = props;

  const formData = item;

  const hide = () => {
    reload();
    onHide();
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

    if (!values.estado_oferta) {
      handleChange({
        target: { name: "fecha_inicio_oferta", value: fecha_actual },
      });
    }

    handleChange(event);
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
        <Create
          updateData={formData}
          update={true}
          hide={hide}
          handleChangeState={handleChangeState}
        />
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
  );
};

export default Update;
