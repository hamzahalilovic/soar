import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./navigation/AppRoutes";
import GlobalStyle from "./styles/GlobalStyle";

import { Provider } from "react-redux";
import { store } from "./redux/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <GlobalStyle />
        <AppRoutes />
      </Router>
    </Provider>
  );
};
export default App;
