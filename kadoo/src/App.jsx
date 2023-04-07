// Import Initial Files
import React from 'react'
import './App.css'
// Import Theme Files
import { ThemeProvider } from '@mui/material/styles'
import Theme from './Theme/ThemeGenerator'
// Import Dom And React Components
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
// Import Pages
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AppRoutes from './AppRoutes'

function App() {
  return (
    <React.Fragment className='no-select'>
      <CssBaseline />
      <ThemeProvider theme={Theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Router>
            <Routes>
              <Route path="/*" element={<AppRoutes />} />
            </Routes>
          </Router>
        </LocalizationProvider>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
