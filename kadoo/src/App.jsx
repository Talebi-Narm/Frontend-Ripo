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
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import HomePage from './Pages/HomePage'
import SearchResultProduct from './Components/SearchResultsProduct/SearchResultProduct'
import Cart from './Pages/AddToCart'
import NotFound from './Pages/NotFound'
import CategoriesPage from './Pages/CategoriesPage'
import ProductPlantsPage from './Pages/ProductPlantsPage/inedx'
import ProductToolsPage from './Pages/ProductToolsPage'
import LandingPage from './Pages/LandingPage'
import AdminPage from './Pages/AdminPage'
import Reminder from './Pages/ReminderTest'
import GreenHouseEdit from './Pages/GreenHouseEdit'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import Plantmanagement from './Pages/Plantmanagement'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import ShowCoins from './Components/ShowCoins'
import WateringUpdate from './Components/UpdateCoins/WateringUpdate'
import AdminHome from './Pages/AdminHome'
import UserList from './Pages/AdminUserList'
import AdminProduct from './Pages/AdminProduct'
import AdminProductList from './Pages/AdminProductList'
import TicketPage from './Pages/TicketPage'
import WriteTicket from './Components/WriteTicket'
import TicketUser from './Pages/TicketUser'
import Test from './Test'
import AppRoutes from './AppRoutes'
import MainLayout from './Pages/MainLayout/index'

function App() {
  return (
    <React.Fragment className='no-select'>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Router>
            <Routes>
              {/* <Route path="/*" element={<AppRoutes />} /> */}
              <Route exact path='/testredux' element={<Test />} />
              <Route exact path='/TicketPage' element={<TicketPage />} />
              <Route exact path='/TicketUser' element={<TicketUser />} />
              <Route exact path='/WriteTicket' element={<WriteTicket />} />
              <Route
                exact
                path='/WateringUpdateTest'
                element={<WateringUpdate />}
              />
              <Route exact path='/Coins' element={<ShowCoins />} />
              <Route exact path='/' element={<LandingPage />} />
              <Route exact path='/signin' element={<SignIn />} />
              <Route exact path='/signup' element={<SignUp />} />
              <Route
                exact
                path='/search/:text'
                element={<SearchResultProduct />}
              />
              <Route exact path='/search/' element={<SearchResultProduct />} />
              <Route exact path='/Homepage' element={<HomePage />} />
              <Route exact path='/test-layout/' element={<MainLayout />} />
              <Route path='/cart' exact element={<Cart />} />
              <Route path='/categories' exact element={<CategoriesPage />} />
              <Route path='/Reminder' exact element={<Reminder />} />
              <Route path='/greenhouse' exact element={<Plantmanagement />} />
              <Route exact path='/AdminPage' element={<AdminPage />} />
              <Route
                exact
                path='/ProductPlantsPage/:id'
                element={<ProductPlantsPage />}
              />
              <Route
                exact
                path='/ProductToolsPage/:id'
                element={<ProductToolsPage />}
              />
              <Route
                exact
                path='/greenHouseEdit/:id'
                element={<GreenHouseEdit />}
              />
              <Route exact path='/greenHouseCreate/' element={GreenHouseEdit} />

              <Route element={<NotFound />} />
            </Routes>
          </Router>
        </LocalizationProvider>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
