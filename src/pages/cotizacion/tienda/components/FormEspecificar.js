import { useState } from "react";

import swal from "sweetalert";

import { Form, Button, InputGroup } from "react-bootstrap";

import { IoIosSave } from "react-icons/io";

const FormEspecificar = ({ handleChange, formData, item }) => {
  const [value, setValue] = useState("");

  const updateField = (name) => {
    handleChange({
      target: { name: name + "_", value },
    });
    setValue("");

    swal({
      text: `Campo "${name}" Actualizado`,
      icon: "success",
      timer: 1600,
      buttons: false,
      className: "left-modal",
    });
  };

  return (
    <>
      <div className="flex w-full pl-3 items-center">
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            size="sm"
            placeholder="Especificar"
            defaultValue={formData[item.nombre + "_"]}
            onChange={({ target }) => setValue(target.value)}
            className="w-full h-full ml-4 px-2 py-2 border-b-2 text-left text-xs font-semibold text-gray-600 tracking-wider"
          />
          <Button
            className="btnStore bg-slate-400 px-3 py-2 border-0"
            size="sm"
            onClick={() => updateField(item.nombre)}
          >
            <IoIosSave />
          </Button>
        </InputGroup>
      </div>
    </>
  );
};
export default FormEspecificar;
