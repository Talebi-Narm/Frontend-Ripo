import Sidebar from '../../Components/sidebar'
import AppBar from '../../Components/AppBar'
import './style.scss'
import AdminHome from '../AdminHome'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminUser from '../AdminUser'
import AdminNewUser from '../AdminNewUser'
import AdminProductList from '../AdminProductList'
import AdminProduct from '../AdminProduct'
import AdminNewProduct from '../AdminNewProduct'
import UserList from '../AdminUserList'

function App() {
  return (
    <Router>
      <AppBar />
      <div className='containerAdmin'>
        <Sidebar />
        <Routes>
          <Route exact path='/AdminPage/AdminHome'>
            <AdminHome />
          </Route>
          <Route path='/AdminPage/specialist'>
            <UserList />
          </Route>
          <Route path='/AdminPage/user/:userId/' element={<AdminUser/>} />
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
        </Routes>
      </div>
    </Router>
  )
}

export default App
