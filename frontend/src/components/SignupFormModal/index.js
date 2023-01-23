import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return await dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors([...data.errors]);
        });
    } setErrors(['Please confirm passwords match before continuing'])
  };

  return (
    <div className="main-signup-container">
      <h1 className="signup-title">Sign Up</h1>
      <form
        className="form-input" onSubmit={handleSubmit}>
        <h2 className="sign-up-title-webname">
          Welcome to dupe-brb-loka
        </h2>
        <div className="error-div-signup">
          <ul className="validation-color-signup">
            {errors?.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>

        </div>
        <div className="email-radius">
          <label>
            <input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input"
            />
          </label>
        </div>
        <div>
          <label>
            <input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="username-input"
            />
          </label>
        </div>
        <label>
          <input
            placeholder='First Name'
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="firstname-input"
          />
        </label>
        <label>

          <input
            placeholder='Last Name'
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="lastname-input"
          />
        </label>
        <label>

          <input
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password-input-signup"
          />
        </label>
        <div className="password-radius">
          <label>
            <input
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="confirmpassword-input"
            />
          </label>

        </div>
        <span className="disclaimer-signup">
          Disclaimer this is not the actual Airbnb website.
        </span>
        <div className="sign-up-submit-div">

          <button className="signup-submit-button" type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;