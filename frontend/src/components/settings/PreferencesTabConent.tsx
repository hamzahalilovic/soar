import React from "react";
import styled from "styled-components";
import Text from "../common/Text";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const PreferencesTabContent: React.FC = () => {
  return (
    <Wrapper>
      <Text>Preferences Tab Content</Text>
    </Wrapper>
  );
};

export default PreferencesTabContent;
