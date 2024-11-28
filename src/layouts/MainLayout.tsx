import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const LayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.aside`
  width: 250px;
  background-color: #f8f9fa;
  padding: 20px;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
`;

const Header = styled.header`
  height: 60px;
  background-color: #007bff;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-size: 18px;
`;

const MainLayout: React.FC = () => {
  return (
    <LayoutWrapper>
      <Sidebar>
        <p>Sidebar</p>
      </Sidebar>
      <div style={{ flex: 1 }}>
        <Header>Dashboard</Header>
        <MainContent>
          <Outlet />
        </MainContent>
      </div>
    </LayoutWrapper>
  );
};

export default MainLayout;
