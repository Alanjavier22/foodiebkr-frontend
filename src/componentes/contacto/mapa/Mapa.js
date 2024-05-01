import React from "react";

const Mapa = () => {
  return (
    <div className="embed-responsive embed-responsive-4by3">
      <iframe
        title="Mapa del sitio"
        width={"100%"}
        height={300}
        className="embed-responsive-item img-fluid"
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1993.5314909626072!2d-79.88937742121381!3d-2.1294798772620385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMsKwMDcnNDQuNyJTIDc5wrA1MycyMS43Ilc!5e0!3m2!1ses-419!2sec!4v1701921054267!5m2!1ses-419!2sec"
      ></iframe>
    </div>
  );
};

export default Mapa;
