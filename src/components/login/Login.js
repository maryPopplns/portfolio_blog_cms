import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/slices/loggedIn';
import './login.css';

function Login() {
  const dispatch = useDispatch();
  // dispatch(login())

  return (
    <form>
      <ul>
        <li>
          <input type='text'></input>
        </li>
        <li>
          <input type='text'></input>
        </li>
      </ul>
    </form>
  );
}

export default Login;
