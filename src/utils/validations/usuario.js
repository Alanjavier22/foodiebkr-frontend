import * as Yup from "yup";

// Esquema de validación
// Importante primero las expresiones regulares
// Luego otras validaciones
const validationUser = Yup.object({
  username: Yup.string()
    .email("Correo electrónico no valido")
    .required("El correo electrónico es requerido"),
  pass: Yup.string()
    // .matches(/[@$!%*?&]/, 'La contraseña debe tener al menos un carácter especial')
    .min(5, "La contraseña debe tener al menos 5 caracteres")
    // .matches(/[a-z]/, "La contraseña debe tener al menos una letra minúscula")
    // .matches(/[A-Z]/, "La contraseña debe tener al menos una letra mayúscula")
    .matches(/\d/, "La contraseña debe tener al menos un número")
    .required("La contraseña es requerida"),
});

export default validationUser;
