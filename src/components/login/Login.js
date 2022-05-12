import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/slices/loggedIn';
import { setJwtToken } from '../../store/slices/jwtToken';
import urlencoded from '../../helpers/urlencoded';

import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorClass, setErrorClass] = useState('');
  const dispatch = useDispatch();

  function testHandler() {
    setUsername('test');
    setPassword('123');
    // loginHandler();
  }

  function loginHandler(event) {
    event.preventDefault();

    const loginInfo = urlencoded({ username, password });
    fetch('https://whispering-depths-29284.herokuapp.com/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: loginInfo,
    })
      .then((result) => {
        if (result.status === 200) {
          // set login in state
          dispatch(login());
          // convert result to json
          return result.json();
        } else {
          // set error class on inputs
          setErrorClass('login_input_error');
          setTimeout(() => {
            setErrorClass('');
          }, 2000);
        }
      })
      .then((loginInfo) => {
        if (loginInfo) {
          const jwtToken = loginInfo.token;
          // set token in state
          dispatch(setJwtToken(jwtToken));
        }
      });
  }

  return (
    <form className='login_form' onSubmit={loginHandler}>
      <ul>
        <li>
          <input
            data-testid='login_username'
            className={errorClass}
            id='username'
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </li>
        <li>
          <input
            data-testid='login_password'
            className={errorClass}
            id='password'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </li>
        <div>
          <button className='login_form_submit_button'>submit</button>
          <button onClick={testHandler} className='test_login'>
            click here for test
          </button>
        </div>
      </ul>
    </form>
  );
}

export default Login;
