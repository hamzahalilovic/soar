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
import { WeeklyActivity } from "../../types/Chart";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

interface WeeklyChartProps {
  weeklyActivity: WeeklyActivity;
}

const Wrapper = styled.div`
  height: 322px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background-color: white;
`;

const WeeklyChart: React.FC<WeeklyChartProps> = ({ weeklyActivity }) => {
  const data = {
    labels: weeklyActivity.labels,
    datasets: [
      {
        label: "Deposit",
        data: weeklyActivity.deposit,
        backgroundColor: "#396AFF",
        borderRadius: 15,
        barThickness: 15,
      },
      {
        label: "Withdraw",
        data: weeklyActivity.withdraw,
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
        grid: { display: false },
        ticks: { color: "#8BA3CB", font: { size: 14 } },
        border: { display: false },
      },
      y: {
        grid: { color: "#F3F3F5" },
        ticks: { color: "#8BA3CB", font: { size: 14 } },
        border: { display: false },
        beginAtZero: true,
      },
    },
    layout: {
      padding: { top: 20, right: 20, bottom: 20, left: 20 },
    },
    elements: {
      bar: { borderRadius: 15, borderSkipped: false },
    },
  };

  return (
    <Wrapper>
      <Bar data={data} options={options as any} />
    </Wrapper>
  );
};

export default WeeklyChart;
