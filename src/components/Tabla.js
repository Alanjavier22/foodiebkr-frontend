import { useEffect, useRef, useState } from "react";

import { Form, Button, Table, Card, Image, Spinner } from "react-bootstrap";

import { FaRegEye, FaPencilAlt, FaRegFileImage } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";

import PaginationTabla from "./PaginationTabla";

const Tabla = (props) => {
  const {
    children,
    rows,
    columns,
    detalles,
    editar,
    foto,
    loading,
    showTotal = false,
    selected = {},
    title,
    subtitle,
    actionBtn,
    generarPdf,
  } = props;

  const {
    isLoading,
    noData = true,
    textNoData = "NO DATA",
    textLoading = "Cargando datos...",
  } = loading;

  const { enabled = false, selectedRows, setSelectedRows } = selected;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handlePageChange = (page) => setCurrentPage(page);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rows?.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [rows]);

  const handleRowClick = (item) => {
    if (selectedRows.some((row) => row.id === item.id)) {
      setSelectedRows(selectedRows.filter((row) => row.id !== item.id));
    } else {
      setSelectedRows([...selectedRows, item]);
    }
  };

  const handleRowAll = () => {
    if (selectedRows.length === 0) setSelectedRows(rows);
    else setSelectedRows([]);
  };

  return (
    <div
      className="border-0 m-auto pt-1 w-full px-4"
      style={{ minHeight: "50vh" }}
    >
      {children}
      {showTotal && rows && (
        <p className="text-sm px-2 mb-0 pb-3 capitalize underline">
          * {rows?.length} resultados obtenidos
        </p>
      )}
      <Card
        className="w-full flex justify-between"
        style={{ maxHeight: "83vh" }}
      >
        {title && (
          <div className="flex w-full px-2 items-center border-b-2">
            {generarPdf && rows?.length !== 0 && (
              <button
                className="pl-3 ml-1 my-1 py-2 border-b-2 border-0 rounded-3"
                onClick={generarPdf}
                style={{ width: "250px" }}
              >
                <div className="flex justify-between items-center cursor-pointer">
                  <FaRegFilePdf
                    style={{ fontSize: "27px", marginLeft: "5px" }}
                  />
                  <Form.Label className="w-full py-3 pl-2 mb-0 text-start text-xs cursor-pointer font-semibold text-gray-600 uppercase tracking-wider">
                    Generar PDF
                  </Form.Label>
                </div>
              </button>
            )}
            <Form.Label className="w-full px-4 py-3 mb-0 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
              {title}
            </Form.Label>
            {actionBtn && <div className="w-auto"> {actionBtn} </div>}
          </div>
        )}
        {subtitle && (
          <div className="flex w-full px-2 items-center">
            <Form.Label className="w-full px-4 py-3 mb-0 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              {subtitle}
            </Form.Label>
          </div>
        )}

        <Table responsive="xl" className="border-hidden">
          <thead>
            <tr>
              {columns &&
                columns.map((item) => {
                  return (
                    <th
                      id="thBg"
                      key={item.header}
                      style={{ minWidth: item.width }}
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {item.field === "check" ? (
                        <div className="flex">
                          {rows && (
                            <Form.Check
                              type="checkbox"
                              checked={selectedRows.length !== 0}
                              onClick={handleRowAll}
                              className="check-tabla"
                            />
                          )}
                          <Form.Label
                            onClick={rows ? handleRowAll : null}
                            className="ml-2 text-wrap"
                          >
                            Seleccionar Todos
                          </Form.Label>
                        </div>
                      ) : (
                        item.header
                      )}
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody>
            {isLoading && !noData && (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  <div
                    className="d-flex flex-col align-items-center justify-content-center h-full"
                    style={{ minHeight: "300px" }}
                  >
                    <div className="pt-2">{textNoData}</div>
                  </div>
                </td>
              </tr>
            )}
            {noData && !rows && (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  <div
                    className="d-flex flex-col align-items-center justify-content-center h-full"
                    style={{ minHeight: "300px" }}
                  >
                    <Spinner animation="border" />
                    <div className="pt-2">{textLoading}</div>
                  </div>
                </td>
              </tr>
            )}
            {rows &&
              currentItems.map((item, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => (enabled ? handleRowClick(item) : null)}
                  style={{
                    background: selectedRows?.includes(item.id)
                      ? "lightblue"
                      : "white",
                  }}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      width={column.width || "auto"}
                      className={`border-b border-gray-200 bg-white text-sm align-middle text-${
                        column.align || "center"
                      }`}
                      style={{
                        padding:
                          column.field === "imagen" ? "0.5rem 2rem" : "1rem",
                      }}
                    >
                      {column.field === "-" && (
                        <>
                          {editar && (
                            <Button
                              className="btnStore bg-slate-400 px-4 mx-1 my-1 py-2 border-0 rounded-3"
                              onClick={() => editar(item, true)}
                            >
                              <FaPencilAlt />
                            </Button>
                          )}
                          {foto &&
                            !item?.imagenPago &&
                            item.estado !== "No Atendido" && (
                              <Button
                                className="btnStore bg-slate-400 px-4 mx-1 my-1 py-2 border-0 rounded-3"
                                onClick={() => foto(item)}
                              >
                                <FaRegFileImage />
                              </Button>
                            )}
                          {detalles && (
                            <Button
                              className="btnStore bg-slate-400 px-4 mx-1 my-1 py-2 border-0 rounded-3"
                              onClick={() => detalles(item)}
                            >
                              <FaRegEye />
                            </Button>
                          )}
                        </>
                      )}

                      {column.field === "check" && (
                        <Form.Check
                          type="checkbox"
                          checked={selectedRows.some(
                            (row) => row.id === item.id
                          )}
                          onChange={() => handleRowClick(item)}
                          className="check-tabla"
                        />
                      )}

                      {column.field === "imagen" && (
                        <div className="flex justify-center align-middle items-center w-full h-16">
                          <div className="m-auto h-full w-20 min-w-20">
                            <Image
                              src={item[column.field]}
                              className="m-auto w-full h-full"
                              rounded
                            />
                          </div>
                        </div>
                      )}

                      {column.field === "index" && `${rowIndex + 1}`}

                      {column.field === "precio_estimado" &&
                        `$${
                          parseFloat(item[column.field])
                            .toString()
                            .split(".")[0]
                        }.${
                          parseFloat(item[column.field])
                            .toString()
                            .split(".")[1] || "00"
                        }`}

                      {column.field !== "imagen" &&
                        column.field !== "precio_estimado" &&
                        column.field !== "index" &&
                        column.field !== "check" &&
                        column.field !== "-" &&
                        item[column.field]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </Table>

        {rows && (
          <PaginationTabla
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={rows.length}
            handlePageChange={handlePageChange}
          />
        )}
      </Card>
    </div>
  );
};

export default Tabla;
