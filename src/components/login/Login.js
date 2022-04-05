import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/slices/loggedIn';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log(username);
    console.log(password);
  }, [username, password]);

  // const dispatch = useDispatch();
  // dispatch(login())

  function loginHandler() {}

  return (
    <form className='login_form' onSubmit={loginHandler}>
      <ul>
        <li>
          <input
            id='username'
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </li>
        <li>
          <input
            id='password'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </li>
        <div>
          <button className='login_form_submit_button'>enter</button>
        </div>
      </ul>
    </form>
  );
}

export default Login;
