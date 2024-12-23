import React from "react";
import styled from "styled-components";
import Tabs from "../components/settings/Tabs";
import EditProfileForm from "../components/settings/EditProfileForm";
import PreferencesTabContent from "../components/settings/PreferencesTabConent";
import SecurityTabContent from "../components/settings/SecurityTabContent";

const SettingsWrapper = styled.div`
  border-radius: 25px;
  margin: 30px 40px 100px 40px;
  padding: 30px;
  background-color: #ffffff;

  @media (max-width: 768px) {
    margin: 25px;
    padding: 20px;
  }
`;

const SettingsPage: React.FC = () => {
  const tabs = [
    { label: "Edit Profile", content: <EditProfileForm /> },
    { label: "Preferences", content: <PreferencesTabContent /> },
    { label: "Security", content: <SecurityTabContent /> },
  ];

  return (
    <SettingsWrapper>
      <Tabs tabs={tabs} />
    </SettingsWrapper>
  );
};

export default SettingsPage;
