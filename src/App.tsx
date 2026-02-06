import React from "react";
import { BrowserRouter } from "react-router-dom";
import useRouteElements from "./routes/useRouteElements";
import ScrollToTop from "./components/Global/ScrollToTop";

const AppRoutes = () => {
  const elements = useRouteElements();
  return elements;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
