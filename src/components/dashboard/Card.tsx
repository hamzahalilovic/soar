import React from "react";
import styled from "styled-components";

interface CardProps {
  name: string;
  balance: string;
  number: string;
}

const CardWrapper = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 16px 0;
`;

const CardName = styled.h3`
  font-size: 18px;
  margin: 0;
`;

const CardBalance = styled.p`
  font-size: 16px;
  color: #007bff;
`;

const CardNumber = styled.p`
  font-size: 14px;
  color: #666;
`;

const Card: React.FC<CardProps> = ({ name, balance, number }) => (
  <CardWrapper>
    <CardName>{name}</CardName>
    <CardBalance>Balance: {balance}</CardBalance>
    <CardNumber>Card Number: {number}</CardNumber>
  </CardWrapper>
);

export default Card;
