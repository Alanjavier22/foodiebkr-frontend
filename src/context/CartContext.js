import { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [dataCar, setDataCar] = useState({ cantidad: 0, valor: "0.00" });

  const updateDataCart = (cartData, descuento = 0) => {
    const newTotal = cartData
      .reduce((acc, item) => acc + parseFloat(item.total), 0)
      .toFixed(2);

    const totalIva = (newTotal * 0.15).toFixed(2);
    const totalconIva = (Number(totalIva) + Number(newTotal)).toFixed(2);

    const desc = (totalconIva * (descuento / 100)).toFixed(2);
    const subtotalDesc = (totalconIva - desc).toFixed(2);

    const data = {
      valor: newTotal,
      cantidad: cartData.length,
      subtotal: newTotal,
      iva: 15,
      totalIva: totalIva,
      totalconIva,
      descuento: descuento, //10%
      totalDesc: desc,
      subtotalDesc,
      total: Number(subtotalDesc).toFixed(2),
    };

    setDataCar(data);
    localStorage.setItem("descuento", JSON.stringify(data));
  };

  useEffect(() => {
    let carDetails = JSON.parse(localStorage.getItem("Carrito")) || null;
    let { descuento } = JSON.parse(localStorage.getItem("codigo")) || {
      descuento: 0,
    };

    if (carDetails) updateDataCart(carDetails, descuento);
  }, []);

  return (
    <CartContext.Provider
      value={{
        dataCar,
        setDataCar: (carData, descuento) => updateDataCart(carData, descuento),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
