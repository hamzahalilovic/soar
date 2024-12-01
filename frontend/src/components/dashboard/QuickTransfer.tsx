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
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  position: relative;
  padding: 25px 30px;
`;

const ContactListWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const ChevronIconWrapper = styled.div<{ position: "left" | "right" }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.position === "left" ? "left: 26px;" : "right: 26px;")}
  ${(props) => (props.position === "left" ? "top: 76px;" : "top: 76px;")}
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  width: 40px;
  height: 40px;
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
  gap: 28px;
  transition: transform 0.3s ease-in-out, margin-left 0.3s ease-in-out;
  margin-left: ${(props) => (props.adjustMargin ? "33px" : "0")};
`;

const ContactContainer = styled.div<{ isSelected: boolean }>`
  text-align: center;
  flex: none;
  width: 100px;
  cursor: pointer;

  img {
    border-radius: 50%;
    width: 70px;
    height: 70px;
    object-fit: cover;
    margin-bottom: 15px;
  }

  div {
    font-size: 16px;
    font-weight: ${(props) => (props.isSelected ? "600" : "400")};
    line-height: 19.36px;
    color: #343c6a;
  }

  small {
    font-size: 15px;
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
`;

const SendButton = styled.button`
  width: 125px;
  padding: 0px 24px;
  height: 50px;
  border: none;
  border-radius: 50px;
  background-color: #232323;
  color: white;
  font-size: 16px;
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
          <Icon name="chevronLeft" size={20} color="#718EBF" />
        </ChevronIconWrapper>
      )}
      {visibleIndex + contactsToShow < contacts.length && (
        <ChevronIconWrapper position="right" onClick={handleNext}>
          <Icon name="chevronRight" size={20} color="#718EBF" />
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
            Send <Icon name="send" size={20} color="white" />
          </SendButton>
        </InputWrapper>
      </InputContainer>
    </Wrapper>
  );
};

export default QuickTransfer;
