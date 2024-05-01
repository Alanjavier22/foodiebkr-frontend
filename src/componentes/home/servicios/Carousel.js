import { useNavigate } from "react-router-dom";

import Carousel from "react-bootstrap/Carousel";

const sliderData = [
  {
    id: 1,
    nombre: "Navidad",
    imagen_w: "Navidad_w.jpg",
    imagen: "Navidad.jpg",
  },
  {
    id: 2,
    nombre: "Paquetes",
    imagen_w: "Paquetes_w.jpg",
    imagen: "Paquetes.jpg",
  },
];

const Slider = () => {
  const navigate = useNavigate();

  const viewProduct = ({ nombre }) => navigate(`/categoria-producto/${nombre}`);

  return (
    <>
      <Carousel className="sliderFluid">
        {sliderData &&
          sliderData.map((item) => (
            <Carousel.Item key={item?.id} onClick={() => viewProduct(item)}>
              <img
                height={700}
                width="100%"
                src={`/images/${item.imagen_w}`}
                alt={item?.nombre}
              />
            </Carousel.Item>
          ))}
      </Carousel>

      <Carousel className="sliderFluidResp">
        {sliderData &&
          sliderData.map((item) => (
            <Carousel.Item key={item?.id} onClick={() => viewProduct(item)}>
              <img
                className="w-100"
                src={`/images/${item.imagen}`}
                alt={item?.nombre}
              />
            </Carousel.Item>
          ))}
      </Carousel>
    </>
  );
};

export default Slider;
