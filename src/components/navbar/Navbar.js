import './navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to={'/'}>home</Link>
        </li>
        <li>
          <Link to={'/create'}>create +</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
