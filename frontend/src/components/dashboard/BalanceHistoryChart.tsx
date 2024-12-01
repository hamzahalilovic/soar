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
import { BalanceHistory } from "../../types/Chart";

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

interface BalanceHistoryChartProps {
  balanceHistory: BalanceHistory;
}

const Wrapper = styled.div`
  height: 276px;
  display: flex;
  padding: 25px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background-color: white;
`;

const BalanceHistoryChart: React.FC<BalanceHistoryChartProps> = ({
  balanceHistory,
}) => {
  const data = {
    labels: balanceHistory.labels,
    datasets: [
      {
        label: "Balance",
        data: balanceHistory.balances,
        borderColor: "#1814F3",
        borderWidth: 3,
        fill: "start",
        tension: 0.4,
      },
    ],
  };

  return (
    <Wrapper>
      <Line data={data} options={{ responsive: true }} />
    </Wrapper>
  );
};

export default BalanceHistoryChart;
