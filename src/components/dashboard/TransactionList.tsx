import React from "react";
import styled from "styled-components";

interface Transaction {
  icon: string;
  description: string;
  date: string;
  amount: string;
}

const ListWrapper = styled.ul`
  list-style: none;
  padding: 0;
`;

const TransactionItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #ddd;
`;

const TransactionDetails = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  background-color: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

const TransactionDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

const Amount = styled.span<{ isPositive: boolean }>`
  color: ${(props) => (props.isPositive ? "green" : "red")};
`;

const TransactionList: React.FC<{ transactions: Transaction[] }> = ({
  transactions,
}) => (
  <ListWrapper>
    {transactions.map((txn, index) => (
      <TransactionItem key={index}>
        <TransactionDetails>
          <Icon>{txn.icon}</Icon>
          <TransactionDescription>
            <strong>{txn.description}</strong>
            <small>{txn.date}</small>
          </TransactionDescription>
        </TransactionDetails>
        <Amount isPositive={txn.amount.startsWith("+")}>{txn.amount}</Amount>
      </TransactionItem>
    ))}
  </ListWrapper>
);

export default TransactionList;
