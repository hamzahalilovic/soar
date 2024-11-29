import React from "react";
import styled from "styled-components";

import Card from "../components/dashboard/Card";
import TransactionList from "../components/dashboard/TransactionList";
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

const Section = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
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
        <Section>
          <TransactionList transactions={transactions} />
        </Section>
      </SectionWrapper>

      <SectionWrapper style={{ gridColumn: "1 / 2" }}>
        <Title>Weekly Activity</Title>
        <Section>
          <WeeklyChart />
        </Section>
      </SectionWrapper>

      <SectionWrapper style={{ gridColumn: "2 / 3" }}>
        <Title>Expense Statistics</Title>
        <Section>
          <ExpensesChart />
        </Section>
      </SectionWrapper>

      <CustomRow style={{ gridColumn: "1 / 3" }}>
        <SectionWrapper>
          <Title>Quick Transfer</Title>
          <Section>
            <QuickTransfer />
          </Section>
        </SectionWrapper>

        <SectionWrapper>
          <Title>Balance History</Title>
          <Section>
            <BalanceHistoryChart />
          </Section>
        </SectionWrapper>
      </CustomRow>
    </DashboardWrapper>
  );
};

export default DashboardPage;
