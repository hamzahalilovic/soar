import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./navigation/AppRoutes";
import GlobalStyle from "./styles/GlobalStyle";

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <AppRoutes />
    </Router>
  );
};

export default App;
