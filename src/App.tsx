import React from "react";
import { BrowserRouter } from "react-router-dom";
import useRouteElements from "./routes/useRouteElements";

const AppRoutes = () => {
  const elements = useRouteElements();
  return elements;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
