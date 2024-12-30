import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";

import Slider from "../../components/Carousel";
import Servicios from "../../components/Servicios";
import { getMethod } from "../../fetch/getMethod";

const Home = () => {
  const navigate = useNavigate();

  //Fetch
  const [Data, setData] = useState(null);
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMethod({
      path: "/producto/consultar/true",
      setData,
      setIsLoading,
      showSwal: false,
    });
  }, []);

  const toGoStore = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate(`/tienda`);
  };

  return (
    <>
      <Slider sliderData={Data} />

      <div className="py-5 px-2">
        <h4 className="text-center pb-2 textColor">
          Conoce nuestros productos y categorías a continuación
        </h4>
        <hr style={{ width: "50px", margin: "auto" }} />
      </div>

      <div className="px-5">
        <Servicios item={Data} IsLoading={IsLoading} />
      </div>

      <div className="flex justify-center py-5 px-2">
        <Button
          className="btnStore border-0"
          onClick={toGoStore}
          style={{ borderRadius: "50px", width: "200px", padding: "13px" }}
        >
          IR A TIENDA
        </Button>
      </div>
    </>
  );
};

export default Home;
