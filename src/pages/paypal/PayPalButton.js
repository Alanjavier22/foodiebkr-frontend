import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import swal from "sweetalert";

const initialOptions = {
  clientId: process.env.REACT_APP_CLIENTE_ID,
};

const PayPalButton = ({ datosCliente }) => {
  const { setDataCar } = useContext(CartContext);
  const navigate = useNavigate();

  const createOrder = async () => {
    try {
      const cartDetails = JSON.parse(localStorage.getItem("Carrito") || null);
      const dataCar = JSON.parse(localStorage.getItem("descuento") || {});

      const response = await fetch(
        `${process.env.REACT_APP_URL_API}/paypal/create-paypal-order`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cartDetails, dataCar }),
        }
      );

      const { datos: orderData } = await response.json();
      return orderData.id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const onApprove = async (data) => {
    const codigo_descuento = JSON.parse(localStorage.getItem("codigo")) || {
      codigo: null,
    };

    const response = await fetch(
      `${process.env.REACT_APP_URL_API}/paypal/capture-paypal-order`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, datosCliente, codigo_descuento }),
      }
    );

    const { error, mensaje } = await response.json();

    swal({
      title: "Pago realizado con paypal",
      text: mensaje,
      icon: error ? "error" : "success",
      buttons: {
        confirm: {
          text: "OK",
          value: true,
          visible: true,
          className: "",
          closeModal: true,
        },
      },
    }).then(() => {
      setDataCar([]);
      localStorage.removeItem("Carrito");
      localStorage.removeItem("codigo");
      navigate(`/carrito`);
    });
  };

  return (
    <>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={(err) => console.error(err)}
        />
      </PayPalScriptProvider>
    </>
  );
};

export default PayPalButton;
