import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import Icon, { IconName } from "../common/Icon";
import Text from "../common/Text";

const SidebarWrapper = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 31px 0px;
  border-right: 1px solid #e6eff5;
  position: relative;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 64px;
  text-decoration: none;

  img {
    margin-right: 10px;
    width: 35px;
  }
`;

const NavList = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItemWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`;

const StyledNavItem = styled(Link)<{ isActive: boolean; disabled: boolean }>`
  width: 100%;
  padding: 15px 44px;
  display: flex;
  align-items: center;

  color: ${(props) => (props.isActive ? "#232323" : "#B1B1B1")};
  background-color: transparent;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 16px;
  text-decoration: none;
  font-weight: 500;
  line-height: 21.78px;

  &:hover {
    background-color: ${(props) =>
      props.disabled ? "transparent" : "#f5f5f5"};
  }

  svg {
    margin-right: 26px;
  }
`;

const Indicator = styled.div<{ isActive: boolean }>`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 60px;
  background-color: ${(props) => (props.isActive ? "#000" : "transparent")};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems: { path: string; label: string; icon: IconName }[] = [
    { path: "/", label: "Dashboard", icon: "dashboard" },
    { path: "/transactions", label: "Transactions", icon: "transactions" },
    { path: "/accounts", label: "Accounts", icon: "accounts" },
    { path: "/investments", label: "Investments", icon: "investments" },
    { path: "/credit-cards", label: "Credit Cards", icon: "creditcards" },
    { path: "/loans", label: "Loans", icon: "loans" },
    { path: "/services", label: "Services", icon: "services" },
    { path: "/my-privileges", label: "My Privileges", icon: "myprivileges" },
    { path: "/settings", label: "Settings", icon: "settings" },
  ];

  return (
    <SidebarWrapper>
      <Logo to="/">
        <Icon name="logo" size={35} color="#232323" />
        <Text
          color="#343C6A"
          weight={800}
          size="25px"
          lineHeight="30.26px"
          margin="0 0 0 10px"
        >
          Soar Task
        </Text>
      </Logo>
      <NavList>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const isDisabled =
            item.label !== "Dashboard" && item.label !== "Settings";
          return (
            <NavItemWrapper key={item.path}>
              <Indicator isActive={isActive} />
              <StyledNavItem
                to={isDisabled ? "#" : item.path}
                isActive={isActive}
                disabled={isDisabled}
                onClick={(e) => isDisabled && e.preventDefault()}
              >
                <Icon
                  name={item.icon}
                  size={25}
                  color={
                    isActive ? "#232323" : isDisabled ? "#E0E0E0" : "#B1B1B1"
                  }
                />
                {item.label}
              </StyledNavItem>
            </NavItemWrapper>
          );
        })}
      </NavList>
    </SidebarWrapper>
  );
};

export default Sidebar;
