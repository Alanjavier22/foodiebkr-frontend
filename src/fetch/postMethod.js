import swal from "sweetalert";

const postMethod = (props) => {
  const {
    path,
    data: { formData, title },
    showBtn,
    callbck,
    reload,
    setIsLoading,
  } = props;

  fetch(`${process.env.REACT_APP_URL_API}${path}`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then(({ error, datos, mensaje }) => {
      if (showBtn) {
        swal({
          title,
          text: mensaje || "Operación exitosa",
          icon: error ? "error" : "success",
          buttons: {
            confirm: {
              text: "OK",
              value: true,
              visible: true,
              className: "",
              closeModal: true,
            },
          },
        }).then(() => {
          if (reload) reload();
        });
      }

      if (!showBtn) {
        swal({
          title,
          text: mensaje || "Operación exitosa",
          icon: error ? "error" : "success",
          timer: 1000,
          buttons: false,
          className: "left-modal",
        });
      }

      if (callbck && !error) callbck(datos);
    })
    .catch((err) => console.warn(err))
    .finally(() => {
      if (setIsLoading) setIsLoading(false);
    });
};

export { postMethod };
