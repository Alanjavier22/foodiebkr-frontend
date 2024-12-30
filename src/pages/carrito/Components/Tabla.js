import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { CartContext } from "../../../context/CartContext";

import { Button, Table, Card, Form } from "react-bootstrap";
import { TiDelete } from "react-icons/ti";

import CodigoDescuento from "./CodigoDescuento";

const Tabla = ({ data, user }) => {
  const [rows, setRows] = useState(data);

  const { setDataCar } = useContext(CartContext);
  const navigate = useNavigate();

  const updateLocalStorage = (updatedRows) => {
    let { descuento } = JSON.parse(localStorage.getItem("descuento")) || {
      descuento: 0,
    };

    setRows(updatedRows);
    setDataCar(updatedRows, descuento);

    if (updatedRows.length !== 0) {
      localStorage.setItem("Carrito", JSON.stringify(updatedRows));

      swal({
        text: "Carrito actualizado",
        icon: "success",
        timer: 1600,
        buttons: false,
        className: "left-modal",
      });
    } else {
      localStorage.removeItem("Carrito");
      navigate(`/carrito`);
    }
  };

  const deleteItem = (item) => {
    const updatedRows = rows.filter((row) => row.id !== item.id);
    updateLocalStorage(updatedRows);
  };

  const recalcute = () => {
    const updatedRows = rows.map((row) => {
      return {
        ...row,
        subtotal: Number(row.cantidad) * parseFloat(row.valor),
        total: Number(row.cantidad) * parseFloat(row.valor),
      };
    });
    updateLocalStorage(updatedRows);
  };

  //FUNCION PARA TOMAR VALORES SELECCIONADOS
  const handleChange = ({ value }, item) => {
    if (value.match(/^\d*$/) && value.length <= 3) {
      setRows((prevRows) => {
        const updatedRows = prevRows.map((row) => {
          if (row.id === item.id) {
            return { ...row, cantidad: value };
          }
          return row;
        });
        return updatedRows;
      });
    }
  };

  const handleBlur = ({ value }, item) => {
    if (value === "") {
      setRows((prevRows) => {
        const updatedRows = prevRows.map((row) => {
          if (row.id === item.id) {
            return { ...row, cantidad: row.subtotal / row.valor };
          }
          return row;
        });
        return updatedRows;
      });
    }
  };

  return (
    <div
      className="border-0 m-auto pt-1 w-full px-4"
      style={{ minHeight: "20vh" }}
    >
      <Card
        className="w-full flex justify-between border-0"
        style={{ maxHeight: "55vh", overflowY: "auto" }}
      >
        <Table responsive="md" className="h-100">
          <thead>
            <tr>
              <th></th>
              <th className="px-5 py-3 w-2/3 border-b-2 textDetalles border-gray-200 bg-gray-100  text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
                PRODUCTO
              </th>
              <th className="px-5 py-3 w-2/3 border-b-2 textDetalles border-gray-200 bg-gray-100  text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
                PRECIO (sin iva)
              </th>
              <th className="px-5 py-3 border-b-2 textDetalles border-gray-200 bg-gray-100  text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
                CANTIDAD
              </th>
              <th className="px-5 py-3 border-b-2 textDetalles border-gray-200 bg-gray-100  text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
                SUBTOTAL
              </th>
            </tr>
          </thead>
          <tbody>
            {rows &&
              rows.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className="d-flex align-items-center h-100 justify-content-center fs-3">
                        <TiDelete
                          onClick={() => deleteItem(item)}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center">
                        <img
                          src={item?.imagen || "./logo.png"}
                          width={100}
                          alt={item?.nombre}
                          className="pr-3"
                        />
                        <p className="m-0 capitalize font-semibold text-gray-600 tracking-wider">
                          {item?.nombre}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center h-full justify-center font-semibold text-gray-600 tracking-wider">
                        ${item?.valor}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center w-full h-full justify-center font-semibold text-gray-600 tracking-wider">
                        <Form.Control
                          style={{ width: "74px" }}
                          name="cantidad"
                          value={item.cantidad}
                          maxLength={3}
                          onChange={({ target }) => handleChange(target, item)}
                          onBlur={({ target }) => handleBlur(target, item)}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center h-full justify-center font-semibold text-gray-600 tracking-wider">
                        ${item?.total}
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Card>

      <div className="flex justify-between">
        {user.login && <CodigoDescuento updatedRows={rows} />}
        <div />
        <Button
          className="btnStore border-0 fs-6 w-72 uppercase tracking-wider"
          onClick={recalcute}
        >
          ACTUALIZAR CARRITO
        </Button>
      </div>
    </div>
  );
};

export default Tabla;
