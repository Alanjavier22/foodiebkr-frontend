import * as Yup from "yup";
import validarCedula from "../validarCedula";

// Esquema de validación
// Importante primero las expresiones regulares
// Luego otras validaciones
const validationClient = Yup.object({
  nombre: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Solo caracteres alfabeticos")
    .required("El nombre de usuario es requerido"),
  apellido: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Solo caracteres alfabeticos")
    .required("El apellido es requerido"),
  cedula: Yup.string()
    .matches(/^\d+$/, "Solo número")
    .min(10, "La cédula debe tener minimo 10 caracteres")
    .required("La cédula es requerida")
    .test("valid-cedula", "La cédula ingresada no es valida", (value) => {
      if (!value) return false; // or true if you want to allow empty values
      const { error } = validarCedula(value);
      return !error;
    }),
  telefono: Yup.string()
    .matches(/^\d+$/, "Solo número")
    .min(10, "El número de teléfono debe tener minimo 10 caracteres")
    .required("El número de teléfono es requerido"),
  email: Yup.string()
    .matches(/^[\w\.-]+@[\w\.-]+\.\w{2,4}/, "Correo electrónico no valido")
    .required("El correo electrónico es requerido"),
  direccion: Yup.string()
    .matches(/^[\w\d\s]+$/, "")
});

export default validationClient;
