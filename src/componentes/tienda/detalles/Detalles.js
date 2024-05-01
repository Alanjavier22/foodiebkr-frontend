import { useEffect, useState } from "react";

import { useParams, useNavigate, Link } from "react-router-dom";

import swal from "sweetalert";

import Breadcrumb from "react-bootstrap/Breadcrumb";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { AiOutlineHome } from "react-icons/ai";
import { Button } from "react-bootstrap";

const imagen = "NoImage.jpg";

const DetallesProducto = ({ DetallesProd }) => {
  const [total, setTotal] = useState(0);
  const [porc, setPorc] = useState(0);

  const [limit, setLimit] = useState(1);

  const [formulario, setFormulario] = useState({
    cantidad: 1,
    subtotal: 0,
    total: 0,
  });

  //SE INGRESA DATOS INICIALES
  useEffect(() => {
    if (DetallesProd?.opcionesPorc)
      setPorc(DetallesProd.opcionesPorc[0].precio);
    if (DetallesProd?.limite) {
      let arrLimit = DetallesProd?.limite?.split(" ");
      let limite = arrLimit[arrLimit.length - 2];
      setLimit(Number(limite));
    }
    if (DetallesProd?.precio)
      handleChange({
        target: {
          name: "precio",
          value: DetallesProd?.precio.replace("$", ""),
        },
      });
  }, [DetallesProd]);

  //SE REALIZA OPERACIONES REQUERIDAS
  useEffect(() => {
    if (formulario) {
      let cantidad = formulario?.cantidad ?? 1;

      if (formulario.precio && formulario.extra) {
        let precio = parseFloat(formulario.precio);
        let extra = parseFloat(formulario.extra?.replace("$", ""));

        setTotal(precio * cantidad + extra);
      } else {
        if (formulario.precio) {
          let precio = parseFloat(formulario.precio);
          setTotal(precio * cantidad);
        }

        if (formulario.extra) {
          let extra = parseFloat(formulario.extra?.replace("$", ""));
          setTotal(1 * cantidad + extra);
        }
      }
    }
  }, [formulario]);

  //FUNCION PARA TOMAR VALORES SELECCIONADOS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }));
  };

  //ACTUALIZAR DATOS DEL CARRITO
  const addCarCheck = () => {
    const { nombre, imagen, descripcion = "" } = DetallesProd;
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      nombre,
      imagen,
      descripcion,
      subtotal: total,
      total: total,
    }));
  };

  //GUARDAR EN LOCALSTORAGE
  const addCar = () => {
    let datosCarrito = JSON.parse(localStorage.getItem("Carrito") || null);

    if (datosCarrito) {
      datosCarrito.push(formulario);
    } else {
      datosCarrito = [formulario];
    }

    localStorage.setItem("Carrito", JSON.stringify(datosCarrito));

    swal({
      title: "Agregado al Carrito",
      // text: mensaje || "Login exitoso",
      icon: "success",
    });
  };

  return (
    <>
      <Row className="align-items-center w-100 py-3 px-5">
        <Col className="pt-3">
          <img
            src={`/images/${DetallesProd?.imagen || imagen}`}
            width={500}
            alt={DetallesProd?.nombre}
          />
        </Col>
        <Col lg={5}>
          <div>
            <Form.Label className="fs-2 mt-3 textColor">
              {DetallesProd?.nombre}
            </Form.Label>
          </div>

          {DetallesProd?.precio && (
            <div>
              <Form.Label className="fs-3 mb-2">
                ${DetallesProd?.precio.replace("$", "")}
              </Form.Label>
            </div>
          )}

          {DetallesProd?.descripcion && (
            <div>
              <Form.Label className="fs-5 my-2">
                {DetallesProd?.descripcion}
              </Form.Label>
            </div>
          )}

          {DetallesProd?.DescripcionLista && (
            <div>
              <Form.Label className="fs-5 my-2">
                Descripción del pack:
              </Form.Label>
              <ul>
                {DetallesProd.DescripcionLista.map((item, index) => {
                  return <li key={index}>{item.name}</li>;
                })}
              </ul>
            </div>
          )}

          {DetallesProd?.varios_precios && (
            <>
              <Form.Label className="fs-5 my-2">Precio:</Form.Label>
              <Form.Select
                className="my-2"
                name="precio"
                onChange={handleChange}
              >
                <option value="0"> Selecciona una opción</option>
                {DetallesProd.varios_precios.map((item, index) => {
                  return (
                    <option key={index} value={item.precio}>
                      {item.precio_txt}
                    </option>
                  );
                })}
              </Form.Select>
            </>
          )}

          {DetallesProd?.limite && (
            <>
              <Form.Label className="fs-6 my-2">
                {DetallesProd?.limite}
              </Form.Label>
              <br />
            </>
          )}

          {DetallesProd?.sabores && (
            <>
              <Form.Label className="my-2">Opciones: </Form.Label>
              <Form.Select
                className="my-2"
                name="sabores"
                onChange={handleChange}
              >
                <option value=""> Selecciona una opción</option>
                {DetallesProd.sabores.map((item) => {
                  return (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
              </Form.Select>
            </>
          )}

          {DetallesProd?.opcionesPorc && (
            <>
              <Form.Label className="my-2">Opciones: </Form.Label>
              <Form.Select
                className="my-2"
                onChange={(e) => {
                  const value = parseFloat(e.target.value?.replace("$", ""));
                  setPorc(value);
                }}
              >
                {DetallesProd.opcionesPorc.map((item, index) => {
                  return (
                    <option key={index} value={item.precio}>
                      {item.pisos} pisos x {item.personas} personas -{" "}
                      {item.precio}
                    </option>
                  );
                })}
              </Form.Select>
            </>
          )}

          {DetallesProd?.extras && (
            <>
              <Form.Label className="my-2">Extra: </Form.Label>
              <Form.Select
                className="my-2"
                name="extra"
                onChange={handleChange}
                // onChange={(e) => {
                //   const value = parseFloat(e.target.value?.replace("$", ""));
                //   setExtras(value);
                // }}
              >
                <option value={0}>No, gracias</option>
                {DetallesProd.extras.map((item) => {
                  return (
                    <option key={item.id_extras} value={item.precio}>
                      {item.nombre} - {item.precio}
                    </option>
                  );
                })}
              </Form.Select>
            </>
          )}

          <Form.Label className="my-4">
            Final total
            <br /> <span className="textColor">${total}</span>
          </Form.Label>

          <div className="d-flex gap-2 pt-2">
            <Form.Control
              className="w-25"
              name="cantidad"
              type="number"
              min={limit}
              defaultValue={limit}
              onChange={handleChange}
            />
            <Button
              className="btnStore border-0 fs-6"
              style={{ borderRadius: "50px", width: "300px" }}
              onClick={addCar}
              onClickCapture={addCarCheck}
              disabled={total === 0}
            >
              AÑADIR AL CARRITO
            </Button>
          </div>

          <Form.Label className="mt-4">
            Categorias:
            {DetallesProd?.CategoriaLink && (
              <div className="d-flex mt-2 w-100">
                <Link
                  to={`/categoria-producto/${DetallesProd.CategoriaLink[0]}`}
                >
                  {DetallesProd.CategoriaLink[0]}
                </Link>
                <Link
                  className="mx-3"
                  to={`/categoria-producto/${
                    DetallesProd.CategoriaLink[0]
                  }/${DetallesProd.CategoriaLink[1].replace(/ /g, "_")}`}
                >
                  {DetallesProd.CategoriaLink[1]}
                </Link>
                <Link>{DetallesProd.CategoriaLink[2]}</Link>
              </div>
            )}
          </Form.Label>
        </Col>
      </Row>
    </>
  );
};

export default function Detalles() {
  let { detalle } = useParams();

  const navigate = useNavigate();

  const [detallesProd, setDetallesProd] = useState(null);

  useEffect(() => {
    const enviarData = () => {
      fetch(
        `${
          process.env.REACT_APP_URL_API
        }/consulta/detalles?producto=${detalle.replace(/_/g, " ")}`
      )
        .then((response) => response.json())
        .then((data) => setDetallesProd(data?.datos))
        .catch((err) => console.warn(err));
    };

    enviarData();
  }, [detalle]);

  return (
    <>
      <div className="px-0 pb-4">
        <Breadcrumb
          className="px-5 pb-1 fs-6"
          style={{ background: "#f9f9f9", paddingTop: "15px" }}
        >
          <Breadcrumb.Item href="/" id="canvasText">
            <AiOutlineHome /> Inicio
          </Breadcrumb.Item>
          <Breadcrumb.Item
            id="canvasText"
            onClick={() =>
              navigate(`/categoria-producto/${detallesProd?.CategoriaLink[0]}`)
            }
          >
            {detallesProd?.CategoriaLink[0]}
          </Breadcrumb.Item>
          <Breadcrumb.Item
            id="canvasText"
            onClick={() =>
              navigate(
                `/categoria-producto/${
                  detallesProd?.CategoriaLink[0]
                }/${detallesProd?.CategoriaLink[1].replace(/ /g, "_")}`
              )
            }
          >
            {detallesProd?.CategoriaLink[1]}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{detalle.replace(/_/g, " ")}</Breadcrumb.Item>
        </Breadcrumb>

        <div className="px-5">
          {detallesProd && <DetallesProducto DetallesProd={detallesProd} />}
        </div>
      </div>
    </>
  );
}
