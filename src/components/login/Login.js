import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/slices/loggedIn';
import './login.css';

function Login() {
  const dispatch = useDispatch();
  // dispatch(login())

  return (
    <form className='login_form'>
      <ul>
        <li>
          <input id='username' type='text'></input>
        </li>
        <li>
          <input id='password' type='password'></input>
        </li>
      </ul>
    </form>
  );
}

export default Login;
