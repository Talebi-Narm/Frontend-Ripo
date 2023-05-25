import "./App.css";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import Helmet from "react-helmet";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppRoutes from "./AppRoutes";
import Theme from "./Theme/ThemeGenerator";

function App() {
  return (
    <>
      <Helmet>
        <title>Talebi</title>
      </Helmet>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Router>
            <Routes>
              <Route path="/*" element={<AppRoutes />} />
            </Routes>
          </Router>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
