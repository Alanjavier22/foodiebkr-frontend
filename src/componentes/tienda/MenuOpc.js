import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

const MenuOpc = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const { rol = "cliente" } = token ? jwt_decode(token) : {};

  const isAdmin = rol !== "cliente";

  const [categoryMain, setCategory] = useState([]);

  useEffect(() => {
    const enviarData = () => {
      fetch(`${process.env.REACT_APP_URL_API}/consulta/menuProductos`)
        .then((response) => response.json())
        .then((data) => setCategory(data?.datos))
        .catch((err) => console.warn(err));
    };

    enviarData();
  }, []);

  return (
    <>
      <div className="textCotizar py-2">
        <div className="d-flex justify-content-evenly flex-wrap">
          {categoryMain &&
            categoryMain.map((item) => {
              return (
                <Dropdown
                  key={item.id}
                  onClick={() => {
                    if (item.id === 0) navigate(`/tienda`);
                  }}
                >
                  <Dropdown.Toggle
                    id="Search"
                    className="border-0 textSelect"
                    style={{ background: "#ffafc6" }}
                  >
                    {item.nombre}
                  </Dropdown.Toggle>
                  {item?.subcategorias?.length !== 0 && (
                    <Dropdown.Menu>
                      {item?.subcategorias?.map((opc) => {
                        return (
                          <Dropdown.Item
                            key={opc.id}
                            onClick={() =>
                              navigate(
                                `/categoria-producto/${item.nombre}/${opc.nombre}`
                              )
                            }
                          >
                            {opc.nombre}
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

      {isAdmin && (
        <div
          className="d-flex pt-2 px-2 justify-content-end"
          style={{ background: "white", marginBottom: "-50px" }}
        >
          <Link to="/addProducto" style={{ width: "200px" }}>
            <Button
              className="btnStore border-0"
              style={{ borderRadius: "50px", width: "200px", padding: "5px" }}
            >
              Agregar Producto
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default MenuOpc;
