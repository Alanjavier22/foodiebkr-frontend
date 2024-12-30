import { useContext } from "react";
import swal from "sweetalert";

import { Button } from "react-bootstrap";
import { CartContext } from "../context/CartContext";

const AddCart = ({ item, total }) => {
  const { setDataCar } = useContext(CartContext);

  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  //GUARDAR EN LOCALSTORAGE
  const addCar = () => {
    const newData = {
      ...item,
      id: generateRandomNumber(1, 1000),
      subtotal: total,
      total,
    };

    let carDetails = JSON.parse(localStorage.getItem("Carrito")) || [];

    carDetails.push(newData);

    localStorage.setItem("Carrito", JSON.stringify(carDetails));

    setDataCar(carDetails);

    swal({
      title: "Agregado al Carrito",
      icon: "success",
      timer: 1600,
      buttons: false,
      className: "left-modal",
    });
  };

  return (
    <>
      <Button
        className="btnStore border-0 ml-4 py-2 w-52 uppercase tracking-wider"
        onClick={addCar}
        disabled={total === 0}
        style={{ fontSize: "14px" }}
      >
        AÑADIR AL CARRITO
      </Button>
    </>
  );
};

export default AddCart;
