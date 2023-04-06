import Sidebar from '../../Components/sidebar'
import AppBar from '../../Components/AppBar'
import './style.scss'
import AdminHome from '../AdminHome'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AdminUserList from '../AdminUserList'
import AdminUser from '../AdminUser'
import AdminNewUser from '../AdminNewUser'
import AdminProductList from '../AdminProductList'
import AdminProduct from '../AdminProduct'
import AdminNewProduct from '../AdminNewProduct'
import UserList from '../AdminUserList'
import { useState, useEffect } from 'react'

function App() {
  return (
    <Router>
      <AppBar />
      <div className='containerAdmin'>
        <Sidebar />
        <Switch>
          <Route exact path='/AdminPage/AdminHome'>
            <AdminHome />
          </Route>
          <Route path='/AdminPage/specialist'>
            <UserList />
          </Route>
          <Route path='/AdminPage/user/:userId/' component={AdminUser} />
          <Route path='/AdminPage/newUser'>
            <AdminNewUser />
          </Route>
          <Route exact path='/AdminPage/productsList'>
            <AdminProductList />
          </Route>
          <Route path='/AdminPage/newProduct'>
            <AdminNewProduct />
          </Route>
          <Route
            path='/AdminPage/product/:productId/'
            component={AdminProduct}
          />
        </Switch>
      </div>
    </Router>
  )
}

export default App
