import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import Helmet from "react-helmet";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AppRoutes from "./AppRoutes";
import { CartProvider } from "./Components/NewAppBar/CartContext";
import MainLayout from "./Pages/MainLayout";
import Theme from "./Theme/ThemeGenerator";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Helmet>
        <title>Talebi</title>
      </Helmet>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CartProvider>
            <Router>
              <MainLayout>
                <Routes>
                  <Route path="/*" element={<AppRoutes />} />
                </Routes>
              </MainLayout>
            </Router>
          </CartProvider>
        </LocalizationProvider>
      </ThemeProvider>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        import
      />
    </>
  );
}

export default App;
