import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import Servicios from "./servicios/Servicios";
import Slider from "./servicios/Carousel";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

const Home = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const enviarData = () => {
      fetch(`${process.env.REACT_APP_URL_API}/consulta/categoria`)
        .then((response) => response.json())
        .then((data) => setCategory(data?.datos))
        .catch((err) => console.warn(err));
    };

    enviarData();
  }, []);

  return (
    <>
      <Slider />

      <div className="py-5 px-2">
        <h4 className="text-center pb-2 textColor">
          Conoce nuestros productos y categorías a continuación
        </h4>
        <hr style={{ width: "50px", margin: "auto" }} />
      </div>

      <div className="px-5">
        <Servicios item={category} />
      </div>

      <Row className="justify-content-center px-1 py-3 w-100">
        <Link to="/tienda" style={{ width: "200px" }}>
          <Button
            className="btnStore border-0"
            style={{ borderRadius: "50px", width: "200px", padding: "13px" }}
          >
            IR A TIENDA
          </Button>
        </Link>
      </Row>
    </>
  );
};

export default Home;
