import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Icon from "../common/Icon";

const NavbarWrapper = styled.div`
  height: 100px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  border-bottom: 1px solid #e6eff5;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #343c6a;
  margin: 0;
`;

const SearchBar = styled.div`
  width: 255px;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  padding: 0 16px;
  border-radius: 25px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const IconButton = styled.button<{ isActive?: boolean }>`
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
    fill: ${(props) => (props.isActive ? "#396AFF" : "#718EBF")};
  }

  &:focus {
    svg {
      fill: #396aff;
    }
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const StyledInput = styled.input`
  border: none;
  outline: none;
  background: none;
  font-size: 16px;
  line-height: 18.15;
  font-weight: 400;
  color: #8ba3cb;
  type: "text";
  margin-left: 15px;
  &::placeholder {
    color: #8ba3cb;
  }
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const defaultImage =
    "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png";

  const profileImage = user?.profileImage
    ? `http://localhost:5001${user.profileImage}`
    : defaultImage;

  return (
    <NavbarWrapper>
      <Title>Overview</Title>

      <Actions>
        <SearchBar>
          <Icon name="search" size={24} />
          <StyledInput placeholder="Search for something" />
        </SearchBar>
        <IconButton>
          <Icon name="settingsOutline" size={24} />
        </IconButton>
        <IconButton>
          <Icon name="notification" size={24} />
        </IconButton>

        <ProfileImage src={profileImage} alt="Profile" />
      </Actions>
    </NavbarWrapper>
  );
};

export default Navbar;
