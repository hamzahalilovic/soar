import React from "react";
import styled from "styled-components";
import Icon from "../common/Icon";
import { Transaction } from "../../types/Transaction";
import { formatCurrencyAmount, isPositiveNumber } from "../../utils/utils";

interface TransactionListProps {
  transactions: Transaction[];
}

const ScrollableContainer = styled.div`
  width: 350px;
  height: 235px;
  overflow-y: auto;
  border-radius: 25px;
  background-color: #ffffff;
  padding: 25px 0px;
`;

const ListWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TransactionItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 25px;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const TransactionDetails = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div<{ type: string }>`
  width: 50px;
  height: 50px;
  background-color: ${(props) =>
    props.type === "deposit-card"
      ? "#FFF3E4"
      : props.type === "deposit-paypal"
      ? "#E6F2FF"
      : props.type === "transfer"
      ? "#E6F9F3"
      : "#f0f0f0"};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

const TransactionDescription = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    font-size: 16px;
    font-weight: 500;
    color: #232323;
    margin-bottom: 4px;
  }

  small {
    font-size: 14px;
    color: #8ba3cb;
  }
`;

const Amount = styled.span<{ isPositive: boolean }>`
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => (props.isPositive ? "#41D4A8" : "#FF4B4A")};
`;

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => (
  <ScrollableContainer>
    <ListWrapper>
      {transactions.map((item) => (
        <TransactionItem key={item.id}>
          <TransactionDetails>
            <IconWrapper type={item.type}>
              <Icon
                name={item.icon}
                size={24}
                color={
                  item.type === "deposit-card"
                    ? "#FFA722"
                    : item.type === "deposit-paypal"
                    ? "#396AFF"
                    : item.type === "transfer"
                    ? "#00C48C"
                    : "#000000"
                }
              />
            </IconWrapper>
            <TransactionDescription>
              <strong>{item.description}</strong>
              <small>{item.date}</small>
            </TransactionDescription>
          </TransactionDetails>
          <Amount isPositive={isPositiveNumber(item.amount)}>
            {formatCurrencyAmount(item.amount)}
          </Amount>
        </TransactionItem>
      ))}
    </ListWrapper>
  </ScrollableContainer>
);

export default TransactionList;
