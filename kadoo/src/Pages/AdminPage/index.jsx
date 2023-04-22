import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppBar from "../../Components/AppBar";
import Sidebar from "../../Components/sidebar";
import "./style.scss";
import AdminHome from "../AdminHome";
import AdminNewProduct from "../AdminNewProduct";
import AdminNewUser from "../AdminNewUser";
import AdminProduct from "../AdminProduct";
import AdminProductList from "../AdminProductList";
import AdminUser from "../AdminUser";
import UserList from "../AdminUserList";

function App() {
  return (
    <Router>
      <AppBar />
      <div className="containerAdmin">
        <Sidebar />
        <Routes>
          <Route exact path="/AdminPage/AdminHome">
            <AdminHome />
          </Route>
          <Route path="/AdminPage/specialist">
            <UserList />
          </Route>
          <Route path="/AdminPage/user/:userId/" element={<AdminUser />} />
          <Route path="/AdminPage/newUser">
            <AdminNewUser />
          </Route>
          <Route exact path="/AdminPage/productsList">
            <AdminProductList />
          </Route>
          <Route path="/AdminPage/newProduct">
            <AdminNewProduct />
          </Route>
          <Route
            path="/AdminPage/product/:productId/"
            component={AdminProduct}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
