import React, { useState } from "react";
import styled from "styled-components";
import { Contact } from "../../types/Contact";
import Icon from "../common/Icon";

interface QuickTransferProps {
  contacts: Contact[];
}

const Wrapper = styled.div`
  height: 276px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  position: relative;
  padding: 20px 25px;
  background-color: #ffffff;

  @media (max-width: 768px) {
    width: 325px;
    padding: 15px 15px;
    height: auto;
  }
`;

const ContactListWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  @media (max-width: 768px) {
    width: auto;
    padding: 15px 15px;
    height: auto;
  }
`;

const ChevronIconWrapper = styled.div<{ position: "left" | "right" }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.position === "left" ? "left: 20px;" : "right: 20px;")}
  ${(props) => (props.position === "left" ? "top: 70px;" : "top: 70px;")}
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  z-index: 1;

  &:hover {
    background-color: #f4f7fb;
  }
`;

const ContactList = styled.div<{ adjustMargin: boolean }>`
  display: flex;
  gap: 20px;
  transition: transform 0.3s ease-in-out, margin-left 0.3s ease-in-out;
  margin-left: ${(props) => (props.adjustMargin ? "33px" : "0")};
`;

const ContactContainer = styled.div<{ isSelected: boolean }>`
  text-align: center;
  flex: none;
  width: 90px;
  cursor: pointer;

  img {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    object-fit: cover;
    margin-bottom: 10px;
  }

  div {
    font-size: 14px;
    font-weight: ${(props) => (props.isSelected ? "600" : "400")};
    line-height: 18px;
    color: #343c6a;
  }

  small {
    font-size: 12px;
    font-weight: ${(props) => (props.isSelected ? "600" : "400")};
    color: #718ebf;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 15px;
  gap: 27px;
`;

const Label = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #7d8da5;
  white-space: nowrap;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 50px;
  background-color: #f4f7fb;
  box-shadow: 4px 4px 18px -2px #e7e4e8cc;
  overflow: hidden;
  width: 100%;
`;

const Input = styled.input`
  border: none;
  max-width: 140px;
  background-color: transparent;
  color: #718ebf;
  font-size: 16px;
  text-align: center;
  outline: none;

  -webkit-appearance: none;
  appearance: none;

  -moz-appearance: textfield;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
  }

  &::placeholder {
    color: #718ebf;
  }

  @media (max-width: 768px) {
    max-width: 70px;
    font-size: 12px; /* Smaller font size */
  }
`;

const SendButton = styled.button`
  width: 110px;
  padding: 0px 20px;
  height: 45px;
  border: none;
  border-radius: 50px;
  background-color: #232323;
  color: white;
  font-size: 14px; /* Reduced font size */
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 4px 4px 18px -2px #e7e4e8cc;

  &:hover {
    background-color: #1a1a1a;
  }
`;

const QuickTransfer: React.FC<QuickTransferProps> = ({ contacts }) => {
  const [amount, setAmount] = useState("");
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const contactsToShow = 3;

  const handleNext = () => {
    if (visibleIndex + contactsToShow < contacts.length) {
      setVisibleIndex(visibleIndex + contactsToShow);
    }
  };

  const handlePrev = () => {
    if (visibleIndex > 0) {
      setVisibleIndex(visibleIndex - contactsToShow);
    }
  };

  const handleSend = () => {
    if (!selectedContact) {
      alert("Please select a contact before sending.");
      return;
    }
    if (!amount) {
      alert("Please enter an amount before sending.");
      return;
    }
    const confirmTransfer = window.confirm(
      `Do you want to send $${amount} to ${selectedContact.name}?`
    );
    if (confirmTransfer) {
      alert("Transfer successful!");
      setAmount("");
      setSelectedContact(null);
    }
  };

  return (
    <Wrapper>
      {visibleIndex > 0 && (
        <ChevronIconWrapper position="left" onClick={handlePrev}>
          <Icon name="chevronLeft" size={18} color="#718EBF" />
        </ChevronIconWrapper>
      )}
      {visibleIndex + contactsToShow < contacts.length && (
        <ChevronIconWrapper position="right" onClick={handleNext}>
          <Icon name="chevronRight" size={18} color="#718EBF" />
        </ChevronIconWrapper>
      )}
      <ContactListWrapper>
        <ContactList adjustMargin={visibleIndex > 0}>
          {contacts
            .slice(visibleIndex, visibleIndex + contactsToShow)
            .map((contact) => (
              <ContactContainer
                key={contact.id}
                isSelected={selectedContact?.id === contact.id}
                onClick={() => setSelectedContact(contact)}
              >
                <img src={contact.avatar} alt={contact.name} />
                <div>{contact.name}</div>
                <small>{contact.role}</small>
              </ContactContainer>
            ))}
        </ContactList>
      </ContactListWrapper>

      <InputContainer>
        <Label>Write Amount</Label>
        <InputWrapper>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
          />
          <SendButton onClick={handleSend}>
            Send <Icon name="send" size={18} color="white" />
          </SendButton>
        </InputWrapper>
      </InputContainer>
    </Wrapper>
  );
};

export default QuickTransfer;
