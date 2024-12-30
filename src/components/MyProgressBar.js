import React, { useState, useEffect } from "react";
import { ProgressBar, Form } from "react-bootstrap";

const MyProgressBar = ({ message }) => {
  const [progress, setProgress] = useState(20); // Estado inicial en 20

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress < 90) {
          // Incrementa hasta 90
          return oldProgress + 1; // Puedes ajustar el incremento
        } else {
          clearInterval(interval); // Detén el intervalo cuando se alcanza 90
          return oldProgress;
        }
      });
    }, 50); // Incrementa cada 50 ms (ajusta según sea necesario)

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);

  return (
    <div>
      {message && (
        <Form.Label
          className="w-full px-4 pt-5 pb-2 text-xs  font-semibold text-gray-600 uppercase tracking-wider"
        >
          {message}
        </Form.Label>
      )}
      <ProgressBar animated now={progress} />
    </div>
  );
};

export default MyProgressBar;
