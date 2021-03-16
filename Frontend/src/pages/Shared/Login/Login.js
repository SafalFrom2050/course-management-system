/* eslint-disable jsx-a11y/label-has-associated-control */

import { React, useRef, useContext } from 'react';
import './Login.css';
import './highlighters.css';
import './typography.css';
import Nav from './Nav';

import { useHttpClient } from '../../../hooks/http-hook';
import { AuthContext } from '../../../contexts/AuthContext';

export default function Login() {
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  const usernameRef = useRef();
  const passwordRef = useRef();

  async function authenticate(e) {
    const obj = { email: usernameRef.current.value, password: passwordRef.current.value };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    e.preventDefault();
    try {
      const returnedData = await sendRequest('http://localhost:5000/common/login', 'POST', obj, config);
      auth.login(returnedData.data);
    } catch (error) {
      //
    }
  }

  return (
    <div>
      <Nav />
      {/* <!-- Body section of login page -->
                <!-- Flex direction:row
                        Justify: Space-evenly --> */}
      <div className="main-container">

        {/* <!-- Heading 'Woodlands University College' -->
                        <!-- Flex direction:column --> */}

        <div className="first-half">
          <div className="page-heading">
            <h1>Woodlands</h1>
            <h2>University</h2>
            <h3>College</h3>
          </div>
        </div>

        {/* <!-- Login Part -->
                        <!-- Flex direction:row --> */}
        <div className="second-half">
          {/* <!-- Three rounded rectangles on left of login box --> */}
          <div className="highlighters-container">
            <div className="label-highlighter" />
            <div className="input-highlighter" />
            <div className="input-highlighter" />
          </div>

          {/* <!-- The main login box -->
                            <!-- Flex direction:column
                                Justify: flex-start --> */}
          <div className="login-box">
            <form className="login-form" onSubmit={authenticate}>
              <h2>Login</h2>
              <div className="username">
                <label>
                  <h4>Username</h4>
                  {' '}
                </label>
                <input type="text" name="username" id="username-input" ref={usernameRef} />
              </div>
              <div className="password">
                <label>
                  <h4>Password</h4>
                  {' '}
                </label>
                <input type="password" name="password" id="password-input" ref={passwordRef} />
              </div>
              <input type="submit" id="submit-input" value="Continue" />
            </form>
          </div>
        </div>

      </div>

    </div>
  );
}
