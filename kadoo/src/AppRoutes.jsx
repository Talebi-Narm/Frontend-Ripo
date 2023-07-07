import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import ChatUI from "./Components/ChatRoom";
import HeroSection from "./Components/HeroSection";
import PlantsCart from "./Components/ProductsCart/PlantsCart";
import ToolsCart from "./Components/ProductsCart/ToolsCart";
import SearchResultProduct from "./Components/SearchResultsProduct/SearchResultProduct";
import ShowCoins from "./Components/ShowCoins";
import WateringUpdate from "./Components/UpdateCoins/WateringUpdate";
import WriteTicket from "./Components/WriteTicket";
import Cart from "./Pages/AddToCart";
import AdminPage from "./Pages/AdminPage";
import CategoriesPage from "./Pages/CategoriesPage";
import FAQsPage from "./Pages/FAQs/FAQ";
// eslint-disable-next-line import/no-unresolved, import/extensions
import GreenHouse from "./Pages/GreenHouse/GreenHouse";
// import GreenHouseEdit from "./Pages/GreenHouseEdit";
// import HomePage from "./Pages/HomePage";
import GreenHouseEdit from "./Pages/GreenHouse/GreenHouseEdit";
import GreenHouseNew from "./Pages/GreenHouse/GreenHouseNew";
import HomePageRefactored from "./Pages/HomePage/HomePage";
import LandingPage from "./Pages/LandingPage";
import NotFound from "./Pages/NotFound";
import OfferPage from "./Pages/OfferPage";
// import Plantmanagement from "./Pages/Plantmanagement";
import ProductPlantsPage from "./Pages/ProductPlantsPage/inedx";
import ProductToolsPage from "./Pages/ProductToolsPage";
import Reminder from "./Pages/ReminderTest";
// eslint-disable-next-line import/namespace
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
// eslint-disable-next-line import/no-unresolved, import/extensions
import Store from "./Pages/Store";
import TestButton from "./Pages/TestButton/TestButton";
import TicketPage from "./Pages/TicketPage";
import TicketUser from "./Pages/TicketUser";
import UserProfile from "./Pages/UserProfile";
// import UserProfilePage from "./Pages/UserProfilePage";
import Test from "./Test";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/testredux" exact element={<Test />} />
      <Route path="/TicketPage" exact element={<TicketPage />} />
      <Route path="/TicketUser" exact element={<TicketUser />} />
      <Route path="/WriteTicket" exact element={<WriteTicket />} />
      <Route path="/WateringUpdateTest" exact element={<WateringUpdate />} />
      <Route path="/Coins" exact element={<ShowCoins />} />
      <Route path="/" exact element={<LandingPage />} />
      <Route path="/signin" exact element={<SignIn />} />
      <Route path="/signup" exact element={<SignUp />} />
      <Route path="/store" exact element={<Store />} />
      <Route path="/search/:text" exact element={<SearchResultProduct />} />
      <Route path="/search/" exact element={<SearchResultProduct />} />
      <Route path="/Homepage" exact element={<HomePageRefactored />} />
      <Route path="/cart" exact element={<Cart />} />
      <Route path="/categories" exact element={<CategoriesPage />} />
      <Route path="/Reminder" exact element={<Reminder />} />
      {/* <Route path="/greenhouse" exact element={<Plantmanagement />} /> */}
      <Route path="/greenhouse" exact element={<GreenHouse />} />
      <Route path="/AdminPage" exact element={<AdminPage />} />
      <Route path="/FAQsPage" exact element={<FAQsPage />} />
      <Route path="/testAnimation" exact element={<HeroSection />} />
      <Route path="/testChat" exact element={<ChatUI />} />
      <Route
        path="/testCard"
        exact
        element={
          <PlantsCart
            product={{
              image:
                "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png",
              name: "test",
              price: 10,
              light: "much",
              water: "much",
              growthRate: "much",
            }}
          />
        }
      />
      <Route
        path="/testToolCard"
        exact
        element={
          <ToolsCart
            product={{
              image:
                "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png",
              name: "test",
              price: 10,
            }}
          />
        }
      />
      <Route path="/testButton" exact element={<TestButton />} />
      <Route
        path="/ProductPlantsPage/:id"
        exact
        element={<ProductPlantsPage />}
      />
      <Route
        path="/ProductToolsPage/:id"
        exact
        element={<ProductToolsPage />}
      />
      <Route path="/greenHouseEdit/:id" exact element={<GreenHouseEdit />} />
      <Route path="/greenHouseCreate/" exact element={<GreenHouseEdit />} />
      <Route path="/UserProfile" exact element={<UserProfile />} />
      <Route path="/UserProfile/:orders" exact element={<UserProfile />} />
      <Route path="/offer" element={<OfferPage />} />
      <Route path="/greenHouseEdit/:id" element={<GreenHouseEdit />} />
      <Route path="/GreenHouseNew" element={<GreenHouseNew />} />
      <Route exact element={<NotFound />} />
    </Routes>
  );
}
export default AppRoutes;
