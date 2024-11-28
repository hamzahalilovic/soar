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

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const WeeklyChart: React.FC = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Deposits",
        data: [300, 500, 200, 800, 600, 100, 700],
        backgroundColor: "blue",
      },
      {
        label: "Withdrawals",
        data: [200, 300, 400, 300, 500, 600, 400],
        backgroundColor: "red",
      },
    ],
  };

  return <Bar data={data} />;
};

export default WeeklyChart;
