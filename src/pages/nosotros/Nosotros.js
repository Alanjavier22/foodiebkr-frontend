import React from "react";

import Detalles from "./Content/Detalles";

export default function Nosotros() {
  return (
    <>
      <div className="textCotizar py-2">
        <h1 className="pt-3 text-center text-2xl font-semibold text-slate-100 uppercase tracking-wider">
          Nosotros
        </h1>
      </div>

      <div className="container py-5">
        <p>
          𝑴𝒂𝒓𝒊𝒂 𝑮𝒂𝒃𝒓𝒊𝒆𝒍𝒂 | Pastelería Creativa
          <br />
          Creamos el pastel de tus sueños ✨️
          <br />
          Gye-Ecu📍
        </p>
        <div>
          <label style={{ width: "150px" }}>Blog & Clases</label>
          <a
            href="https://www.instagram.com/mariagabriela.chef/"
            target="_blank"
            className="fs-6"
          >
            @mariagabriela.chef
          </a>
        </div>
        <div>
          <label style={{ width: "150px" }}>Tienda de insumos</label>
          <a
            href="https://www.instagram.com/fancake.ec/"
            target="_blank"
            className="fs-6"
          >
            @fancake.ec
          </a>
        </div>
      </div>

      <Detalles />
    </>
  );
}
