// Import Initial Files
import React from 'react';
import './App.css';
// Import Dom And React Components
import {  Route,Routes } from 'react-router-dom';
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
import Plantmanagement from './Pages/Plantmanagement';
import ShowCoins from './Components/ShowCoins';
import WateringUpdate from './Components/UpdateCoins/WateringUpdate';
import TicketPage from './Pages/TicketPage';
import WriteTicket from './Components/WriteTicket';
import TicketUser from './Pages/TicketUser';
import Test from './Test'
import MainLayout from './Pages/MainLayout';
import FAQsPage from './Pages/FAQs/FAQ';

function AppRoutes() {  
  return (
    <Routes>
      <Route path='/testredux' exact element={<Test />}></Route>
      <Route path='/TicketPage' exact element={<TicketPage />} />
      <Route path='/TicketUser' exact element={<TicketUser />} />
      <Route path='/WriteTicket' exact element={<WriteTicket />} />
      <Route path='/WateringUpdateTest' exact element={<WateringUpdate />} />
      <Route path='/Coins' exact element={<ShowCoins />} />
      <Route path='/' exact element={<LandingPage />} />
      <Route path='/signin' exact element={<SignIn />} />
      <Route path='/signup' exact element={<SignUp />} />
      <Route path='/search/:text' exact element={<SearchResultProduct />} />
      <Route path='/search/' exact element={<SearchResultProduct />} />
      <Route path='/Homepage' exact element={<HomePage />} />
      <Route path='/cart' exact element={<Cart />} />
      <Route path='/categories' exact element={<CategoriesPage />} />
      <Route path='/Reminder' exact element={<Reminder />} />
      <Route path='/greenhouse' exact element={<Plantmanagement />} />
      <Route path='/AdminPage' exact element={<AdminPage />} />
      <Route path='/FAQsPage' exact element={<FAQsPage />} />
      <Route
        path='/ProductPlantsPage/:id'
        exact
        element={<ProductPlantsPage />}
      />
      <Route
        path='/ProductToolsPage/:id'
        exact
        element={<ProductToolsPage />}
      />
      <Route path='/greenHouseEdit/:id' exact element={<GreenHouseEdit />} />
      <Route path='/greenHouseCreate/' exact element={<GreenHouseEdit />} />
      <Route path='/test-layout/test1/test2' element={<MainLayout />} />
      <Route exact element={<NotFound />} />
    </Routes>
  )
}  
export default AppRoutes;
  