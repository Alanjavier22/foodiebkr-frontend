import { useCallback } from "react";

import { MdOutlineUpdate } from "react-icons/md";

import { getMethod } from "../../../../fetch/getMethod";

const Actualizar = ({ realizado_por, data, reload, loadingTable }) => {
  const actualizarDatos = useCallback(() => {
    loadingTable();
    getMethod({
      path: `/ventas/actualizar-estado/`,
      setData: () => {},
      setIsLoading: () => {
        reload();
      },
      showSwal: false,
    });
  }, []);

  return (
    <>
      <div className="flex w-full">
        {realizado_por === "Tienda" && data.length !== 0 && (
          <button
            className="btnStore bg-slate-400 px-3 mx-1 my-1 py-2 border-0 rounded-3"
            style={{ width: "200px" }}
            onClick={actualizarDatos}
          >
            <div className="flex justify-between items-center">
              Actualizar Estado
              <MdOutlineUpdate
                style={{ fontSize: "22px", marginLeft: "5px" }}
              />
            </div>
          </button>
        )}
      </div>
    </>
  );
};

export default Actualizar;
