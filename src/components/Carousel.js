import { useNavigate } from "react-router-dom";

import { Image, Carousel } from "react-bootstrap";

const Slider = ({ sliderData }) => {
  const navigate = useNavigate();

  const viewProduct = ({ id_producto, nombre }) => {
    navigate(`/categoria-producto/${id_producto}/${nombre}`);
  };

  return (
    <>
      <Carousel>
        {sliderData &&
          sliderData.map((item) => (
            <Carousel.Item
              key={item?.id_producto}
              onClick={() => viewProduct(item)}
            >
              <div className="carousel-item-container">
                <div
                  className="carousel-item-bg"
                  style={{ backgroundImage: `url(${item.imagen})` }}
                ></div>
                <Image
                  className="carousel-item-image"
                  src={item.imagen}
                  alt={item?.nombre}
                  fluid
                />
              </div>
            </Carousel.Item>
          ))}
      </Carousel>
    </>
  );
};

export default Slider;
