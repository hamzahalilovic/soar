import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { Outlet } from "react-router-dom";

const LayoutWrapper = styled.div`
  display: flex;
  width: 100wv;
`;

const ContentWrapper = styled.div`
  flex: 1;

  background-color: #f5f7fa;
  min-height: 100vh;

  @media (max-width: 768px) {
  }
`;
const MainContent = styled.main`
  flex: 1;

  background-color: #f5f7fa;
  overflow-y: auto;
`;

const MainLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <LayoutWrapper>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <ContentWrapper>
        <Navbar toggleSidebar={toggleSidebar} />
        <MainContent>
          <Outlet />
        </MainContent>
      </ContentWrapper>
    </LayoutWrapper>
  );
};

export default MainLayout;
