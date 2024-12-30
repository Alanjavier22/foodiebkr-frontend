import { useContext, useState } from "react";

import { Button, Form, InputGroup } from "react-bootstrap";
import { getMethod } from "../../../fetch/getMethod";
import { CartContext } from "../../../context/CartContext";

const CodigoDescuento = ({ updatedRows }) => {
  const { setDataCar } = useContext(CartContext);

  let { codigo: codigoApl } = JSON.parse(localStorage.getItem("codigo")) || {
    codigoApl: "",
  };

  const [codigo, setCodigo] = useState(codigoApl);

  const consultarDesc = () => {
    getMethod({
      path: `/oferta/descuento/${codigo}`,
      setData: (datos) => {
        if (!datos) {
          setCodigo("");
          localStorage.removeItem("codigo");
        }
        if (datos) {
          localStorage.setItem(
            "codigo",
            JSON.stringify({ codigo, descuento: datos })
          );
        }
        setDataCar(updatedRows, datos);
      },
      setIsLoading: () => {},
      showSwal: true,
    });
  };

  return (
    <>
      <InputGroup style={{ width: "370px" }}>
        <Form.Control
          type="text"
          size="sm"
          placeholder="codigo de descuento"
          value={codigo}
          onChange={({ target }) => setCodigo(target.value)}
          className="w-full h-full ml-4 px-2 py-2 border-b-2 text-left text-xs font-semibold text-gray-600 tracking-wider"
        />
        <Button
          className="btnStore bg-slate-400 px-3 py-2 border-0"
          size="sm"
          onClick={consultarDesc}
        >
          Aplicar codigo
        </Button>
      </InputGroup>
    </>
  );
};

export default CodigoDescuento;
