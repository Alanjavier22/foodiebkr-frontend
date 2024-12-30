import { useState, useEffect, useContext } from "react";

import { Button, Modal, Form } from "react-bootstrap";

import ImagenReferencial from "../../../../components/ImagenReferencial";
import { postMethod } from "../../../../fetch/postMethod";
import { LoadContext } from "../../../../context/LoadContext";

const SubirComprobante = (props) => {
  const { item, show, onHide, reload } = props;

  const { setLoadSpinner } = useContext(LoadContext);

  const [formData, setFormData] = useState({
    imagen: null,
    blobNamePago: null,
    id_cotizacion: item.id_cotizacion,
  });
  const [send, setSend] = useState(false);

  const sendTo = () => setSend(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (send) {
      setLoadSpinner(true);
      postMethod({
        path: "/cotizacion/insert/img-pago",
        data: {
          formData,
          title: "REGISTRO",
        },
        showBtn: true,
        callbck: onHide,
        reload: reload,
        setIsLoading: setLoadSpinner,
      });
    }
  }, [send]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ fontSize: "15px" }}
          className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >
          Subir Comprobante
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ minHeight: "40vh" }}>
        <div className="flex flex-col w-full pl-2 items-start">
          <Form.Label className="w-full px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Subir Comprobante de Pago
          </Form.Label>
          <div className="flex row flex-col-reverse w-full pl-2 justify-center items-center">
            <ImagenReferencial
              handleChange={handleChange}
              requireRows={false}
            />
          </div>
          <div className="flex justify-center items-center w-full">
            <Button
              className="btnStore w-52 bg-slate-400 px-4 py-2 border-0 rounded-3"
              onClick={sendTo}
              disabled={!formData.imagen}
            >
              Subir
            </Button>
          </div>
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
  );
};

export default SubirComprobante;
