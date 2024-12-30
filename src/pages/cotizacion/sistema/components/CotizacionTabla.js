import { useEffect, useState } from "react";

import Tabla from "../../../../components/Tabla";
import Detalles from "../content/Detalles";
import SubirComprobante from "../../cliente/components/SubirComprobante";

import "../../../../assets/styles/Cotizacion.css";

const COLUMN_TABLA = {
  1: [
    { field: "index", header: "Número" },
    { field: "producto", header: "Producto" },
    { field: "cantidad", header: "Cantidad" },
    { field: "pisos", header: "Pisos" },
    { field: "precio_estimado", header: "Valor Estimado" },
    { field: "atendido_por", header: "Atendido por" },
    { field: "-", header: "Detalles" },
  ],
  2: [
    { field: "index", header: "Número" },
    { field: "producto", header: "Producto" },
    { field: "estado", header: "Estado" },
    { field: "atendido_por", header: "Atendido por" },
    { field: "-", header: "Detalles" },
  ],
  3: [
    { field: "index", header: "Número" },
    { field: "producto", header: "Producto" },
    { field: "estado", header: "Estado" },
    { field: "atendido_por", header: "Atendido por" },
    { field: "-", header: "Detalles" },
  ],
  4: [
    { field: "index", header: "Número" },
    { field: "producto", header: "Producto" },
    { field: "estado", header: "Estado" },
    { field: "atendido_por", header: "Atendido por" },
    { field: "-", header: "Detalles" },
  ],
  5: [
    { field: "index", header: "Número" },
    { field: "producto", header: "Producto" },
    { field: "precio_estimado", header: "Valor Estimado" },
    { field: "estado", header: "Estado" },
    { field: "atendido_por", header: "Atendido por" },
    { field: "-", header: "Detalles" },
  ],
};

const CotizacionTabla = ({ user, data, productSelect, loading, reload }) => {
  const [modalShow, setModalShow] = useState(false);
  const [modalImg, setModalImg] = useState(false);
  const [dataItem, setDataItem] = useState(null);
  const [column, setColumn] = useState(COLUMN_TABLA[Number(productSelect)]);

  const isAdmin = Number(user.id_rol) === 1;

  useEffect(() => {
    let _column = COLUMN_TABLA[Number(productSelect)];

    if (!isAdmin) {
      _column = _column.filter((item) => item.field !== "atendido_por");
    }

    setColumn(_column);
  }, [productSelect]);

  const mostrarDetalles = (item) => {
    setDataItem(item);
    setModalShow(true);
  };

  const subirComprobante = (item) => {
    setDataItem(item);
    setModalImg(true);
  };

  const onHide = () => setModalShow(false);
  const onHideImg = () => setModalImg(false);

  return (
    <>
      <Tabla
        rows={data}
        columns={column}
        detalles={mostrarDetalles}
        foto={Number(user.id_rol) !== 4 ? null : subirComprobante}
        showTotal={true}
        loading={loading}
      />

      {modalShow && (
        <Detalles
          show={modalShow}
          onHide={onHide}
          id={dataItem.id_cotizacion}
          required={isAdmin}
          user={user}
          reload={reload}
        />
      )}

      {modalImg && (
        <SubirComprobante
          show={modalImg}
          onHide={onHideImg}
          item={dataItem}
          reload={reload}
        />
      )}
    </>
  );
};

export default CotizacionTabla;
