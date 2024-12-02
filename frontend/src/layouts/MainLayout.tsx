import React from "react";
import styled from "styled-components";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { Outlet } from "react-router-dom";

const LayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MainContent = styled.main`
  flex: 1;

  background-color: #f5f7fa;
  overflow-y: auto;
`;

const MainLayout: React.FC = () => {
  return (
    <LayoutWrapper>
      <Sidebar />
      <ContentWrapper>
        <Navbar />
        <MainContent>
          <Outlet />
        </MainContent>
      </ContentWrapper>
    </LayoutWrapper>
  );
};

export default MainLayout;
