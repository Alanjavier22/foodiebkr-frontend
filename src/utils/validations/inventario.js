import * as Yup from "yup";

// Esquema de validación
// Importante primero las expresiones regulares
// Luego otras validaciones
const validationInventary = Yup.object({
  nombre: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Solo caracteres alfabeticos")
    .required("El nombre es requerido"),
  stock: Yup.string()
    .matches(/^\d+$/, "Solo número")
    .max(4, "El maximo de stock es 4 cifras")
    .required("El stock es requerido"),
  valor: Yup.string()
    .matches(/^\d*\.?\d*$/, "Solo números y opcionalmente un punto decimal")
    .required("El valor es requerido"),
});

export default validationInventary;
