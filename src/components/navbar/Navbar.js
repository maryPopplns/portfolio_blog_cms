import './navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to={'/'}>home</Link>
      <Link to={'/create'}>+</Link>
    </nav>
  );
}

export default Navbar;
