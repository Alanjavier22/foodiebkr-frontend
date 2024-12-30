import { getMethod } from "./getMethod";

const fetchCotizacionData = async ({
  id_producto,
  producto,
  updateDataCategoria,
  updateDataAdicional,
  setIsLoading
}) => {
  const fetchCategoria = getMethod({
    path: `/cotizacion/categoria/${id_producto}/${producto}`,
    setData: updateDataCategoria,
    setIsLoading,
    showSwal: false,
  });

  const fetchAdicional = getMethod({
    path: `/cotizacion/adicional/${id_producto}/${producto}`,
    setData: updateDataAdicional,
    setIsLoading,
    showSwal: false,
  });

  await Promise.all([fetchCategoria, fetchAdicional]);
};

export default fetchCotizacionData;
