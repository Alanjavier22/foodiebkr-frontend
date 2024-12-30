import { useEffect, useState, useContext } from "react";

import Tabla from "../../../../components/Tabla";
import Detalles from "./Detalles";
import DetallesCt from "../../../cotizacion/sistema/content/Detalles";
import Actualizar from "./Actualizar";
import descargarPdf from "../../../../utils/descargarPdf";
import dateCurrent from "../../../../utils/DateCurrent";
import { postMethod } from "../../../../fetch/postMethod";
import { LoadContext } from "../../../../context/LoadContext";

import "../../../../assets/styles/Cotizacion.css";

const COLUMN_TABLA = {
  Cotizacion: [
    { field: "index", header: "Número" },
    { field: "descripcion_compra", header: "Descripción", width: "320px" },
    { field: "nombre_producto", header: "Producto" },
    { field: "id_cotizacion", header: "Num Cotización", width: "207px" },
    { field: "valor", header: "Valor" },
    { field: "estado", header: "Estado" },
    { field: "fechaStr", header: "fecha" },
    { field: "-", header: "Detalles" },
  ],
  Tienda: [
    { field: "index", header: "Número" },
    { field: "descripcion_compra", header: "Descripción", width: "320px" },
    { field: "valor", header: "Valor" },
    { field: "estado", header: "Estado" },
    { field: "fechaStr", header: "fecha" },
    { field: "-", header: "Detalles" },
  ],
};

const VentasTabla = ({
  isAdmin,
  data,
  formData,
  realizado_por,
  loading,
  reload,
  loadingTable,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [modalShowCt, setModalShowCt] = useState(false);
  const [dataItem, setDataItem] = useState(null);
  const [column, setColumn] = useState(COLUMN_TABLA[realizado_por]);

  const { setLoadSpinner } = useContext(LoadContext);

  useEffect(() => {
    let _column = COLUMN_TABLA[realizado_por];
    setColumn(_column);
  }, [realizado_por]);

  const mostrarDetalles = (item) => {
    if (realizado_por === "Cotizacion") {
      setDataItem({
        items: item,
        id_cotizacion: item.id_cotizacion,
        fecha: item.fechaStr,
      });
      setModalShowCt(true);
    } else {
      setDataItem({
        items: item.items,
        datosTotales: item.datosTotales,
        fecha: item.fecha,
        cliente: item.datosCliente,
      });
      setModalShow(true);
    }
  };

  const onHide = () => setModalShow(false);
  const onHideCt = () => setModalShowCt(false);

  const generarPdf = () => {
    setLoadSpinner(true);

    const toPdf = data.map((item) => {
      return {
        descripcion: item.descripcion_compra,
        valor: item.valor,
        estado: item.estado,
        fecha: item.fechaStr,
      };
    });

    const estado = formData.estado === "-" ? "TODOS" : formData.estado;
    let inicio = formData.fechaInicio ?? dateCurrent();
    let fin = formData.fechaFin ?? dateCurrent();

    if (!formData.fechaInicio) {
      inicio = toPdf[toPdf.length - 1].fecha;
    }

    if (!formData.fechaFin) {
      fin = toPdf[0].fecha;
    }

    postMethod({
      path: "/generarPdf/",
      data: {
        formData: {
          datos: {
            datos: toPdf,
            titulo: isAdmin ? "RESUMEN DE VENTAS" : "RESUMEN DE COMPRAS",
            estado,
            fechas: { inicio, fin },
          },
          opc: "reporte_ventas",
        },
        title: "PDF reporte",
      },
      showBtn: false,
      callbck: (base64) => {
        descargarPdf(base64, "Reporte_ventas");
      },
      setIsLoading: setLoadSpinner,
    });
  };

  return (
    <>
      <Tabla
        rows={data}
        columns={column}
        title={isAdmin ? "Ventas" : "Compras"}
        actionBtn={
          <>
            {data && isAdmin && (
              <Actualizar
                realizado_por={realizado_por}
                reload={reload}
                data={data}
                loadingTable={loadingTable}
              />
            )}
            {data && !isAdmin && <div className="w-40" />}
          </>
        }
        generarPdf={data && generarPdf}
        detalles={mostrarDetalles}
        showTotal={true}
        loading={loading}
      ></Tabla>

      {modalShow && (
        <Detalles show={modalShow} onHide={onHide} item={dataItem} />
      )}

      {modalShowCt && (
        <DetallesCt
          show={modalShowCt}
          onHide={onHideCt}
          id={dataItem.id_cotizacion}
          required={false}
          user={{ id_rol: 4 }}
          reload={reload}
        />
      )}
    </>
  );
};

export default VentasTabla;
