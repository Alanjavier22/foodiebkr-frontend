import { useEffect, useState, useRef } from "react";

import { Link } from "react-router-dom";

import { Row, Col, Form, Image } from "react-bootstrap";

import AddCart from "../../../components/AddCart";

const DetalleContent = ({ item }) => {
  const [formulario, setFormulario] = useState({
    nombre: item.nombre,
    imagen: item.imagen,
    descripcion: item.descripcion,
    cantidad: 1,
    valor: item.valor,
    subtotal: 0,
    total: 0,
    seccion: "producto",
  });

  const [total, setTotal] = useState(1 * item.valor);

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      autoResizeTextarea();
    }
  }, [item.descripcion]);

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Restablecer la altura a 'auto' para calcular correctamente el scrollHeight
      textarea.style.height = `${textarea.scrollHeight}px`; // Ajustar la altura al scrollHeight
    }
  };

  //SE REALIZA OPERACIONES REQUERIDAS
  useEffect(() => {
    if (formulario) {
      let cantidad = Number(formulario?.cantidad) ?? 1;

      if (formulario.valor) {
        let precio = parseFloat(formulario.valor);
        setTotal(precio * cantidad);
      }
    }
  }, [formulario]);

  //FUNCION PARA TOMAR VALORES SELECCIONADOS
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.match(/^\d*$/) && value.length <= 3) {
      setFormulario((prevFormulario) => ({
        ...prevFormulario,
        [name]: value,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      setFormulario((prevFormulario) => ({
        ...prevFormulario,
        [name]: "1",
      }));
    }
  };

  return (
    <>
      <Row
        className="align-items-center w-100 py-3 px-5"
        style={{ minHeight: "70vh" }}
      >
        <Col className="pt-3">
          <div className="flex row w-full pl-2 justify-center items-center h-full">
            <Image
              src={item?.imagen}
              height={370}
              className="w-auto"
              rounded
              fluid
            />
          </div>
        </Col>
        <Col lg={6} className="pt-3">
          <div style={{ minHeight: "30vh" }}>
            <div className="flex w-full pl-2">
              <Form.Label className="textColor text-2xl w-full ml-4 px-4 py-3 border-b-2 text-center font-semibold uppercase tracking-wider">
                {item?.nombre || "-"}
              </Form.Label>
            </div>

            <div className="flex w-full pl-2">
              <Form.Label className="text-base w-full ml-4 px-4 pb-1 pt-3 text-left font-semibold uppercase tracking-wider">
                precio (Sin iva)
              </Form.Label>
              <Form.Label className="text-base w-full ml-4 px-4 pb-1 pt-3 text-left font-semibold uppercase tracking-wider">
                ${item?.valor.replace("$", "")}
              </Form.Label>
            </div>

            {item?.descripcion && (
              <div className="flex w-full pl-2 pb-4">
                <Form.Label className="text-base w-full ml-4 px-4 pb-1 pt-3 text-left font-semibold uppercase tracking-wider">
                  descripción
                </Form.Label>
                <Form.Control
                  ref={textareaRef}
                  type="text"
                  size="sm"
                  as="textarea"
                  rows={5}
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5rem",
                  }}
                  value={item?.descripcion}
                  disabled
                  className="w-full h-full ml-4 px-4 py-2 border-0 bg-white resize-none text-base text-left font-semibold text-gray-600 tracking-wider"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between w-full pl-2 ml-4 p-4">
            <Form.Control
              className="w-25"
              name="cantidad"
              value={formulario.cantidad}
              maxLength={3}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <AddCart item={formulario} total={total} />
          </div>

          <div className="flex w-full pl-2">
            <Form.Label className="textColor text-base w-full ml-4 px-3 py-3 border-t-2 text-left font-semibold uppercase tracking-wider">
              Valor final (sin iva)
            </Form.Label>
            <Form.Label className="textColor text-lg w-full ml-4 px-4 py-3 border-t-2 text-right font-semibold uppercase tracking-wider">
              <span className="textColor text-xl">${total}</span>
            </Form.Label>
          </div>

          <div className="flex items-center flex-wrap w-full pl-2 pt-5">
            <Form.Label className="mt-1 pl-5 capitalize">
              Categorias:
            </Form.Label>
            <div className="flex w-full px-3 capitalize">
              <Link
                to={`/categoria-producto/${item?.id_producto}/${item?.nombre_producto}`}
              >
                {item?.nombre_producto.toLowerCase()}
              </Link>
              <Link
                className="mx-3 capitalize"
                to={`/categoria-producto/${item?.id_producto}/${item?.nombre_producto}/${item?.id_subproducto}/${item?.nombre_subproducto}`}
              >
                {item?.nombre_subproducto.toLowerCase()}
              </Link>

              <Link>{item?.nombre.toLowerCase()}</Link>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DetalleContent;
