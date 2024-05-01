import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";

const porciones = [
  { pisos: 1, porciones: 10 },
  { pisos: 1, porciones: 20 },
  { pisos: 1, porciones: 30 },
  { pisos: 1, porciones: 40 },
  { pisos: 2, porciones: 35 },
  { pisos: 2, porciones: 50 },
  { pisos: 2, porciones: 70 },
];

const FormularioCotizacion = ({ categoriaLink, setCategoriaLink }) => {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    celular: "",
    producto: "",
    cantidad: "",
    sabores: "Vainilla",
    decoracion: "crema",
  });

  const [porc, setPorc] = useState({ pisos: 1, porciones: 10 });

  const [enviar, setEnviar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setCategoriaLink([...categoriaLink, formulario.nombre]);

    console.log({ ...formulario, ...porc, categoriaLink });
    setEnviar(true);
  };

  useEffect(() => {
    const enviarData = () => {
      // fetch(`${process.env.REACT_APP_URL_API}/insert/cotizaciones/`, {
      //   method: "POST",
      //   body: JSON.stringify({ ...formulario, ...porc, categoriaLink}),
      //   headers: { "Content-type": "application/json; charset=UTF-8" },
      // })
      //   .then((response) => {
      //     setEnviar(false);
      //     navigate(`/cotizacion`);
      //   })
      //   .catch((err) => console.warn(err));

      navigate("/tienda");
    };

    if (enviar) enviarData();
  }, [enviar]);

  return (
    <div className="border-0 m-auto p-3" style={{ width: "80vw" }}>
      <hr />
      <form className="formulario px-5">
        <Form.Label htmlFor="Nombre">Nombre</Form.Label>
        <Form.Control type="text" name="nombre" onChange={handleChange} />

        <Form.Label htmlFor="Precio">Precio</Form.Label>
        <Form.Control type="text" name="precio" onChange={handleChange} />

        <Form.Label htmlFor="decoracion">Torta decorada:</Form.Label>
        <Form.Select name="decoracion" onChange={handleChange}>
          <option value="crema">Con crema</option>
          <option value="foundant">Con foundant</option>
        </Form.Select>

        <Form.Label htmlFor="sabores">Sabor(es) de la torta:</Form.Label>
        <Form.Select name="sabores" onChange={handleChange}>
          <option value="Vainilla">Vainilla</option>
          <option value="Chocolate">Chocolate</option>
          <option value="Marmoleada">Marmoleada</option>
          <option value="RedVelvet">RedVelvet</option>
        </Form.Select>

        <Form.Label htmlFor="cantidad">
          ¿Cuantas porciones necesitas?
        </Form.Label>
        <div className="d-flex">
          <Form.Select
            onChange={(e) =>
              setPorc({
                pisos: Number(e.target.value),
                porciones: Number(e.target.value) === 1 ? 10 : 35,
              })
            }
            style={{ marginRight: "10px" }}
          >
            <option value="1">1 piso</option>
            <option value="2">2 pisos</option>
          </Form.Select>
          <Form.Select
            onChange={(e) =>
              setPorc({ ...porc, porciones: Number(e.target.value) })
            }
            style={{ marginLeft: "10px" }}
          >
            {porciones.map((item, index) => {
              if (porc.pisos === item.pisos)
                return (
                  <option key={index} value={item.porciones}>
                    {item.porciones} porciones
                  </option>
                );
            })}
          </Form.Select>
        </div>

        <Form.Group controlId="formFile" className="my-3">
          <Form.Control type="file" accept=".png, .jpg" />
        </Form.Group>

        <Button
          className="btnStore border-0 rounded-0 mt-4"
          style={{ width: "200px" }}
          onClick={handleSubmit}
        >
          Agregar
        </Button>
      </form>
    </div>
  );
};

const SelectCategory = ({ categoriaLink, setCategoriaLink }) => {
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    const enviarData = () => {
      fetch(`${process.env.REACT_APP_URL_API}/consulta/menuProductos`)
        .then((response) => response.json())
        .then(({ datos }) => {
          datos.shift();
          setCategory(datos);
        })
        .catch((err) => console.warn(err));
    };

    enviarData();
  }, []);

  const changeCategory = (e) => {
    const dataCategory = JSON.parse(e.target.value);
    setCategoriaLink([dataCategory.nombre]);
    setSubCategory(dataCategory?.subcategorias);
  };

  const changeSubCategory = (e) =>
    setCategoriaLink([...categoriaLink, e.target.value]);

  return (
    <>
      <div className="border-0 p-4 mt-3">
        <div className="d-flex justify-content-center align-items-center px-5 mx-3">
          <Form.Label htmlFor="categoria" className="mx-3">
            Categoria:{" "}
          </Form.Label>
          <Form.Select
            onChange={changeCategory}
            style={{ marginRight: "10px" }}
          >
            <option value="">Selecciona categoria</option>
            {category.map((item) => {
              return (
                <option key={item.id} value={JSON.stringify(item)}>
                  {item.nombre}
                </option>
              );
            })}
          </Form.Select>

          {subCategory && (
            <>
              <Form.Label htmlFor="subcategoria" className="mx-3">
                Subcategoria:{" "}
              </Form.Label>
              <Form.Select
                onChange={changeSubCategory}
                style={{ marginRight: "10px" }}
              >
                <option value="">Selecciona subcategoria</option>
                {subCategory.map((item) => {
                  return (
                    <option key={item.id} value={item.nombre}>
                      {item.nombre}
                    </option>
                  );
                })}
              </Form.Select>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const AddProducto = () => {
  const [categoriaLink, setCategoriaLink] = useState([]);

  return (
    <>
      <div className="textCotizar py-2">
        <h1 className="text-center text-light">AGREGAR PRODUCTO</h1>
      </div>

      <div className="py-4" style={{ minHeight: "70vh" }}>
        <Card className="mx-5">
          <SelectCategory
            categoriaLink={categoriaLink}
            setCategoriaLink={(item) => setCategoriaLink(item)}
          />

          {categoriaLink.length >= 2 && (
            <FormularioCotizacion
              categoriaLink={categoriaLink}
              setCategoriaLink={(item) => setCategoriaLink(item)}
            />
          )}
        </Card>
      </div>
    </>
  );
};

export default AddProducto;
