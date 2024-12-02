import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import styled from "styled-components";
import { ExpenseCategory } from "../../types/Chart";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpensesChartProps {
  data: ExpenseCategory[];
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
  }
`;

const ExpensesChart: React.FC<ExpensesChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Expenses",
        data: data.map((item) => item.value),
        backgroundColor: ["#343C6A", "#FC7900", "#396AFF", "#232323"],
        borderColor: "#FFFFFF",
        borderWidth: 9.24,
        hoverOffset: 4,
        offset: [0, 15, -5, 5],
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
        bodyFont: {
          size: 14,
        },
        callbacks: {
          label: (tooltipItem: any) => {
            const label = chartData.labels[tooltipItem.dataIndex];
            const value = chartData.datasets[0].data[tooltipItem.dataIndex];
            return `${label}: ${value}%`;
          },
        },
      },
    },
  };
  const customLabelsPlugin = {
    id: "customLabels",
    beforeDraw(chart: any) {
      const { ctx, data: chartData } = chart;
      const dataset = chartData.datasets[0];
      const total = dataset.data.reduce(
        (acc: number, value: number) => acc + value,
        0
      );

      ctx.save();

      chart.getDatasetMeta(0).data.forEach((arc: any, index: number) => {
        const { x, y } = arc.tooltipPosition();
        const value = dataset.data[index];
        const percentage = ((value / total) * 100).toFixed(0);
        const label = chartData.labels[index];

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(`${percentage}%`, x, y - 10);
        ctx.fillText(label, x, y + 10);
      });

      ctx.restore();
    },
  };

  ChartJS.register(customLabelsPlugin);

  return (
    <Wrapper>
      <Pie data={chartData} options={options as any} />
    </Wrapper>
  );
};

export default ExpensesChart;
