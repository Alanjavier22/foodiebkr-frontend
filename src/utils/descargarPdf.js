const descargarPdf = (base64String, nombreArchivo) => {
  // Eliminar el prefijo "data:application/pdf;base64," si existe
  const base64Data = base64String.replace(/^data:(.*);base64,/, "");

  // Convertir el string Base64 a un array de bytes
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length)
    .fill(null)
    .map((_, i) => byteCharacters.charCodeAt(i));
  const byteArray = new Uint8Array(byteNumbers);

  // Crear un Blob con el array de bytes, especificando el tipo MIME para PDF
  const blob = new Blob([byteArray], { type: "application/pdf" });

  // Crear un enlace de descarga
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = nombreArchivo || "archivo.pdf";

  // Simular el clic en el enlace
  document.body.appendChild(link);
  link.click();

  // Eliminar el enlace después de descargar
  document.body.removeChild(link);
};

export default descargarPdf;
