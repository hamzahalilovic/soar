import React, { useState } from "react";
import styled from "styled-components";

const TabsWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
  width: 40%;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }
`;

const TabButton = styled.button<{ isActive: boolean }>`
  flex: 1;
  text-align: center;
  background: none;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: ${(props) => (props.isActive ? "600" : "400")};
  color: ${(props) => (props.isActive ? "#232323" : "#718EBF")};
  border-bottom: ${(props) => (props.isActive ? "2px solid #232323" : "none")};

  &:hover {
    color: #232323;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 10px;
  }
`;

const ContentWrapper = styled.div`
  padding: 0px 0px;
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
