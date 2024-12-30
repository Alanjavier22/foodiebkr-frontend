import { useEffect, useState, useCallback } from "react";

import { Row } from "react-bootstrap";

import CotizacionTabla from "./components/CotizacionTabla";
import { FormSelect } from "../../../components/FormContent";

import "../../../assets/styles/Cotizacion.css";
import { getMethod } from "../../../fetch/getMethod";

const Cotizaciones = ({ user }) => {
  const isAdmin = Number(user.id_rol) === 1;

  const [formData, setFormData] = useState({
    id_producto: "-",
    estado: "-",
    envio: "-",
    atendido_por: "-",
  });

  const [productData, setProductData] = useState(null);
  const [empleados, setEmpleados] = useState(null);

  const [data, setData] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const [dataTabla, setDataTabla] = useState({
    noData: formData["id_producto"] !== "-",
    textNoData:
      "Seleccione el producto de la cotización para poder visualizar los datos",
  });

  const LoadingTable = () => {
    setData(null);
    setDataTabla({ noData: true });
  };

  const handleChange = (e) => {
    LoadingTable();

    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const resetSelectEstado = () =>
    handleChange({ target: { name: "estado", value: "-" } });

  const resetSelectEnvio = () =>
    handleChange({ target: { name: "envio", value: "-" } });

  const resetSelectAtendido = () => {
    handleChange({ target: { name: "atendido_por", value: "-" } });
    resetSelectEstado();
  };

  const handleChangeProduct = (event) => {
    resetSelectAtendido();
    resetSelectEnvio();
    resetSelectEstado();

    handleChange(event);
  };

  const handleChangeAtendido = (event) => {
    handleChange({ target: { name: "estado", value: "Atendido" } });
    handleChange(event);
  };

  const fetchProducts = useCallback(() => {
    if (!productData) {
      getMethod({
        path: "/producto/",
        setData: (datos) => {
          const dataSelect = datos.slice(0, 5);
          setProductData(dataSelect);
        },
        setIsLoading: () => {},
        showSwal: false,
      });
    }
  }, [productData]);

  const userEmpleado = useCallback(() => {
    if (!empleados && isAdmin) {
      getMethod({
        path: "/usuario/empleados",
        setData: setEmpleados,
        setIsLoading: () => {},
        showSwal: false,
      });
    }
  }, [empleados]);

  const fetchCotizaciones = useCallback(() => {
    if (formData && formData.id_producto !== "-") {
      let params = `${formData.id_producto}`;
      params += formData.estado !== "-" ? `/${formData.estado}` : `/0`;
      params += formData.envio !== "-" ? `/${formData.envio}` : `/0`;
      params +=
        formData.atendido_por !== "-" && formData.atendido_por
          ? `/${formData.atendido_por}`
          : `/0`;

      getMethod({
        path: `/cotizacion/consultar-producto/${params}`,
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
    }
  }, [formData]);

  useEffect(() => fetchProducts(), [fetchProducts]);
  useEffect(() => userEmpleado(), [userEmpleado]);
  useEffect(() => fetchCotizaciones(), [fetchCotizaciones, reload]);

  return (
    <>
      <div className="border-0 m-auto p-4" style={{ maxWidth: "90vw" }}>
        <div className="p-2 border-b-2 mb-3">
          <h2 className="text-gray-600 font-semibold">Cotizaciones</h2>
          <span className="text-xs uppercase">
            Listado de todas las cotizaciones realizadas
          </span>
        </div>

        <Row className="flex w-full justify-between items-center pb-3">
          <FormSelect
            label="Producto Cotizado"
            name="id_producto"
            handleChange={handleChangeProduct}
            value={formData["id_producto"]}
            disabled={!productData}
          >
            {productData &&
              productData.map(({ id_producto, nombre }) => {
                const _nombre = nombre.split(" ")[0];
                return (
                  <option key={id_producto} value={id_producto}>
                    {_nombre}
                  </option>
                );
              })}
          </FormSelect>
          {isAdmin && (
            <FormSelect
              label="Atendido por"
              name="atendido_por"
              handleChange={handleChangeAtendido}
              value={formData["atendido_por"]}
              disabled={!empleados}
              resetData={resetSelectAtendido}
              requerido={false}
            >
              {empleados &&
                empleados.map(({ id_usuario, nombre, codigo_empleado }) => {
                  const _nombre = `#${codigo_empleado} - ${nombre}`;
                  return (
                    <option key={id_usuario} value={nombre}>
                      {_nombre}
                    </option>
                  );
                })}
            </FormSelect>
          )}
        </Row>

        <Row className="flex w-full justify-between items-center pb-3">
          <FormSelect
            label="Estado de la Cotización"
            name="estado"
            handleChange={handleChange}
            value={formData["estado"]}
            disabled={
              isAdmin
                ? formData["atendido_por"] !== "-" ||
                  formData["id_producto"] === "-"
                : formData["id_producto"] === "-"
            }
            resetData={
              formData["atendido_por"] === "-" ? resetSelectEstado : null
            }
            requerido={false}
          >
            <option value="Atendido">Atendido</option>
            <option value="No Atendido">No Atendido</option>
          </FormSelect>
          <FormSelect
            label="Estado del envio"
            name="envio"
            handleChange={handleChange}
            value={formData["envio"]}
            disabled={
              formData["id_producto"] === "-" ||
              formData["estado"] === "No Atendido"
            }
            resetData={resetSelectEnvio}
            requerido={false}
          >
            <option value="Aceptado">Aceptado</option>
            <option value="Rechazado">Rechazado</option>
          </FormSelect>
        </Row>

        <CotizacionTabla
          user={user}
          data={data}
          productSelect={
            formData["id_producto"] !== "-" ? formData["id_producto"] : 1
          }
          loading={{
            isLoading: IsLoading,
            ...dataTabla,
          }}
          reload={() => setReload((current) => !current)}
        />
      </div>
    </>
  );
};

export default Cotizaciones;
