import * as Yup from "yup";
import validarCedula from "../validarCedula";

// Esquema de validación
// Importante primero las expresiones regulares
// Luego otras validaciones
const validationRegister = Yup.object({
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
  email: Yup.string()
    .matches(/^[\w\.-]+@[\w\.-]+\.\w{2,4}/, "Correo electrónico no valido")
    .required("El correo electrónico es requerido"),
  pass: Yup.string()
    .min(5, "La contraseña debe tener al menos 5 caracteres")
    .matches(/[a-z]/, "La contraseña debe tener al menos una letra minúscula")
    .matches(/[A-Z]/, "La contraseña debe tener al menos una letra mayúscula")
    .matches(/\d/, "La contraseña debe tener al menos un número")
    .required("La contraseña es requerida"),
});

export default validationRegister;
