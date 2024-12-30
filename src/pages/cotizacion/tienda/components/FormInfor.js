import { useState, useEffect, useRef } from "react";

import PropTypes from "prop-types";

import { Button, Modal, Row, Col, Form } from "react-bootstrap";

import { IoMdInformationCircleOutline, IoMdClose } from "react-icons/io";

const FormInfor = ({ item }) => {
  const [showInfor, setShowInfor] = useState(false);
  const [data, setData] = useState({ nombre: "", descripcion: "" });

  useEffect(() => {
    try {
      const parsedData = JSON.parse(item);
      setData(parsedData);
    } catch (err) {
      setData({ nombre: item, descripcion: "" });
    }
  }, [item]);

  const handleChange = () => setShowInfor((current) => !current);

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      autoResizeTextarea();
    }
  }, [data.descripcion]);

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <>
      <Button
        className="btnInfor bg-slate-400 px-3 py-2 border-0"
        onClick={handleChange}
      >
        <IoMdInformationCircleOutline />
      </Button>

      {showInfor && (
        <Modal
          show={showInfor}
          aria-labelledby="example-modal-sizes-title-sm"
          centered
        >
          <Modal.Header>
            <Modal.Title
              id="example-modal-sizes-title-sm"
              className="flex items-center justify-between w-full"
            >
              <Form.Label className="px-4 my-0 text-center text-base font-semibold text-gray-600 uppercase tracking-wider">
                {data.nombre}
              </Form.Label>
              <IoMdClose onClick={handleChange} className="cursor-pointer" />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="flex w-full justify-between items-center">
              <Col md={12} xl={12}>
                <div className="flex w-full pl-2 items-center">
                  <Form.Label className="w-full px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    descripción
                  </Form.Label>
                </div>
              </Col>
              <Col md={12} xl={12}>
                <div className="flex w-full pl-2 pb-4">
                  <Form.Control
                    ref={textareaRef}
                    as="textarea"
                    rows={5}
                    style={{ fontSize: "1rem", lineHeight: "1.5rem" }}
                    value={
                      data.descripcion ||
                      "No se dispone de datos para esta opción"
                    }
                    disabled
                    className="w-full h-full ml-4 px-4 py-2 border-0 bg-white resize-none text-base text-left font-semibold text-gray-600 tracking-wider"
                  />
                </div>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

FormInfor.propTypes = {
  item: PropTypes.string.isRequired,
};

export default FormInfor;
