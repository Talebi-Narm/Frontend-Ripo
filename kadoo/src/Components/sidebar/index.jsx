import './style.scss'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import StorefrontIcon from '@mui/icons-material/Storefront'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <div className='sidebarMenu'>
        </div>
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>Quick Menu</h3>
          <ul className='sidebarList'>
            <Link to='/AdminPage/specialist' className='link'>
              <li className='sidebarListItem'>
                <PermIdentityIcon className='sidebarIcon' />
                Specialists
              </li>
            </Link>
            <Link to='/AdminPage/productsList' className='link'>
              <li className='sidebarListItem'>
                <StorefrontIcon className='sidebarIcon' />
                Products
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  )
}
