import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
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
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

const RadarChart = ({ path, text, scale = {}, isnumeric = false }) => {
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
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          callback: function (value) {
            return isnumeric ? `$${value}` : value;
          },
        },
        pointLabels: {
          font: {
            family: "Comic Sans MS",
            size: 13,
          },
          color: "skyblue",
        },
      },
    },
  };

  if (isLoading) return <MyProgressBar message="Cargando graficas..." />;

  return <Radar data={data} options={options} style={{ maxHeight: "90vh" }} />;
};

export default RadarChart;
