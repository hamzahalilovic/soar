import React from "react";
import styled from "styled-components";
import Tabs from "../components/settings/Tabs";
import EditProfileForm from "../components/settings/EditProfileForm";
import PreferencesTabContent from "../components/settings/PreferencesTabConent";
import SecurityTabContent from "../components/settings/SecurityTabContent";

const SettingsWrapper = styled.div`
  padding: 20px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const SettingsPage: React.FC = () => {
  const tabs = [
    { label: "Edit Profile", content: <EditProfileForm /> },
    { label: "Preferences", content: <PreferencesTabContent /> },
    { label: "Security", content: <SecurityTabContent /> },
  ];

  return (
    <SettingsWrapper>
      <PageTitle>Setting</PageTitle>
      <Tabs tabs={tabs} />
    </SettingsWrapper>
  );
};

export default SettingsPage;
