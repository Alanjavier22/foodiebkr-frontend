import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const TooltipCustom = ({
  children,
  placement = "top",
  descripcion = "Esto es una descripción",
}) => {
  return (
    <OverlayTrigger
      placement={placement}
      overlay={<Tooltip id="tooltip-top">{descripcion}</Tooltip>}
    >
      {children}
    </OverlayTrigger>
  );
};

export default TooltipCustom;
