import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/slices/loggedIn';
import { setJwtToken } from '../../store/slices/jwtToken';
import urlencoded from '../../helpers/urlencoded';

import './login.css';

function Login() {
  const jwtToken = useSelector((state) => state.jwtToken.value);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log(jwtToken);
  }, [jwtToken]);

  const dispatch = useDispatch();

  function loginHandler(event) {
    event.preventDefault();

    const loginInfo = urlencoded({ username, password });
    fetch('https://protected-beyond-87972.herokuapp.com/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: loginInfo,
    })
      .then((result) => {
        // login upon successful login
        if (result.status === 200) {
          dispatch(login());
          return result.json();
        } else {
          // set style for inputs
        }
      })
      .then((loginInfo) => {
        if (loginInfo) {
          const jwtToken = loginInfo.token;
          // set token
          dispatch(setJwtToken(`Token ${jwtToken}`));
        }
      });
  }

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
