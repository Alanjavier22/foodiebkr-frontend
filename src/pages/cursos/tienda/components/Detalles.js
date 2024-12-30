import { useEffect, useState, useRef } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { Row, Col, Form, Breadcrumb } from "react-bootstrap";

import AddCart from "../../../../components/AddCart";
import { getMethod } from "../../../../fetch/getMethod";

const Detalles = () => {
  let { id_curso } = useParams();
  const navigate = useNavigate();

  const textareaRef = useRef(null);

  const [data, setData] = useState(null);

  useEffect(() => {
    getMethod({
      path: `/cursos/detalles/${id_curso}`,
      setData: (resp) => setData(resp[0]),
      setIsLoading: () => {},
      showSwal: false,
    });
  }, [id_curso]);

  useEffect(() => {
    if (textareaRef.current) {
      autoResizeTextarea();
    }
  }, [data?.descripcion]);

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Restablecer la altura a 'auto' para calcular correctamente el scrollHeight
      textarea.style.height = `${textarea.scrollHeight}px`; // Ajustar la altura al scrollHeight
    }
  };

  const goToCourse = () => {
    navigate(`/cursos`);
  };

  return (
    <div style={{ minHeight: "70vh" }}>
      <Breadcrumb className="px-5 fs-6 pt-3">
        <Breadcrumb.Item
          onClick={goToCourse}
          id="canvasText"
          className="min-w-14 py-0 text-center font-semibold capitalize tracking-wider"
        >
          Cursos
        </Breadcrumb.Item>
        <Breadcrumb.Item
          active
          className="min-w-14 py-0 text-center font-semibold capitalize tracking-wider"
        >
          {data?.nombre.toLowerCase() || ""}
        </Breadcrumb.Item>
      </Breadcrumb>

      {data && (
        <Row className="align-item-center w-100 pb-3 px-5">
          <Col className="pt-3">
            <div>
              <div className="flex w-full pl-2">
                <Form.Label className="text-[#88e3d5] text-2xl w-full ml-4 px-4 py-3 border-b-2 text-center font-semibold uppercase tracking-wider">
                  {data?.nombre || "-"}
                </Form.Label>
              </div>

              {data?.descripcion && (
                <div className="flex w-full pl-2 pb-0">
                  <Form.Control
                    ref={textareaRef}
                    type="text"
                    size="sm"
                    as="textarea"
                    rows={5}
                    style={{
                      fontSize: "1rem",
                      lineHeight: "1.5rem",
                    }}
                    value={data?.descripcion}
                    disabled
                    className="w-full h-full ml-4 px-4 py-2 border-0 bg-white resize-none text-base text-left font-semibold text-gray-600 tracking-wider"
                  />
                </div>
              )}
            </div>
          </Col>
          <Col lg={6} className="pt-3">
            <div className="pt-7 mt-5" />
            <div className="flex">
              <div className="flex w-full pl-2">
                <Form.Label className="text-[#88e3d5] text-base w-full ml-4 px-4 py-3 border-b-2 text-start font-semibold uppercase tracking-wider">
                  modalidad
                </Form.Label>
              </div>
              <div className="flex w-full pl-2">
                <Form.Label className="text-gray-600 text-base w-full ml-4 px-4 py-3 border-b-2 text-center font-semibold uppercase tracking-wider">
                  {data?.modalidad || ""}
                </Form.Label>
              </div>
            </div>

            <div className="flex">
              <div className="flex w-full pl-2">
                <Form.Label className="text-[#88e3d5] text-base w-full ml-4 px-4 py-3 border-b-2 text-start font-semibold uppercase tracking-wider">
                  valor
                </Form.Label>
              </div>
              <div className="flex w-full pl-2">
                <Form.Label className="text-gray-600 text-base w-full ml-4 px-4 py-3 border-b-2 text-center font-semibold uppercase tracking-wider">
                  ${data?.valor || ""}
                </Form.Label>
              </div>
            </div>

            <div className="flex">
              <div className="flex w-full pl-2">
                <Form.Label className="text-[#88e3d5] text-base w-full ml-4 px-4 py-3 border-b-2 text-start font-semibold uppercase tracking-wider">
                  duracion
                </Form.Label>
              </div>
              <div className="flex w-full pl-2">
                <Form.Label className="text-gray-600 text-base w-full ml-4 px-4 py-3 border-b-2 text-center font-semibold uppercase tracking-wider">
                  {data?.duracion_horas || ""}h
                </Form.Label>
              </div>
            </div>

            <div className="flex">
              <div className="flex w-full pl-2">
                <Form.Label className="text-[#88e3d5] text-base w-full ml-4 px-4 py-3 border-b-2 text-start font-semibold uppercase tracking-wider">
                  Fecha inicio del curso
                </Form.Label>
              </div>
              <div className="flex w-full pl-2">
                <Form.Label className="text-gray-600 text-base w-full ml-4 px-4 py-3 border-b-2 text-center font-semibold uppercase tracking-wider">
                  {data?._fecha_inicio_curso || ""}
                </Form.Label>
              </div>
            </div>

            <div className="flex">
              <div className="flex w-full pl-2">
                <Form.Label className="text-[#88e3d5] text-base w-full ml-4 px-4 py-3 border-b-2 text-start font-semibold uppercase tracking-wider">
                  Fecha fin del curso
                </Form.Label>
              </div>
              <div className="flex w-full pl-2">
                <Form.Label className="text-gray-600 text-base w-full ml-4 px-4 py-3 border-b-2 text-center font-semibold uppercase tracking-wider">
                  {data?._fecha_fin_curso || ""}
                </Form.Label>
              </div>
            </div>

            <div className="flex items-end justify-end w-full pl-2 ml-4 p-4">
              <AddCart item={data} total={data?.valor} />
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Detalles;
