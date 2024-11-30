import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const Wrapper = styled.div`
  height: 322px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background-color: white;
`;

const WeeklyChart: React.FC = () => {
  const data = {
    labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Deposit",
        data: [200, 300, 400, 300, 500, 600, 400],
        backgroundColor: "#396AFF",
        borderRadius: 15,
        barThickness: 15,
      },
      {
        label: "Withdraw",
        data: [400, 500, 300, 600, 200, 300, 500],
        backgroundColor: "#232323",
        borderRadius: 15,
        barThickness: 15,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        align: "end",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 15,
          padding: 30,
          color: "#8BA3CB",
          font: {
            size: 14,
            weight: "bold" as const,
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: true,
          color: "#8BA3CB",
          font: {
            size: 14,
          },
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
          color: "#F3F3F5",
        },
        ticks: {
          display: true,
          color: "#8BA3CB",
          font: {
            size: 14,
          },
        },
        border: {
          display: false,
        },
        beginAtZero: true,
      },
    },
    layout: {
      padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      },
    },
    elements: {
      bar: {
        borderRadius: 15,
        borderSkipped: false,
      },
    },
  };

  return (
    <Wrapper>
      <Bar data={data} options={options as any} />
    </Wrapper>
  );
};

export default WeeklyChart;
