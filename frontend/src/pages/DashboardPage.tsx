import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { fetchCards } from "../redux/slices/cardsSlice";
import { fetchTransactions } from "../redux/slices/transactionsSlice";
import { fetchCharts } from "../redux/slices/chartsSlice";
import { fetchContacts } from "../redux/slices/contactsSlice";
import { AppDispatch, RootState } from "../redux/store";

const Card = lazy(() => import("../components/dashboard/Card"));
const TransactionList = lazy(
  () => import("../components/dashboard/TransactionList")
);
const WeeklyChart = lazy(() => import("../components/dashboard/WeeklyChart"));
const ExpensesChart = lazy(
  () => import("../components/dashboard/ExpensesChart")
);
const BalanceHistoryChart = lazy(
  () => import("../components/dashboard/BalanceHistoryChart")
);
const QuickTransfer = lazy(
  () => import("../components/dashboard/QuickTransfer")
);

const DashboardWrapper = styled.div`
  padding: 24px 40px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  row-gap: 24px;
  column-gap: 30px;

  @media (max-width: 768px) {
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
  }
`;

const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
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

const CardsTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: flex;

    padding-left: 40px;
    padding-right: 40px;
  }
`;

const CustomRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 30px;
  grid-column: 1/3;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const SeeAllButton = styled.button`
  background: none;
  border: none;
  color: #343c6a;
  font-size: 22px;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  padding: 0;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: none;
  }
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
        <CardsTitleWrapper>
          <Title>My Cards</Title>
          <SeeAllButton onClick={() => {}}>See All</SeeAllButton>
        </CardsTitleWrapper>

        <CardsWrapper>
          <Suspense fallback={<div>Loading cards...</div>}>
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
          </Suspense>
        </CardsWrapper>
      </SectionWrapper>

      <SectionWrapper style={{ gridColumn: "2 / 3" }}>
        <Title>Recent Transactions</Title>
        <Suspense fallback={<div>Loading transactions...</div>}>
          <TransactionList transactions={transactions} />
        </Suspense>
      </SectionWrapper>

      <SectionWrapper style={{ gridColumn: "1 / 2" }}>
        <Title>Weekly Activity</Title>
        <Suspense fallback={<div>Loading Weekly Activity...</div>}>
          {weeklyActivity && <WeeklyChart weeklyActivity={weeklyActivity} />}
        </Suspense>
      </SectionWrapper>

      <SectionWrapper style={{ gridColumn: "2 / 3" }}>
        <Title>Expense Statistics</Title>
        <Suspense fallback={<div>Loading Expense Statistics...</div>}>
          {expenseStatistics && <ExpensesChart data={expenseStatistics} />}
        </Suspense>
      </SectionWrapper>

      <CustomRow>
        <SectionWrapper>
          <Title>Quick Transfer</Title>
          <Suspense fallback={<div>Loading Quick Transfer...</div>}>
            <QuickTransfer contacts={contacts} />
          </Suspense>
        </SectionWrapper>

        <SectionWrapper>
          <Title>Balance History</Title>
          <Suspense fallback={<div>Loading Balance History...</div>}>
            {balanceHistory && (
              <BalanceHistoryChart balanceHistory={balanceHistory} />
            )}
          </Suspense>
        </SectionWrapper>
      </CustomRow>
    </DashboardWrapper>
  );
};

export default DashboardPage;
