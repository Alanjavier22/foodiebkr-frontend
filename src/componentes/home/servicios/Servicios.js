import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PaginationTabla from "../../componentes/PaginationTabla";

const ColCategory = ({ categorias, categoria, subCategoria, detalle }) => {
  const navigate = useNavigate();

  const { nombre, imagen = "NoImage", alt } = categorias;

  const viewPage = () => {
    if (subCategoria)
      navigate(`/categoria-producto/${categoria}/${nombre.replace(/ /g, "_")}`);
    else if (detalle) navigate(`/producto/${nombre.replace(/ /g, "_")}`);
    else navigate(`/categoria-producto/${nombre}`);
  };

  return (
    <Col onClick={viewPage}>
      <Card className="border-0 rounded-0" style={{ cursor: "pointer" }}>
        <Card.Img
          variant="top"
          className="rounded-0"
          src={`/images/${imagen}`}
          height={290}
          alt={alt}
        />
        <div
          style={{
            width: "100%",
            position: "absolute",
            bottom: "30px",
          }}
        >
          <div className="d-flex justify-content-center w-50 m-auto">
            <Button className="w-100 rounded-0 bg-white border-0 textColor">
              {nombre}
            </Button>
          </div>
        </div>
      </Card>
    </Col>
  );
};

const Servicios = ({
  item,
  categoria = "",
  subCategoria = false,
  detalle = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const handlePageChange = (page) => setCurrentPage(page);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = item?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Row xs={1} sm={1} md={3} lg={4} xl={4} className="g-4 px-1 py-3 mb-4">
        {item &&
          currentItems.map((item, index) => {
            return (
              <ColCategory
                key={index}
                categorias={item}
                categoria={categoria}
                subCategoria={subCategoria}
                detalle={detalle}
              />
            );
          })}
      </Row>
      {item && detalle && (
        <PaginationTabla
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={item.length}
          handlePageChange={handlePageChange}
          centrado={true}
        />
      )}
    </>
  );
};

export default Servicios;
