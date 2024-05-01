import React from "react";

const Detalles = () => {
  return (
    <div className="container">
      <div className="row pt-3 pb-5">
        <div className="col-md-4 d-flex flex-column justify-content-start">
          <h2 className="textColor pb-3">Objetivo</h2>
          <p className="py-2" style={{ width: "95%", textAlign: "justify" }}>
            En el próximo año, aumentar nuestra cuota de mercado en un 20%
            mediante la expansión de nuestra línea de productos, la mejora de la
            eficiencia operativa y el fortalecimiento de las asociaciones con
            proveedores locales. Aspiramos a fomentar la lealtad del cliente,
            ofreciendo promociones especiales y participando activamente en
            eventos comunitarios para consolidar nuestra presencia en el mercado
            local.
          </p>
        </div>
        <div className="col-md-4 d-flex flex-column justify-content-start">
          <h2 className="textColor pb-3">Misión</h2>
          <p style={{ width: "95%", textAlign: "justify" }}>
            Ofrecer delicias irresistibles que deleiten los sentidos y creen
            momentos memorables. Nos esforzamos por utilizar ingredientes
            frescos y de alta calidad, combinados con la pasión y la
            creatividad, para satisfacer los antojos de nuestros clientes y
            convertir cada ocasión en una celebración dulce.
          </p>
        </div>
        <div className="col-md-4 d-flex flex-column justify-content-start">
          <h2 className="textColor pb-3">Visión</h2>
          <p style={{ width: "95%", textAlign: "justify" }}>
            Ser reconocidos como la mejor pastelería de la región, destacando
            por nuestra excelencia en la calidad, innovación y servicio al
            cliente. Aspiramos a convertirnos en un destino favorito para los
            amantes de los postres, proporcionando experiencias gastronómicas
            únicas y construyendo una marca que inspire confianza y alegría.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Detalles;
