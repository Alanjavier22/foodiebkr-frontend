import swal from "sweetalert";

const getMethod = ({ path, setData, setIsLoading, showSwal = true }) => {
  let config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  fetch(`${process.env.REACT_APP_URL_API}${path}`, config)
    .then((response) => response.json())
    .then(({ datos, mensaje, error }) => {
      setData(datos);

      if (showSwal) {
        swal({
          text: mensaje || "Consulta realizada",
          icon: error ? "error" : "success",
          timer: 1600,
          buttons: false,
          className: "left-modal",
        });
      }
    })
    .catch((err) => console.warn(err))
    .finally(() => setIsLoading(false));
};

export { getMethod };
