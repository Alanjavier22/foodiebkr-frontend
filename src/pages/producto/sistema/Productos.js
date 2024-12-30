import { useEffect, useState } from "react";

import { Row, Col, Button } from "react-bootstrap";

import Tabla from "../../../components/Tabla";
import ContentCategoria from "./content/ContentCategoria";

import {
  FormProduct,
  FormSearch,
  FormSubProduct,
} from "../components/FormData";
import { getMethod } from "../../../fetch/getMethod";

const column = [
  { field: "nombre_producto", header: "Categoria" },
  { field: "nombre_subproducto", header: "Subcategoria" },
  { field: "nombre", header: "Nombre" },
  { field: "imagen", header: "Imagen" },
  { field: "valorStr", header: "Precio" },
  { field: "-", header: "Detalles" },
];

const Productos = () => {
  const [formData, setFormData] = useState({
    producto: "-",
    subproducto: "-",
  });

  const [dataTabla, setDataTabla] = useState({
    noData: formData["producto"] !== "-",
    textNoData: "Seleccione el producto para poder visualizar los datos",
  });

  //Datos para modal
  const [showEdit, setShowEdit] = useState(false);
  const [DataR, setDataR] = useState(null);

  //Fetch
  const [data, setData] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);

  //Recargar consulta
  const [reload, setReload] = useState(false);

  const LoadingTable = () => {
    setData(null);
    setDataTabla({ noData: true });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    LoadingTable();

    setFormData((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }));
  };

  useEffect(() => {
    setIsLoading(true);

    if (formData["producto"] !== "-") {
      setData(null);
      getMethod({
        path: `/producto/consultar/categoria/${formData["producto"]}/${formData["subproducto"]}/all`,
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
    } else {
      setDataTabla({
        noData: false,
        textNoData: "Seleccione el producto para poder visualizar los datos",
        isLoading: true,
      });
    }
  }, [formData, reload]);

  const editData = (item) => {
    setDataR(item);
    setShowEdit(true);
  };

  const createData = () => {
    setDataR({});
    setShowEdit(true);
  };

  return (
    <>
      <div className="border-0 m-auto p-4" style={{ maxWidth: "90vw" }}>
        <div className="p-2 border-b-2 mb-3">
          <h2 className="text-gray-600 font-semibold">Listado de productos</h2>
          <span className="text-xs uppercase">
            Listado de todo los productos en el inventario
          </span>
        </div>

        <FormProduct formData={formData} handleChange={handleChange} />

        {formData["producto"] !== "-" && (
          <FormSubProduct
            formData={formData}
            handleChange={handleChange}
            isLoading={IsLoading}
          />
        )}

        <div className="mt-4 mb-2 border-t-2" />

        <Tabla
          rows={data}
          columns={column}
          editar={editData}
          showTotal={true}
          title="Producto"
          loading={{
            isLoading: IsLoading,
            ...dataTabla,
          }}
        >
          <Row className="items-baseline mb-2">
            <Col md={8} xl={7}>
              <FormSearch
                setData={setData}
                formData={formData}
                setDataTabla={setDataTabla}
              />
            </Col>
            <Col md={4} xl={5} className="pt-2">
              <div className="flex justify-end">
                <Button
                  className="btnStore border-0 rounded-3 mb-3 text-white font-semibold capitalize tracking-wide"
                  style={{ width: "200px" }}
                  disabled={
                    formData["producto"] === "-" ||
                    formData["subproducto"] === "-"
                  }
                  onClick={createData}
                >
                  Agregar Producto
                </Button>
              </div>
            </Col>
          </Row>
        </Tabla>

        {showEdit && (
          <ContentCategoria
            show={showEdit}
            onHide={() => setShowEdit(false)}
            item={DataR}
            reload={() => setReload((current) => !current)}
            id_producto={formData["producto"]}
            id_subproducto={formData["subproducto"]}
          />
        )}
      </div>
    </>
  );
};

export default Productos;
