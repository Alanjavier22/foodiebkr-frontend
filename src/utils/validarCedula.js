const validarCedula = (cedula) => {
  const cedulaRegex = /^[0-9]{10}$/;
  if (!cedulaRegex.test(cedula)) {
    return { mensaje: "Formato de cédula inválido", error: true };
  }

  const digito_region = parseInt(cedula.substring(0, 2), 10);

  if (digito_region >= 1 && digito_region <= 24) {
    const ultimo_digito = parseInt(cedula.substring(9, 10), 10);

    const pares =
      parseInt(cedula.substring(1, 2), 10) +
      parseInt(cedula.substring(3, 4), 10) +
      parseInt(cedula.substring(5, 6), 10) +
      parseInt(cedula.substring(7, 8), 10);

    const calcularImpar = (num) => {
      let resultado = num * 2;
      if (resultado > 9) resultado -= 9;
      return resultado;
    };

    const impares =
      calcularImpar(parseInt(cedula.substring(0, 1), 10)) +
      calcularImpar(parseInt(cedula.substring(2, 3), 10)) +
      calcularImpar(parseInt(cedula.substring(4, 5), 10)) +
      calcularImpar(parseInt(cedula.substring(6, 7), 10)) +
      calcularImpar(parseInt(cedula.substring(8, 9), 10));

    const suma_total = pares + impares;
    const primer_digito_suma = String(suma_total).substring(0, 1);
    const decena = (parseInt(primer_digito_suma) + 1) * 10;
    let digito_validador = decena - suma_total;

    if (digito_validador === 10) digito_validador = 0;

    if (digito_validador === ultimo_digito) {
      return { mensaje: "", error: false };
    } else {
      return { mensaje: "La cédula ingresada es incorrecta", error: true };
    }
  } else {
    return {
      mensaje: "Esta cédula no pertenece a ninguna región",
      error: true,
    };
  }
};

export default validarCedula;
