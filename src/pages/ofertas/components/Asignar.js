import { useState, useEffect, useMemo, useContext } from "react";
import { Button, Row, Col } from "react-bootstrap";

import Tabla from "../../../components/Tabla";
import { getMethod } from "../../../fetch/getMethod";
import { FormSelect } from "../../../components/FormContent";
import { postMethod } from "../../../fetch/postMethod";
import { LoadContext } from "../../../context/LoadContext";

const Asignar = () => {
  const { setLoadSpinner } = useContext(LoadContext);
  const [selectedRows, setSelectedRows] = useState([]);
  const [formData, setFormData] = useState({
    filtrado: "-",
    codigo_descuento: "-",
  });
  const [dataTabla, setDataTabla] = useState({
    noData: formData.filtrado !== "-",
    textNoData: "Selecciona una opción de filtrado",
  });
  const [data, setData] = useState(null);
  const [dataCode, setDataCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [carga, setCarga] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setIsLoading(true);
    setDataCode(null);
    getMethod({
      path: `/oferta/registradas/`,
      setData: (datos) => {
        setDataCode(datos);
        if (datos.length === 0) {
          setDataTabla({
            noData: false,
            textNoData: "No se encontraron código de descuento",
            isLoading: true,
          });
        }
      },
      setIsLoading,
    });
  }, []);

  useEffect(() => {
    if (formData.filtrado === "-") {
      getMethod({
        path: `/oferta/consultar/clientes/`,
        setData: (datos) => {
          setCarga(datos);
          setDataTabla({
            noData: false,
            textNoData: "Selecciona una opción de filtrado",
            isLoading: true,
          });
        },
        setIsLoading,
        showSwal: false,
      });
    } else {
      setData(null);
      setDataTabla({
        noData: true,
      });

      if (formData.filtrado === "compra") {
        setData(carga.comproMas);
      } else {
        setData(carga.ultimosRegistrados);
      }
      setSelectedRows([]);
    }
  }, [formData.filtrado]);

  const columns = useMemo(() => {
    const baseColumns = [
      { field: "check", header: "" },
      {
        field: "nombre_completo",
        header: "Nombre del cliente",
        align: "start",
      },
      { field: "telefono", header: "Teléfono" },
      { field: "email", header: "Correo", align: "start" },
    ];

    if (formData.filtrado === "compra") {
      return [
        ...baseColumns,
        { field: "precio_estimado", header: "Total Gastado" },
      ];
    } else if (formData.filtrado !== "-") {
      return [...baseColumns, { field: "fecha", header: "Fecha" }];
    }

    return baseColumns;
  }, [formData.filtrado]);

  const sendData = () => {
    setLoadSpinner(true);

    const values = {
      selectedRows,
      codigo_descuento: formData["codigo_descuento"],
    };

    postMethod({
      path: "/oferta/enviar-codigo-descuento",
      data: {
        formData: values,
        title: "Código de descuento enviado",
      },
      showBtn: true,
      reload: () => setSelectedRows([]),
      setIsLoading: setLoadSpinner,
    });
  };

  return (
    <div className="py-4" style={{ minHeight: "40vh" }}>
      <Row className="flex w-full justify-between items-center pb-3">
        <FormSelect
          label="Tipo de cliente"
          name="filtrado"
          handleChange={handleChange}
          value={formData.filtrado}
        >
          <option value="compra">Mayores compradores</option>
          <option value="registro">Últimos registrados</option>
        </FormSelect>
        <FormSelect
          label="Código descuento"
          name="codigo_descuento"
          handleChange={handleChange}
          value={formData.codigo_descuento}
          disabled={!dataCode}
        >
          {dataCode &&
            dataCode.map(({ id_oferta, codigo_descuento }) => (
              <option key={id_oferta} value={codigo_descuento}>
                {codigo_descuento}
              </option>
            ))}
        </FormSelect>
      </Row>

      <Row className="flex w-full justify-between items-center mb-3">
        <Col md={12} xl={6}></Col>
        <Col md={12} xl={6} className="flex justify-end">
          <Button
            className="btnStore bg-slate-400 h-10 ml-3 px-4 py-0 border-0 rounded-3 tracking-wider"
            style={{ minWidth: "250px" }}
            onClick={sendData}
            disabled={
              formData.codigo_descuento === "-" || selectedRows.length === 0
            }
          >
            Enviar código
          </Button>
        </Col>
      </Row>

      <Tabla
        rows={data}
        columns={columns}
        showTotal={true}
        selected={{ enabled: true, selectedRows, setSelectedRows }}
        title="Ofertas"
        loading={{
          isLoading,
          ...dataTabla,
        }}
      />
    </div>
  );
};

export default Asignar;
