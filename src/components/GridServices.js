import { useNavigate } from "react-router-dom";

const GridServices = ({
  producto,
  categoria,
  subCategoria,
  detalle,
  title,
}) => {
  const navigate = useNavigate();

  const seccion = localStorage.getItem("seccion");

  const {
    id_producto,
    id_subproducto,
    id_categoria,
    id_inventario,
    nombre,
    imagen = "NoImage",
  } = producto;

  const viewPage = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const _seccion = seccion === "inventario" ? seccion : "categoria";

    if (subCategoria) {
      navigate(
        `/${_seccion}-producto/${id_producto}/${categoria}/${id_subproducto}/${nombre}`
      );
    } else if (detalle) {
      if (seccion === "inventario")
        navigate(`/inventario/${id_inventario}/${categoria}`);
      else navigate(`/producto/${id_categoria}/${categoria}`);
    } else navigate(`/${_seccion}-producto/${id_producto}/${nombre}`);
  };

  return (
    <div
      className="relative w-96 h-96 border my-3 overflow-hidden"
      onClick={viewPage}
    >
      {title && (
        <div className="absolute top-4 left-0 right-0 z-50">
          <div className="flex justify-center w-50 m-auto">
            <button className="shadow-md bg-white text-pink-300 py-2 rounded-md px-10">
              {title}
            </button>
          </div>
        </div>
      )}
      <div
        className="h-full w-full flex items-center justify-center relative"
        style={{ cursor: "pointer" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-xl"
          style={{ backgroundImage: `url(${imagen})` }}
        ></div>
        <img
          className="relative z-10 object-cover"
          style={{ width: "auto", height: "90%" }}
          src={imagen}
          alt={nombre}
        />
      </div>
      <div className="absolute bottom-4 left-0 right-0 z-50">
        <div className="flex justify-center w-50 m-auto">
          <button className="shadow-md bg-white text-pink-300 py-2 rounded-md px-10">
            {nombre}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GridServices;
