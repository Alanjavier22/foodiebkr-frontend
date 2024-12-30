import * as Yup from "yup";

// Esquema de validación
// Importante primero las expresiones regulares
// Luego otras validaciones
const validationProduct = Yup.object({
  nombre: Yup.string()
    .matches(/^[a-zA-Z0-9\s]+$/, "Solo caracteres alfabeticos")
    .required("El nombre es requerido"),
  valor: Yup.string()
    .matches(/^\d*\.?\d*$/, "Solo números y opcionalmente un punto decimal")
    .required("El valor es requerido"),
});

export default validationProduct;
