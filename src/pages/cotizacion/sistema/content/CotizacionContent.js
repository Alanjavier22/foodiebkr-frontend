import { useEffect, useState } from "react";

import FormContent from "../components/FormContent";
import FormDatosIniciales from "../components/FormDatosIniciales";

const elementToRemove = {
  0: [
    "id",
    "id_cliente",
    "imagen",
    "producto",
    "cantidad",
    "descripcion",
    "id_producto",
    "estado",
    "envio",
    "precio_final",
    "precio_estimado",
    "atendido_por",
    "fecha_cotizacion",
  ],
  1: [
    "pisos",
    "porciones",
    "descripcion",
    "id_producto",
    "estado",
    "precio_estimado",
    "tematica",
    "cantidad",
    "producto",
    "toppings",
    "fecha_cotizacion",
  ],
};

const filtrarObjeto = (item, adicional) => {
  return adicional.reduce((acc, clave) => {
    const _clave = item[clave] ? clave : clave.toLowerCase();

    if (item[_clave] !== undefined) {
      acc[_clave] = item[_clave];
    }
    return acc;
  }, {});
};

const CotizacionContent = ({
  children,
  item,
  adicional,
  showValor = false,
}) => {
  const [adicionales, setAdiconales] = useState([]);

  useEffect(() => {
    const elementsToRemove =
      elementToRemove[Number(item?.id_producto)] || elementToRemove[0];

    const elements = adicional.length === 0 ? Object.keys(item) : adicional;

    const filteredArray = elements.filter(
      (item) => !elementsToRemove.includes(item)
    );

    const objetoFiltrado = filtrarObjeto(item, filteredArray);

    setAdiconales(objetoFiltrado);
  }, []);

  return (
    <>
      <FormDatosIniciales item={item} showValor={showValor}>
        {children}
        {adicionales && adicionales.length !== 0 && (
          <FormContent elementos={adicionales} />
        )}
      </FormDatosIniciales>
    </>
  );
};

export default CotizacionContent;
