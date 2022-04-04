import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../../store/slices/loggedIn';
import './login.css';

function Login() {
  const isLoggedIn = useSelector((state) => state.loggedIn.value);
  const dispatch = useDispatch();

  return <div></div>;
}

export default Login;
