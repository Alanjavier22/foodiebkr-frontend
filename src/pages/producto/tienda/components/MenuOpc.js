import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Dropdown, Button } from "react-bootstrap";

import { getMethod } from "../../../../fetch/getMethod";
import FormSearch from "./FormSearch";

const MenuOpc = ({ children }) => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  const [data, setData] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const handleMouseEnter = (id) => setOpenDropdownId(id);
  const handleMouseLeave = () => setOpenDropdownId(null);

  useEffect(() => {
    getMethod({
      path: `/producto/consultar-opciones`,
      setData,
      setIsLoading: () => {},
      showSwal: false,
    });
  }, []);

  const goToProduct = (item) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    navigate(`/categoria-producto/${item.id_producto}/${item.nombre}`);
  };

  const goToSubProduct = (opc, item) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    navigate(
      `/categoria-producto/${opc.id_producto}/${item.nombre}/${opc.id_subproducto}/${opc.nombre}`
    );
  };

  // Add horizontal scroll on wheel event
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleWheel = (event) => {
      if (event.deltaY !== 0) {
        scrollContainer.scrollLeft += event.deltaY;
        event.preventDefault();
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <>
      <div
        className="textCotizar py-2 min-h-14 w-full"
        style={{ position: "fixed", zIndex: "300" }}
      >
        <div
          className="d-flex justify-content-evenly flex-nowrap pb-2 px-4"
          style={{ overflow: "hidden" }}
          ref={scrollContainerRef}
        >
          {data &&
            data.map((item) => {
              return (
                <Dropdown
                  align="end"
                  key={item.id_producto}
                  show={openDropdownId == item.id_producto}
                  onClick={() => {
                    if (item.id_producto === 0) navigate(`/tienda`);
                  }}
                  onMouseLeave={handleMouseLeave}
                  className="flex"
                  style={{ position: "static" }}
                >
                  <Button
                    style={{ fontSize: "16px" }}
                    className="min-w-40 pl-4 ml-3 pr-0 border-0 bg-transparent text-left font-semibold text-gray-600 capitalize tracking-wider"
                    size="sm"
                    onClick={() => goToProduct(item)}
                    onMouseEnter={() => handleMouseEnter(item.id_producto)}
                  >
                    {item.nombre}
                  </Button>
                  {item.id_producto !== 0 &&
                    item?.subproducto?.length !== 0 && (
                      <Dropdown.Toggle
                        key={item.id_producto}
                        className="mr-4"
                        split
                        style={{
                          background: "none",
                          fontSize: "22px",
                          margin: "0px",
                          border: 0,
                          padding: "0",
                        }}
                      />
                    )}
                  {item?.subproducto?.length !== 0 && (
                    <Dropdown.Menu
                      className="-mt-6"
                      style={{ marginTop: "-7px" }}
                    >
                      {item?.subproducto?.map((opc) => {
                        return (
                          <Dropdown.Item
                            key={opc.id_subproducto}
                            onClick={() => goToSubProduct(opc, item)}
                          >
                            <span className="capitalize">
                              {opc.nombre.toLowerCase()}
                            </span>
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  )}
                </Dropdown>
              );
            })}
        </div>
      </div>

      <div className="py-4 mt-2" />

      <FormSearch />

      {children}
    </>
  );
};

export default MenuOpc;
