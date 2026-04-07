import { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Tabla from "../../../components/Tabla";
import ModalInventario from "./content/ModalInventario";
import { FormProduct, FormSubProduct } from "../components/FormData";
import { getMethod } from "../../../fetch/getMethod";
import { motion } from "framer-motion";

const column = [
  { field: "nombre_producto", header: "Categoría" },
  { field: "nombre_subproducto", header: "Subcategoría" },
  { field: "nombre", header: "Nombre" },
  { field: "imagen", header: "Imagen" },
  { field: "stock", header: "Stock" },
  { field: "valorStr", header: "Precio" },
  { field: "-", header: "Detalles" },
];

const SistemaInventario = () => {
  const [formData, setFormData] = useState({
    producto: "-",
    subproducto: "-",
    inventario: "-",
  });

  const [dataTabla, setDataTabla] = useState({
    noData: formData["producto"] !== "-",
    textNoData: "Seleccione el producto para poder visualizar los datos",
  });

  const [showEdit, setShowEdit] = useState(false);
  const [DataR, setDataR] = useState(null);

  const [data, setData] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);

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
        path: `/inventario/consultar/inventario/${formData["producto"]}/${formData["subproducto"]}/all`,
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
    <div className="min-h-screen bg-[#f9fbfc] pt-10 pb-20 relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-100/50 to-blue-100/30 rounded-full blur-[100px] -z-10 mix-blend-multiply opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-100/40 rounded-full blur-[100px] -z-10 mix-blend-multiply opacity-50"></div>

      <div className="max-w-[90vw] mx-auto px-4 lg:px-8 relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-2">
             <div className="w-12 h-12 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
             </div>
             <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Gestor de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Inventario</span></h1>
          </div>
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-[4rem]">Actualización e Ingreso de Productos Físicos</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-[2rem] p-6 lg:p-8 xl:p-10 relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full blur-2xl"></div>

          {/* Filters Area */}
          <div className="relative z-10 flex flex-col md:flex-row gap-6 bg-gray-50/50 p-6 rounded-2xl border border-gray-100 mb-8 items-center justify-start">
             <div className="w-full md:w-1/3">
                 <FormProduct formData={formData} handleChange={handleChange} />
             </div>
             
             {formData["producto"] !== "-" && (
               <div className="w-full md:w-1/3">
                 <FormSubProduct
                   formData={formData}
                   handleChange={handleChange}
                   isLoading={IsLoading}
                 />
               </div>
             )}
          </div>

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
             <div className="flex justify-end pt-4 pb-2 w-full">
                <button
                  className={`px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-lg ${formData["producto"] === "-" || formData["subproducto"] === "-" ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none" : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:-translate-y-1 hover:shadow-cyan-500/30"}`}
                  disabled={
                    formData["producto"] === "-" ||
                    formData["subproducto"] === "-"
                  }
                  onClick={createData}
                >
                  + Agregar Inventario
                </button>
             </div>
          </Tabla>
        </motion.div>

        {showEdit && (
          <ModalInventario
            show={showEdit}
            onHide={() => setShowEdit(false)}
            item={DataR}
            reload={() => setReload((current) => !current)}
            id_producto={formData["producto"]}
            id_subproducto={formData["subproducto"]}
          />
        )}
      </div>
    </div>
  );
};

export default SistemaInventario;
