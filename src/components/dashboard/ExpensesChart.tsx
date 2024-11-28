import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesChart: React.FC = () => {
  const data = {
    labels: ["Entertainment", "Bills", "Investments", "Others"],
    datasets: [
      {
        label: "Expenses",
        data: [300, 200, 150, 100],
        backgroundColor: ["red", "green", "blue", "yellow"],
      },
    ],
  };

  return <Pie data={data} />;
};

export default ExpensesChart;
