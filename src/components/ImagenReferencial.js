import React, { useState, useRef } from "react";

import { Row, Col, Form, Image, InputGroup, Button } from "react-bootstrap";

const ImagenReferencial = ({
  handleChange,
  requireRows = true,
  label = "Subir imagen",
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState("");

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);

        handleChange({ target: { name: "imagen", value: reader.result } });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!requireRows) {
    return (
      <>
        <div className="flex row w-full pl-2 justify-center items-center h-72">
          <Image
            src={selectedImage}
            height={250}
            className="w-auto"
            rounded
            fluid
          />
        </div>
        <div className="file-upload flex justify-end ml-5">
          <InputGroup className="mb-3 pr-0">
            <Button
              type="button"
              onClick={handleButtonClick}
              className="custom-upload-button capitalize"
            >
              {label}
            </Button>
            <input
              type="file"
              size="sm"
              name="imagen"
              accept=".jpg,.png,.jpeg"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden-file-input"
            />
            <Form.Control
              className="file-name cursor-pointer"
              size="sm"
              value={fileName}
              readOnly
              onClick={handleButtonClick}
            />
          </InputGroup>
        </div>
      </>
    );

    return (
      <>
        <div className="flex row w-full pl-2 justify-center items-center h-72">
          <Image
            src={selectedImage}
            height={250}
            className="w-auto"
            rounded
            fluid
          />
        </div>
        <Form.Control
          type="file"
          size="sm"
          name="imagen"
          accept=".jpg,.png,.jpeg"
          onChange={handleFileChange}
          className="w-full ml-4 px-2 py-2 border-b-2 text-left text-xs font-semibold text-gray-600 tracking-wider"
        />
      </>
    );
  }

  return (
    <>
      <Row className="flex w-full justify-between items-center">
        <Col md={12} xl={12}>
          <div className="flex w-full pl-2 items-center">
            <Form.Label
              id="Ajuste-text"
              className="w-2/5 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Imagen Referencial
            </Form.Label>
            <Form.Control
              type="file"
              size="sm"
              name="imagen"
              accept=".jpg,.png,.jpeg"
              onChange={handleFileChange}
              className="w-full h-full ml-4 px-2 py-2 border-b-2 text-left text-xs font-semibold text-gray-600 tracking-wider"
            />
          </div>
          {selectedImage && (
            <div
              className="flex row w-full justify-center items-center h-64"
              style={{ paddingLeft: "45px" }}
            >
              <Image
                src={selectedImage}
                height={250}
                className="w-auto"
                rounded
                fluid
              />
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ImagenReferencial;
