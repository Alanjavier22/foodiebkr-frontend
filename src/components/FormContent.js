import { useEffect } from "react";
import { Col, Form, Button, InputGroup } from "react-bootstrap";

import { AiOutlineClear } from "react-icons/ai";

const FormHeader = ({ title, className = "text-xs text-center pt-5" }) => (
  <Form.Label
    className={`w-full px-4 pb-2 font-semibold text-gray-600 uppercase tracking-wider ${className}`}
  >
    {title}
  </Form.Label>
);

const FormSubheader = ({ text }) => (
  <Form.Label
    className="w-full px-4 pb-4 font-semibold text-gray-600 uppercase tracking-wider"
    style={{ fontSize: "10px" }}
  >
    {text}
  </Form.Label>
);
const FormText = ({ text, required }) => (
  <Form.Label className="w-2/5 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
    {required && (
      <span className="text-red-500" style={{ fontSize: "1rem" }}>
        *
      </span>
    )}
    {text}
  </Form.Label>
);

const FormControl = ({
  label,
  name,
  value,
  handleChange,
  handleBlur,
  isInvalid,
  errorsMsg,
  rows,
  maxLength,
  disabled,
  type = "text",
  min = "",
  max = "",
  requerido = true,
  fullCol = false,
  directionColumn = false,
  comprobation,
}) => {
  const classNameGroup = directionColumn
    ? "flex items-center w-full pt-3 pb-2 pl-2 pr-4"
    : "w-full pt-3 pb-2";
  const classNameLabel = directionColumn
    ? "w-2/5 px-4 py-3 border-b-2 pb-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
    : "w-full text-start pl-3 ml-2 text-xs font-semibold text-gray-600 uppercase tracking-wider";

  useEffect(() => {
    if (value === "" && comprobation) comprobation();
  }, [value]);

  return (
    <>
      <Form.Group controlId={name} className={classNameGroup}>
        <Form.Label
          id={fullCol ? "Ajuste-text" : ""}
          className={classNameLabel}
        >
          {requerido && (
            <span className="text-red-500" style={{ fontSize: "1rem" }}>
              *
            </span>
          )}
          {label}
        </Form.Label>
        <div className="w-full">
          <Form.Control
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={isInvalid}
            disabled={disabled}
            maxLength={maxLength || 75}
            as={rows ? "textarea" : "input"}
            rows={rows || 1}
            min={min}
            max={max}
            style={{
              resize: "none",
              paddingRight: type === "date" ? "2rem" : "0.5rem",
            }}
            className="w-full h-full ml-4 pl-2 py-2 border-b-2 text-left text-xs font-semibold text-gray-600 tracking-wider"
          />

          <Form.Control.Feedback type="invalid" className="ml-4">
            {errorsMsg}
          </Form.Control.Feedback>
        </div>
      </Form.Group>
    </>
  );
};

const FormCol = ({
  label,
  name,
  handleChange,
  value,
  rows,
  maxLength,
  requerido = true,
  disabled = false,
  fullCol = false,
}) => (
  <>
    <Col md={12} xl={fullCol ? 12 : 6}>
      <div className="flex w-full pl-2 items-center">
        <Form.Label
          id={fullCol ? "Ajuste-text" : ""}
          className="w-2/5 px-4 py-3 border-b-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
        >
          {requerido && (
            <span className="text-red-500" style={{ fontSize: "1rem" }}>
              *
            </span>
          )}
          {label}
        </Form.Label>
        <Form.Control
          type="text"
          size="sm"
          as={rows ? "textarea" : "input"}
          rows={rows || 1}
          name={name}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          maxLength={maxLength || 25}
          style={{ resize: "none" }}
          className="w-full h-full ml-4 px-2 py-2 border-b-2 text-left text-xs font-semibold text-gray-600 tracking-wider"
        />
      </div>
    </Col>
  </>
);

const FormSelect = ({
  label,
  name,
  handleChange,
  value,
  disabled,
  requerido = true,
  resetData,
  md = 12,
  children,
}) => (
  <>
    <Col md={md} xl={6}>
      <div className="flex items-center w-full pt-3 pb-0 pl-2 pr-4">
        <Form.Label className="w-2/5 px-4 py-3 border-b-2 pb-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
          {requerido && (
            <span className="text-red-500" style={{ fontSize: "1rem" }}>
              *
            </span>
          )}
          {label}
        </Form.Label>
        <InputGroup className="mb-3">
          <Form.Select
            name={name}
            size="sm"
            value={value}
            onChange={handleChange}
            disabled={disabled}
            className="w-full h-full ml-4 px-4 py-2 my-0 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            <option value="-" disabled>
              Selecciona una opción
            </option>
            {children}
          </Form.Select>
          {resetData && (
            <Button
              className="btnEdit bg-slate-400 px-3 py-2 border-0"
              onClick={resetData}
              disabled={value === "-"}
            >
              <AiOutlineClear />
            </Button>
          )}
        </InputGroup>
      </div>
    </Col>
  </>
);

const FormSearching = ({
  label,
  handleChange,
  value,
  requerido = true,
  select,
  input,
  button,
  style,
}) => (
  <>
    <InputGroup
      className="flex flex-wrap m-0 px-4 py-2 rounded-0 boxShadowInput bg-[#F7F7F7]"
      style={style}
    >
      {label && (
        <Form.Label className="w-28 px-4 mt-2 pt-1 py-0 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
          {requerido && (
            <span className="text-red-500" style={{ fontSize: "1rem" }}>
              *
            </span>
          )}
          {label}
        </Form.Label>
      )}
      {select && (
        <>
          <Form.Select
            name={select.name}
            size="sm"
            value={select.value}
            onChange={handleChange}
            style={{ maxWidth: "230px" }}
            className="w-full ml-4 px-4 py-0 my-0 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            <option value="-" disabled>
              Selecciona una opción
            </option>
            {select.options}
          </Form.Select>
        </>
      )}

      <Form.Control
        type="text"
        size="sm"
        placeholder={input?.placeholder || ""}
        name={input.name}
        value={input.value}
        onChange={input?.handleChange}
        onKeyDown={input.handleKeyDown}
        maxLength={input?.maxLength || 75}
        className="w-full h-full ml-4 px-2 py-2 border-b-2 text-left text-xs font-semibold text-gray-600 tracking-wider"
      />
      <Button
        className="h-full border-0 pt-2 text-white font-semibold capitalize tracking-wide"
        style={{ fontSize: "14px" }}
        variant="secondary"
        disabled={button.disabled}
        onClick={button.onclick}
      >
        {button.name}
      </Button>
    </InputGroup>
  </>
);

export {
  FormHeader,
  FormSubheader,
  FormText,
  FormControl,
  FormCol,
  FormSelect,
  FormSearching,
};
