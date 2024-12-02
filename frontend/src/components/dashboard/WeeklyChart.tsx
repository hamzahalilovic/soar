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

  @media (max-width: 768px) {
    width: 325px;
    height: 250px;
  }
`;

const WeeklyChart: React.FC<WeeklyChartProps> = ({ weeklyActivity }) => {
  const data = {
    labels: weeklyActivity.labels,
    datasets: [
      {
        label: "Deposit",
        data: weeklyActivity.deposit,
        backgroundColor: "#396AFF",
        borderRadius: 10,
        barThickness: 12,
      },
      {
        label: "Withdraw",
        data: weeklyActivity.withdraw,
        backgroundColor: "#232323",
        borderRadius: 10,
        barThickness: 12,
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
          padding: 8,
          color: "#8BA3CB",
          font: {
            size: 12,
            weight: "bold" as const,
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#8BA3CB",
          font: { size: 11 },
        },
        border: { display: false },
        offset: true,
        categoryPercentage: 0.6,
        categorySpacing: 0.2,
      },
      y: {
        grid: { color: "#F3F3F5" },
        ticks: { color: "#8BA3CB", font: { size: 11 } },
        border: { display: false },
        beginAtZero: true,
      },
    },
    layout: {
      padding: { top: 15, right: 15, bottom: 15, left: 15 },
    },
    elements: {
      bar: { borderRadius: 10, borderSkipped: false },
    },
  };

  return (
    <Wrapper>
      <Bar data={data} options={options as any} />
    </Wrapper>
  );
};

export default WeeklyChart;
