import { useState, useEffect } from "react";

import { Card, Form } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import { BsCashCoin } from "react-icons/bs";

import { getMethod } from "../../../fetch/getMethod";

const CardDashboard = ({ path, label, icon }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getMethod({
      path: `/dashboard/${path}`,
      setData,
      showSwal: false,
      setIsLoading: () => {},
    });
  }, [path]);

  return (
    <Card className="flex flex-row" style={{ height: "100%" }}>
      <div className="flex flex-col justify-between w-4/5">
        <Form.Label className="w-full px-4 pt-3 font-semibold text-[#88e3d5] text-lg uppercase tracking-wider">
          {label}
        </Form.Label>
        <Form.Label className="w-full px-4 pb-2 font-semibold text-gray-600 text-base uppercase tracking-wider">
          ${data && data.total_ventas ? data.total_ventas : "0.00"}
        </Form.Label>
      </div>

      {icon === "shop" && (
        <FiShoppingCart
          className="text-gray-600 m-auto pr-5"
          style={{ fontSize: "80px" }}
        />
      )}

      {icon === "cash" && (
        <BsCashCoin
          className="text-gray-600 m-auto pr-5"
          style={{ fontSize: "80px" }}
        />
      )}
    </Card>
  );
};

export default CardDashboard;
