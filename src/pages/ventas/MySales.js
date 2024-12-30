import { useEffect, useState, useCallback } from "react";

import { Row, Col } from "react-bootstrap";

import VentasTabla from "./cliente/components/VentasTabla";
import { FormControl, FormSelect } from "../../components/FormContent";

import { getMethod } from "../../fetch/getMethod";

import "../../assets/styles/Cotizacion.css";
import dateCurrent from "../../utils/DateCurrent";

const MySales = ({ user }) => {
  const isAdmin = Number(user.id_rol) === 1;

  const [data, setData] = useState(null);
  const [IsLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const [formData, setFormData] = useState({
    estado: "-",
    fechaInicio: null,
    fechaFin: null,
  });

  const [dataTabla, setDataTabla] = useState({
    noData: true,
    textNoData: "No datos",
  });

  const LoadingTable = () => {
    setData(null);
    setDataTabla({ noData: true });
  };

  const fetchVentas = useCallback((formData) => {
    LoadingTable();
    getMethod({
      path: `/ventas/consultar/Tienda/${formData.estado}/${
        formData.fechaInicio || "-"
      }/${formData.fechaFin || "-"}`,
      setData: (datos) => {
        if (datos.length === 0) {
          setDataTabla({
            noData: false,
            textNoData: "No se encontraron resultados para la búsqueda",
            isLoading: true,
          });
        }

        setData(datos);
      },
      setIsLoading,
    });
  }, []);

  useEffect(() => fetchVentas(formData), [fetchVentas, reload]);

  useEffect(() => {
    if (!formData.fechaInicio) {
      handleChange({
        target: { name: "fechaFin", value: dateCurrent() },
      });
    }
  }, [formData.fechaInicio]);

  const handleChange = (e) => {
    setReload((current) => !current);

    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const resetSelectEstado = () =>
    handleChange({ target: { name: "estado", value: "-" } });

  return (
    <>
      <div className="border-0 m-auto p-4" style={{ maxWidth: "90vw" }}>
        <div className="p-2 border-b-2 mb-3">
          <h2 className="text-gray-600 font-semibold">
            Mis {isAdmin ? "Ventas" : "Compras"}
          </h2>
          <span className="text-xs uppercase">
            Listado de todas las {isAdmin ? "ventas" : "compras"} realizadas
          </span>
        </div>

        <Row className="flex w-full justify-between items-center">
          <FormSelect
            label="Estado"
            name="estado"
            handleChange={handleChange}
            value={formData.estado}
            resetData={resetSelectEstado}
            requerido={false}
          >
            <option value="PENDING REVIEW">PENDING REVIEW</option>
            <option value="COMPLETED">COMPLETED</option>
          </FormSelect>
        </Row>

        <Row className="flex w-full justify-between items-center">
          <Col md={12} xl={6}>
            <FormControl
              label="fecha inicio"
              type="date"
              max={dateCurrent()}
              name="fechaInicio"
              value={formData?.fechaInicio}
              handleChange={handleChange}
              directionColumn={true}
            />
          </Col>

          <Col md={12} xl={6}>
            <FormControl
              label="fecha fin"
              type="date"
              max={dateCurrent()}
              min={formData.fechaInicio}
              name="fechaFin"
              value={formData?.fechaFin}
              handleChange={handleChange}
              disabled={!formData.fechaInicio || formData.fechaInicio === "-"}
              directionColumn={true}
            />
          </Col>
        </Row>

        <VentasTabla
          isAdmin={isAdmin}
          data={data}
          formData={formData}
          realizado_por="Tienda"
          loading={{
            isLoading: IsLoading,
            ...dataTabla,
          }}
          loadingTable={LoadingTable}
          reload={() => setReload((current) => !current)}
        />
      </div>
    </>
  );
};

export default MySales;
