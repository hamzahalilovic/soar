import React from "react";
import styled from "styled-components";
import Icon from "../common/Icon";
import { Card as CardType } from "../../types/Card";
import { formatAndMaskCardNumber } from "../../utils/utils";

interface CardProps extends CardType {
  themeVariant?: "dark" | "light";
}

const CardWrapper = styled.div<{ themeVariant: "dark" | "light" }>`
  position: relative;
  width: 350px;
  height: 235px;
  border-radius: 25px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: ${(props) =>
    props.themeVariant === "dark"
      ? "linear-gradient(107.38deg, #5B5A6F 2.61%, #000000 101.2%)"
      : "#FFFFFF"};
  color: ${(props) => (props.themeVariant === "dark" ? "#FFFFFF" : "#343C6A")};
  border: ${(props) =>
    props.themeVariant === "dark" ? null : "1px solid #DFEAF2"};
`;

const CardTop = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px 26px;
`;

const CardBottom = styled.div<{ themeVariant: "dark" | "light" }>`
  height: 70px;
  background: ${(props) =>
    props.themeVariant === "dark"
      ? "linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%)"
      : "#FFFFFF"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 24px;
  border-top: ${(props) =>
    props.themeVariant === "dark" ? null : "1px solid #DFEAF2"};
`;

const BalanceText = styled.p<{ themeVariant: "dark" | "light" }>`
  font-size: 12px;
  margin: 0;
  color: ${(props) => (props.themeVariant === "dark" ? "#FFFFFF" : "#343C6A")};
  opacity: 0.7;
`;

const CardBalance = styled.h2<{ themeVariant: "dark" | "light" }>`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: ${(props) => (props.themeVariant === "dark" ? "#FFFFFF" : "#343C6A")};
  line-height: 24px;
`;

const CardNumber = styled.p<{ themeVariant: "dark" | "light" }>`
  font-size: 22px;
  font-weight: 600;
  margin: 0;
  font-family: "Lato", sans-serif;
  color: ${(props) => (props.themeVariant === "dark" ? "#FFFFFF" : "#343C6A")};
`;
const CardText = styled.p<{ themeVariant: "dark" | "light" }>`
  font-size: 12px;
  font-weight: 400;
  margin: 0;
  text-transform: uppercase;
  color: ${(props) => (props.themeVariant === "dark" ? "#FFFFFF" : "#8BA3CB")};
  opacity: 0.7;
`;

const ClientValue = styled.p<{ themeVariant: "dark" | "light" }>`
  font-size: 16px;
  margin: 0;
  color: ${(props) => (props.themeVariant === "dark" ? "#FFFFFF" : "#343C6A")};
`;

const TopIconContainer = styled.div`
  position: absolute;
  top: 25px;
  right: 24.23px;
`;

const BottomIconContainer = styled.div`
  position: absolute;
  right: 24.23px;
`;
const Card: React.FC<CardProps> = ({
  cardholderName,
  balance,
  cardNumber,
  expiryDate,
  themeVariant = "dark",
}) => {
  return (
    <CardWrapper themeVariant={themeVariant}>
      <CardTop>
        <TopIconContainer>
          <Icon
            name="cardChip"
            size={35}
            color={themeVariant === "dark" ? "#FFFFFF" : "blue"}
          />
        </TopIconContainer>
        <div>
          <BalanceText themeVariant={themeVariant}>Balance</BalanceText>
          <CardBalance themeVariant={themeVariant}>${balance}</CardBalance>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "72px" }}>
            <CardText themeVariant={themeVariant}>CARD HOLDER</CardText>
            <ClientValue themeVariant={themeVariant}>
              {cardholderName}
            </ClientValue>
          </div>
          <div>
            <CardText themeVariant={themeVariant}>VALID THRU</CardText>
            <ClientValue themeVariant={themeVariant}>{expiryDate}</ClientValue>
          </div>
        </div>
      </CardTop>
      <CardBottom themeVariant={themeVariant}>
        <CardNumber themeVariant={themeVariant}>
          {formatAndMaskCardNumber(cardNumber)}
        </CardNumber>
        <BottomIconContainer>
          <Icon
            name="mastercard"
            size={44}
            color={themeVariant === "dark" ? "#FFFFFF" : "#9199AF"}
          />
        </BottomIconContainer>
      </CardBottom>
    </CardWrapper>
  );
};

export default Card;
