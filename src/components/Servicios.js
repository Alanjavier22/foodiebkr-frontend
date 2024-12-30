import { useEffect, useState } from "react";

import Placeholder from "react-bootstrap/Placeholder";

import PaginationTabla from "./PaginationTabla";
import GridServices from "./GridServices";

const itemsPerPage = 8;

const Servicios = ({
  item,
  categoria = "",
  subCategoria = false,
  detalle = false,
  IsLoading,
  totalMostrado,
  search = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = item?.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [item]);

  useEffect(() => {
    if (totalMostrado) totalMostrado(currentItems.length);
  }, [currentItems]);

  return (
    <div className="px-5">
      {IsLoading && (
        <>
          <Placeholder className="flex justify-around" animation="glow">
            <Placeholder md={3} className="m-3 h-72" />
            <Placeholder md={3} className="m-3 h-72" />
            <Placeholder md={3} className="m-3 h-72" />
          </Placeholder>
          <Placeholder className="flex justify-around" animation="glow">
            <Placeholder md={3} className="m-3 h-72" />
            <Placeholder md={3} className="m-3 h-72" />
            <Placeholder md={3} className="m-3 h-72" />
          </Placeholder>
        </>
      )}

      {!IsLoading && item && (
        <div
          className="flex align-middle flex-wrap justify-around"
          style={{ minHeight: "70vh" }}
        >
          {item &&
            currentItems.map((item, index) => {
              const title = search ? item.nombre_subproducto : null;
              return (
                <GridServices
                  key={index}
                  producto={item}
                  categoria={categoria}
                  subCategoria={subCategoria}
                  detalle={detalle}
                  title={title}
                />
              );
            })}
        </div>
      )}
      {item && detalle && (
        <PaginationTabla
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={item.length}
          handlePageChange={handlePageChange}
          centrado={true}
        />
      )}
    </div>
  );
};

export default Servicios;
