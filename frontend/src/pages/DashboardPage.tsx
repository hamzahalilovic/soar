import React, { useEffect } from "react";
import styled from "styled-components";

import Card from "../components/dashboard/Card";
import TransactionList, {
  Transaction,
} from "../components/dashboard/TransactionList";
import WeeklyChart from "../components/dashboard/WeeklyChart";
import ExpensesChart from "../components/dashboard/ExpensesChart";
import QuickTransfer from "../components/dashboard/QuickTransfer";
import BalanceHistoryChart from "../components/dashboard/BalanceHistoryChart";

const DashboardWrapper = styled.div`
  padding: 24px 40px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  row-gap: 24px;
  column-gap: 30px;
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: 600;
  color: #343c6a;
`;

const CustomRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 20px;
`;

const DashboardPage: React.FC = () => {
  const cards = [
    { name: "Savings Card", balance: "5756", number: "3778222312341234" },
    { name: "Travel Card", balance: "3120", number: "3778222312342555" },
  ];

  const transactions: Transaction[] = [
    {
      icon: "cardDeposit",
      description: "Deposit from my Card",
      type: "deposit-card",
      date: "28 Jan 2021",
      amount: "-850",
    },
    {
      icon: "paypal",
      description: "Deposit Paypal",
      type: "deposit-paypal",
      date: "25 Jan 2021",
      amount: "+2500",
    },
    {
      icon: "transfer",
      description: "Jemi Wilson",
      type: "transfer",
      date: "21 Jan 2021",
      amount: "+5400",
    },
    {
      icon: "cardDeposit",
      description: "Deposit from my Card",
      type: "deposit-card",
      date: "28 Jan 2021",
      amount: "-850",
    },
    {
      icon: "paypal",
      description: "Deposit Paypal",
      type: "deposit-paypal",
      date: "25 Jan 2021",
      amount: "+2500",
    },
    {
      icon: "transfer",
      description: "Jemi Wilson",
      type: "transfer",
      date: "21 Jan 2021",
      amount: "+5400",
    },
  ];

  return (
    <DashboardWrapper>
      <SectionWrapper style={{ gridColumn: "1 / 2" }}>
        <Title>My Cards</Title>

        <div style={{ display: "flex", gap: "20px" }}>
          {cards.map((card, index) => (
            <Card
              key={index}
              {...card}
              themeVariant={index % 2 === 0 ? "dark" : "light"}
            />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper style={{ gridColumn: "2 / 3" }}>
        <Title>Recent Transactions</Title>
        <TransactionList transactions={transactions} />
      </SectionWrapper>

      <SectionWrapper style={{ gridColumn: "1 / 2" }}>
        <Title>Weekly Activity</Title>

        <WeeklyChart />
      </SectionWrapper>

      <SectionWrapper style={{ gridColumn: "2 / 3" }}>
        <Title>Expense Statistics</Title>

        <ExpensesChart />
      </SectionWrapper>

      <CustomRow style={{ gridColumn: "1 / 3" }}>
        <SectionWrapper>
          <Title>Quick Transfer</Title>

          <QuickTransfer />
        </SectionWrapper>

        <SectionWrapper>
          <Title>Balance History</Title>

          <BalanceHistoryChart />
        </SectionWrapper>
      </CustomRow>
    </DashboardWrapper>
  );
};

export default DashboardPage;
