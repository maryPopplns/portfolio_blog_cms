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
  const [errorStyle, setErrorStyle] = useState({});

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
        if (result.status === 200) {
          // set login in state
          dispatch(login());
          return result.json();
        } else {
          // set error styling on inputs
          setErrorStyle({
            color: 'red',
            outline: '2px solid red',
          });
        }
      })
      .then((loginInfo) => {
        if (loginInfo) {
          const jwtToken = loginInfo.token;
          // set token in state
          dispatch(setJwtToken(`Token ${jwtToken}`));
        }
      });
  }

  return (
    <form className='login_form' onSubmit={loginHandler}>
      <ul>
        <li>
          <input
            style={errorStyle}
            id='username'
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </li>
        <li>
          <input
            style={errorStyle}
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
