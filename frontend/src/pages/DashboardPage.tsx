import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { fetchCards } from "../redux/slices/cardsSlice";
import { fetchTransactions } from "../redux/slices/transactionsSlice";
import { fetchCharts } from "../redux/slices/chartsSlice";
import { fetchContacts } from "../redux/slices/contactsSlice";
import Card from "../components/dashboard/Card";
import TransactionList from "../components/dashboard/TransactionList";
import WeeklyChart from "../components/dashboard/WeeklyChart";
import ExpensesChart from "../components/dashboard/ExpensesChart";
import BalanceHistoryChart from "../components/dashboard/BalanceHistoryChart";

import { AppDispatch, RootState } from "../redux/store";
import QuickTransfer from "../components/dashboard/QuickTransfer";

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
  grid-template-columns: 2fr 3fr;
  gap: 30px;
`;

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const cards = useSelector((state: RootState) => state.cards.data);
  const transactions = useSelector(
    (state: RootState) => state.transactions.data
  );
  const charts = useSelector((state: RootState) => state.charts.data);
  const contacts = useSelector((state: RootState) => state.contacts.data);

  const { weeklyActivity, balanceHistory, expenseStatistics } = charts || {};

  useEffect(() => {
    dispatch(fetchCards());
    dispatch(fetchTransactions());
    dispatch(fetchCharts());
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <DashboardWrapper>
      <SectionWrapper style={{ gridColumn: "1 / 2" }}>
        <Title>My Cards</Title>
        <div style={{ display: "flex", gap: "20px" }}>
          {cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              cardholderName={card.cardholderName}
              balance={card.balance}
              cardNumber={card.cardNumber}
              expiryDate={card.expiryDate}
              themeVariant={cards.indexOf(card) % 2 === 0 ? "dark" : "light"}
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
        {weeklyActivity && <WeeklyChart weeklyActivity={weeklyActivity} />}
      </SectionWrapper>
      <SectionWrapper style={{ gridColumn: "2 / 3" }}>
        <Title>Expense Statistics</Title>
        {expenseStatistics && <ExpensesChart data={expenseStatistics} />}
      </SectionWrapper>
      <CustomRow style={{ gridColumn: "1 / 3" }}>
        <SectionWrapper>
          <Title>Quick Transfer</Title>
          <QuickTransfer contacts={contacts} />
        </SectionWrapper>
        <SectionWrapper>
          <Title>Balance History</Title>
          {balanceHistory && (
            <BalanceHistoryChart balanceHistory={balanceHistory} />
          )}
        </SectionWrapper>
      </CustomRow>
    </DashboardWrapper>
  );
};

export default DashboardPage;
