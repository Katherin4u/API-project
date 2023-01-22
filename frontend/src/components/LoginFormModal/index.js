// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    return await dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          console.log(data)
          if (data && data.errors) setErrors([...data.errors]);
          else if(data && data.message) setErrors([data.message])
        }
      );
  };

  return (
    <div className="main-login-container">
      <h1 className="login-title">Log In</h1>
      <form onSubmit={handleSubmit}>
        <h2 className="login-title-webname">
          Welcome to Airbnb-Dupe
        </h2>
        <ul className="som">
          {errors.length > 0 && errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="password-usernameoremail">
          <div className="email-username-input">
            <label>
              <input
                placeholder="Username or Email"
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                className="demo-input-email-password"
              />
            </label>

          </div>
          <div className="password-input">
            <label>
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="demo-input"
              />
            </label>
          </div>
          <span className="disclaimer">
            Disclaimer this is not the actual Airbnb website.
          </span>
        </div>
        <div className="button-style">
          <button className="submit-login-button" type="submit">Log In</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;