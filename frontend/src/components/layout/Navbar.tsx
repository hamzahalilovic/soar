import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../redux/store";
import Icon from "../common/Icon";

const NavbarWrapper = styled.div`
  height: 100px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  border-bottom: 1px solid #e6eff5;

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    padding: 16px;
    height: auto;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #343c6a;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 10px;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 10px; /* Adds space between profile and searchbar on mobile */
  }
`;

const IconButton = styled.button`
  width: 50px;
  height: 50px;
  background: #f5f7fa;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    fill: #718ebf;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const SearchBar = styled.div`
  width: 255px;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  padding: 0 16px;
  border-radius: 25px;

  @media (max-width: 768px) {
    width: 100%; /* Take full width on mobile */
    margin-top: 10px; /* Add space above */
  }
`;

const HiddenOnMobile = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Hidden = styled.div`
  display: flex;
  gap: 30px;

  @media (min-width: 768px) {
    display: none;
  }
`;

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const user = useSelector((state: RootState) => state.user.user);

  const defaultImage =
    "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png";

  const profileImage = user?.profileImage || defaultImage;

  return (
    <NavbarWrapper>
      <Hidden>
        <IconButton onClick={toggleSidebar}>
          <Icon name="menu" size={24} />
        </IconButton>
      </Hidden>
      <Title>Overview</Title>

      <Actions>
        <HiddenOnMobile>
          <SearchBar>
            <Icon name="search" size={24} />
            <input
              type="text"
              placeholder="Search for something"
              style={{
                border: "none",
                outline: "none",
                background: "none",
                marginLeft: "10px",
                color: "#8ba3cb",
                fontSize: "16px",
              }}
            />
          </SearchBar>
          <IconButton>
            <Icon name="settingsOutline" size={24} />
          </IconButton>
          <IconButton>
            <Icon name="notification" size={24} />
          </IconButton>
        </HiddenOnMobile>

        <ProfileImage src={profileImage} alt="Profile" />
      </Actions>
    </NavbarWrapper>
  );
};

export default Navbar;
