import React, { useState } from "react";
import styled from "styled-components";

const TabsWrapper = styled.div`
  border-bottom: 1px solid #ddd;
  display: flex;
  margin-bottom: 20px;
  gap: 20px;
`;

const TabButton = styled.button<{ isActive: boolean }>`
  background: none;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
  color: ${(props) => (props.isActive ? "#007bff" : "#333")};
  border-bottom: ${(props) => (props.isActive ? "2px solid #007bff" : "none")};

  &:hover {
    color: #0056b3;
  }
`;

const ContentWrapper = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

interface TabsProps {
  tabs: { label: string; content: React.ReactNode }[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <TabsWrapper>
        {tabs.map((tab, index) => (
          <TabButton
            key={index}
            isActive={activeTab === index}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabsWrapper>
      <ContentWrapper>{tabs[activeTab].content}</ContentWrapper>
    </div>
  );
};

export default Tabs;
