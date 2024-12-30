import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { getMethod } from "../../../fetch/getMethod";
import MyProgressBar from "../../../components/MyProgressBar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ path, text, scale = {}, isnumeric = false }) => {
  const { textY = "", textX = "" } = scale;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getMethod({
      path: `/dashboard/${path}`,
      setData,
      showSwal: false,
      setIsLoading,
    });
  }, [path]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: text.toUpperCase(),
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return isnumeric ? `$${context.raw}` : context.raw;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: textX,
          color: "skyblue",
          font: {
            family: "Comic Sans MS",
            size: 20,
            weight: "bold",
            lineHeight: 1.2,
          },
          padding: { top: 20, left: 0, right: 0, bottom: 0 },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: textY,
          color: "skyblue",
          font: {
            family: "Comic Sans MS",
            size: 20,
            lineHeight: 1.2,
          },
          padding: { top: 30, left: 0, right: 0, bottom: 30 },
        },
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return isnumeric ? `$${value}` : value;
          },
        },
      },
    },
  };

  if (isLoading) return <MyProgressBar message="Cargando graficas..." />;

  return <Line data={data} options={options} />;
};

export default LineChart;
