import './navbar.css';
import { Link, Outlet } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <nav className='global_navbar'>
        <ul>
          <li>
            <Link to={'/'}>home</Link>
          </li>
          <li>
            <Link to={'/new'}>new post +</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
