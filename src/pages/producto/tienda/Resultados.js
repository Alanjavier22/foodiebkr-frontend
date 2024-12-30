import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { Row, Col, Form } from "react-bootstrap";

import Servicios from "../../../components/Servicios";
import { getMethod } from "../../../fetch/getMethod";

export default function Resultados() {
  let { nombre } = useParams();

  const [data, setData] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const [totalMostrado, setTotalMostrado] = useState(0);

  useEffect(() => {
    setIsLoading(true);

    getMethod({
      path: `/producto/buscar/${nombre}/-`,
      setData,
      setIsLoading,
      showSwal: false,
    });
  }, [nombre]);

  return (
    <>
      <div className="px-0 py-4">
        <Row className="flex w-full justify-center items-center px-2 mt-2">
          <Col mdlg={12}>
            <Form.Label className="w-full px-2 py-0 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Mostrando {totalMostrado} de {data.length} resultados
            </Form.Label>
          </Col>
        </Row>

        {data && (
          <Servicios
            item={data}
            categoria={"producto"}
            detalle={true}
            IsLoading={IsLoading}
            totalMostrado={(x) => setTotalMostrado(x)}
            search={true}
          />
        )}
      </div>
    </>
  );
}
