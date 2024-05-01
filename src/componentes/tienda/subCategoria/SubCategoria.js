import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import MenuOpc from "../MenuOpc";
import Servicios from "../../home/servicios/Servicios";

import Breadcrumb from "react-bootstrap/Breadcrumb";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { AiOutlineHome } from "react-icons/ai";

const url = `${process.env.REACT_APP_URL_API}/consulta/subCategorias?subCategoria=`;

const SubCategoria = () => {
  let { categoria, subCategoria } = useParams();

  const navigate = useNavigate();

  const [category, setCategory] = useState([]);

  useEffect(() => {
    const enviarData = () => {
      fetch(`${url}${subCategoria.replace(/_/g, " ")}`)
        .then((response) => response.json())
        .then((data) => setCategory(data?.datos))
        .catch((err) => console.warn(err));
    };

    enviarData();
  }, [subCategoria]);

  const orden = ({ target }) => {
    let newOrden = [];

    if (target.value === "id asc") {
      newOrden = [...category].sort((a, b) => a.id - b.id);
    }

    if (target.value === "id desc") {
      newOrden = [...category].sort((a, b) => b.id - a.id);
    } else {
      const categoryArr = category.map((item) => {
        return {
          ...item,
          precio:
            item.precio?.replace("$", "") ||
            item.varios_precios[0].precio?.replace("$", ""),
        };
      });

      if (target.value === "precio asc") {
        newOrden = [...categoryArr].sort(
          (a, b) => Number(a.precio) - Number(b.precio)
        );
      }

      if (target.value === "precio desc") {
        newOrden = [...categoryArr].sort(
          (a, b) => Number(b.precio) - Number(a.precio)
        );
      }
    }

    setCategory(newOrden);
  };

  return (
    <>
      <div className="textCotizar py-2">
        <MenuOpc />
      </div>

      <div className="px-5 pb-4">
        <Breadcrumb className="pt-5 fs-6">
          <Breadcrumb.Item href="/" id="canvasText">
            <AiOutlineHome /> Inicio
          </Breadcrumb.Item>

          <Breadcrumb.Item
            onClick={() => navigate(`/categoria-producto/${categoria}`)}
            id="canvasText"
          >
            {categoria}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            {subCategoria.replace(/_/g, " ")}
          </Breadcrumb.Item>
        </Breadcrumb>

        <Row className="justify-content-end align-items-center px-2 mt-2">
          <Col md={4}>
            <label>
              Mostrando {category.length} de {category.length} resultados
            </label>
          </Col>
          <Col md={4} className="pb-0 d-flex flex-row ordenarResp">
            <Form.Select className="my-2" onChange={orden}>
              <option value="id asc">Orden predeterminado</option>
              <option value="id desc">Orden por últimos</option>
              <option value="precio asc">Orden por precio: bajo a alto</option>
              <option value="precio desc">Orden por precio: alto a bajo</option>
            </Form.Select>
          </Col>
        </Row>

        {category && (
          <Servicios item={category} categoria={categoria} detalle={true} />
        )}
      </div>
    </>
  );
};

export default SubCategoria;
