import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

import styled from "styled-components";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Wrapper = styled.div`
  height: 276px;
  display: flex;
  padding: 25px 20px;

  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background-color: white;
`;

const BalanceHistoryChart: React.FC = () => {
  const data = {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
    datasets: [
      {
        label: "Balance",
        data: [200, 400, 600, 200, 400, 700, 600],
        borderColor: "#1814F3",
        borderWidth: 3,
        fill: "start",
        tension: 0.4,
        pointRadius: 0,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, "rgba(45, 96, 255, 0)");
          gradient.addColorStop(1, "rgba(45, 96, 255, 0.25)");
          return gradient;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 12,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "#E6EFF5",
          borderDash: [5, 5],
        },
        ticks: {
          color: "#8BA3CB",
          font: {
            size: 12,
          },
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#E6EFF5",
          borderDash: [5, 5],
        },
        ticks: {
          color: "#8BA3CB",
          font: {
            size: 12,
          },
        },
        border: {
          display: false,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <Wrapper>
      <Line data={data} options={options} updateMode="resize" />
    </Wrapper>
  );
};

export default BalanceHistoryChart;
