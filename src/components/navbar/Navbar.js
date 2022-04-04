import './navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='global_navbar'>
      <ul>
        <li>
          <Link to={'/'}>home</Link>
        </li>
        <li>
          <Link to={'/create'}>new post +</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
