import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 276px;
  display: flex;
  padding: 25px 20px;

  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background-color: white;
`;
const ContactList = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Contact = styled.div`
  text-align: center;
  cursor: pointer;
`;

const Input = styled.input`
  padding: 8px;
  width: 100px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const QuickTransfer: React.FC = () => {
  const contacts = [
    { name: "Alice", role: "Friend", avatar: "" },
    { name: "Bob", role: "Colleague", avatar: "" },
    { name: "Charlie", role: "Family", avatar: "" },
  ];

  const [amount, setAmount] = useState("");

  const handleSend = () => {
    alert(`Transfer triggered`);
    setAmount("");
  };

  return (
    <Wrapper>
      <h3>Quick Transfer</h3>
      <ContactList>
        {contacts.map((contact, index) => (
          <Contact key={index}>
            <div>{contact.avatar}</div>
            <div>{contact.name}</div>
            <small>{contact.role}</small>
          </Contact>
        ))}
      </ContactList>
      <div>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </Wrapper>
  );
};

export default QuickTransfer;
