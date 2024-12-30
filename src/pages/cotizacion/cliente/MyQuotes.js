import { useEffect, useState, useCallback } from "react";

import { Row, Form } from "react-bootstrap";

import CotizacionTabla from "../sistema/components/CotizacionTabla";
import { FormSelect } from "../../../components/FormContent";
import { getMethod } from "../../../fetch/getMethod";

import { FaRegFileImage } from "react-icons/fa";

import "../../../assets/styles/Cotizacion.css";

const MyQuotes = ({ user }) => {
  const [formData, setFormData] = useState({
    id_producto: "-",
    estado: "-",
    envio: "-",
  });

  const [productData, setProductData] = useState(null);

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

  const handleChangeProduct = (event) => {
    resetSelectEnvio();
    resetSelectEstado();

    handleChange(event);
  };

  const fetchProducts = useCallback(() => {
    if (!productData) {
      getMethod({
        path: "/cotizacion/consultar/productos",
        setData: (datos) => {
          const dataSelect = datos.slice(0, 5);
          setProductData(dataSelect);
        },
        setIsLoading: () => {},
        showSwal: false,
      });
    }
  }, [productData]);

  const fetchCotizaciones = useCallback(() => {
    if (formData && formData.id_producto !== "-") {
      let params = `${formData.id_producto}`;

      getMethod({
        path: `/cotizacion/consultar-producto/${params}/0/0/0`,
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
  useEffect(() => fetchCotizaciones(), [fetchCotizaciones, reload]);

  return (
    <>
      <div className="border-0 m-auto p-4" style={{ maxWidth: "90vw" }}>
        <div className="p-2 border-b-2 mb-3">
          <h2 className="text-gray-600 font-semibold">Mis Cotizaciones</h2>
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
        </Row>

        <Form.Label
          className="flex items-center w-full px-4 pb-0 font-semibold text-red-500 uppercase tracking-wider"
          style={{ fontSize: "11px" }}
        >
          *Cuando tu cotización sea atendida, sube tu foto del comprobante de
          pago realizado en la opción del icono
          <span className="ml-2" style={{ fontSize: "20px" }}>
            <FaRegFileImage />
          </span>
        </Form.Label>
        <Form.Label
          className="flex items-center w-full px-4 pb-4 font-semibold text-red-500 uppercase tracking-wider"
          style={{ fontSize: "11px" }}
        >
          *Después de atender su cotización tiene 3 días para subir el
          comprobante
        </Form.Label>

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

export default MyQuotes;
