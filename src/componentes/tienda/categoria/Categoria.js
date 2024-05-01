import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import MenuOpc from "../MenuOpc";
import Servicios from "../../home/servicios/Servicios";

import Breadcrumb from "react-bootstrap/Breadcrumb";

import { AiOutlineHome } from "react-icons/ai";

const Categoria = () => {
  let { categoria } = useParams();

  const [category, setCategory] = useState([]);

  useEffect(() => {
    const enviarData = () => {
      fetch(
        `${
          process.env.REACT_APP_URL_API
        }/consulta/categoria?categoria=${categoria.replace(/_/g, " ")}`
      )
        .then((response) => response.json())
        .then((data) => setCategory(data?.datos))
        .catch((err) => console.warn(err));
    };

    enviarData();
  }, [categoria]);

  return (
    <>
      <div className="textCotizar py-2">
        <MenuOpc />
      </div>

      <div className="px-5 pb-4"  style={{ minHeight: "61vh" }}>
        <Breadcrumb className="pt-5 fs-6">
          <Breadcrumb.Item href="/" id="canvasText">
            <AiOutlineHome /> Inicio
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{categoria}</Breadcrumb.Item>
        </Breadcrumb>

        <Servicios item={category} subCategoria={true} categoria={categoria} />
      </div>
    </>
  );
};

export default Categoria;
