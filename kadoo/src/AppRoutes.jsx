// Import Initial Files
import React from 'react';
import './App.css';
// Import Theme Files
import { ThemeProvider } from '@mui/material/styles';
import Theme from './Theme/ThemeGenerator';
// Import Dom And React Components
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
// Import Pages
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import HomePage from './Pages/HomePage';
import SearchResultProduct from './Components/SearchResultsProduct/SearchResultProduct';
import Cart from './Pages/AddToCart';
import NotFound from './Pages/NotFound';
import CategoriesPage from './Pages/CategoriesPage';
import ProductPlantsPage from './Pages/ProductPlantsPage/inedx';
import ProductToolsPage from './Pages/ProductToolsPage';
import LandingPage from './Pages/LandingPage';
import AdminPage from './Pages/AdminPage';
import Reminder from './Pages/ReminderTest';
import GreenHouseEdit from './Pages/GreenHouseEdit';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Plantmanagement from './Pages/Plantmanagement';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ShowCoins from './Components/ShowCoins';
import WateringUpdate from './Components/UpdateCoins/WateringUpdate';
import TicketPage from './Pages/TicketPage';
import WriteTicket from './Components/WriteTicket';
import TicketUser from './Pages/TicketUser';
import Test from './Test'

function AppRoutes() {
    return (

      <Router>
        <Routes>
          <Route path='/testredux'  element={<Test/>}></Route>
          {/* <Route   path='/TicketPage' element={<TicketPage/>} />
          <Route   path='/TicketUser' element={<TicketUser/>} />
          <Route   path='/WriteTicket' element={<WriteTicket/>} />
          <Route   path='/WateringUpdateTest' element={<WateringUpdate/>} />
          <Route   path='/Coins' element={<ShowCoins/>} />
          <Route   path='/' element={<LandingPage/>} />
          <Route   path='/signin' element={<SignIn/>} />
          <Route   path='/signup' element={<SignUp/>} />
          <Route   path='/search/:text' element={<SearchResultProduct/>} />
          <Route   path='/search/' element={<SearchResultProduct/>} />
          <Route   path='/Homepage' element={<HomePage/>} />
          <Route  path='/cart'   element={<Cart/>} />
          <Route  path='/categories'   element={<CategoriesPage/>} />
          <Route  path='/Reminder'   element={<Reminder/>} />
          <Route  path='/greenhouse'   element={<Plantmanagement/>} />
          <Route   path='/AdminPage' element={<AdminPage/>} />
          <Route   path='/ProductPlantsPage/:id' element={<ProductPlantsPage/>}/>
          <Route   path='/ProductToolsPage/:id' element={<ProductToolsPage/>} />
          <Route   path='/greenHouseEdit/:id' element={<GreenHouseEdit/>} />
          <Route   path='/greenHouseCreate/' element={<GreenHouseEdit/>} />
          <Route element={<NotFound/>} /> */}
        </Routes>
      </Router>

    );
  }
  
  export default AppRoutes;
  