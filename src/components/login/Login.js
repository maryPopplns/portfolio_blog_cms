import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../../store/slices/loggedin';
import './login.css';

function Login() {
  const status = useSelector((state) => state.loggedin.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button aria-label='Increment value' onClick={() => dispatch(login())}>
          login
        </button>
        <span>{`${status}`}</span>
        <button aria-label='Decrement value' onClick={() => dispatch(logout())}>
          logout
        </button>
      </div>
    </div>
  );
}

export default Login;
