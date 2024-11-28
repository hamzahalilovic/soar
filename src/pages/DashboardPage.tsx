import React from "react";
import styled from "styled-components";
import Card from "../components/dashboard/Card";
import TransactionList from "../components/dashboard/TransactionList";
import WeeklyChart from "../components/dashboard/WeeklyChart";
import ExpensesChart from "../components/dashboard/ExpensesChart";
import QuickTransfer from "../components/dashboard/QuickTransfer";
import BalanceHistoryChart from "../components/dashboard/BalanceHistoryChart";

const DashboardWrapper = styled.div`
  padding: 20px;
  display: grid;
  grid-template-rows: auto auto auto;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const Section = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DashboardPage: React.FC = () => {
  const cards = [
    { name: "Savings Card", balance: "5756", number: "xx" },
    { name: "Travel Card", balance: "3120", number: "xx" },
  ];

  const transactions = [
    {
      icon: "",
      description: "Deposit from my Card",
      date: "28 Jan 2021",
      amount: "-850",
    },
    {
      icon: "",
      description: "Deposit Paypal",
      date: "25 Jan 2021",
      amount: "+2500",
    },
    {
      icon: "",
      description: "Jemi Wilson",
      date: "21 Jan 2021",
      amount: "+5400",
    },
  ];

  return (
    <DashboardWrapper>
      {/* Row 1 */}
      <Section>
        <h2>My Cards</h2>
        <div style={{ display: "flex", gap: "20px" }}>
          {cards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </Section>

      <Section>
        <h2>Recent Transactions</h2>
        <TransactionList transactions={transactions} />
      </Section>

      {/* Row 2 */}
      <Section>
        <h2>Weekly Activity</h2>
        <WeeklyChart />
      </Section>

      <Section>
        <h2>Expense Statistics</h2>
        <ExpensesChart />
      </Section>

      {/* Row 3 */}
      <Section>
        <h2>Quick Transfer</h2>
        <QuickTransfer />
      </Section>

      <Section>
        <h2>Balance History</h2>
        <BalanceHistoryChart />
      </Section>
    </DashboardWrapper>
  );
};

export default DashboardPage;
