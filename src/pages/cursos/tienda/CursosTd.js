import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Col, Row, Button, Card, Badge } from "react-bootstrap";

import { getMethod } from "../../../fetch/getMethod";

const CursosTd = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getMethod({
      path: `/cursos/true`,
      setData,
      setIsLoading: () => {},
      showSwal: false,
    });
  }, []);

  const goToDetails = (item) => {
    navigate(`/cursos/${item.id_cursos}/${item.nombre}`);
  };

  return (
    <div
      className="flex flex-col justify-center items-center gap-6 py-3 bg-[#f4fffe9e]"
      style={{ minHeight: "75vh" }}
    >
      {data &&
        data.map((item) => {
          return (
            <Card
              key={item.id_cursos}
              className="flex flex-row-reverse"
              style={{ width: "70%" }}
            >
              <Row className="">
                <Col md={12} xl={6}>
                  <Card.Body className="flex flex-col h-full justify-between">
                    <div>
                      <Card.Title className="px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        {item.nombre}
                      </Card.Title>
                      <Card.Text className="w-full h-full px-2 py-2 text-left text-xs font-semibold text-gray-600 tracking-wider">
                        {item.primeraLineaDescripcion}
                      </Card.Text>
                    </div>
                    <div>
                      <Badge
                        bg="secondary"
                        className="bg-slate-400 px-4 py-1 mx-3 my-3 border-0 rounded-3 tracking-wider"
                      >
                        {item.modalidad}
                      </Badge>
                      <Badge
                        bg="secondary"
                        className="bg-slate-400 px-4 py-1 mx-3 my-3 border-0 rounded-3 tracking-wider"
                      >
                        Duración {item.duracion_horas}h
                      </Badge>
                    </div>
                  </Card.Body>
                </Col>
                <Col md={12} xl={6}>
                  <Card.Header className="flex flex-col w-full h-full p-0 bg-white">
                    <Card.Img
                      variant="top"
                      alt={item.nombre}
                      src={item.foto || "./logo.png"}
                      style={{ maxHeight: "200px", maxWidth: "400px" }}
                      className="self-center mt-3"
                    />
                    <Button
                      className="btnStore bg-slate-400 px-4 py-2 mx-3 my-3 border-0 rounded-3 tracking-wider"
                      onClick={() => goToDetails(item)}
                      style={{ minWidth: "300px" }}
                    >
                      Más detalles del curso
                    </Button>
                  </Card.Header>
                </Col>
              </Row>
            </Card>
          );
        })}
    </div>
  );
};

export default CursosTd;
