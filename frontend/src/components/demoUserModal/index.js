import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './demoUser.css'


function DemoUserModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("Demo-lition")
    const [password, setPassword] = useState('password')
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([])
        return dispatch(sessionActions.demoUsers({ credential, password }))
            .then(closeModal)
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            )
    }

    return (
        <div className="demo-container">
            <h1 className="demo-login">Demo Login</h1>
            <form onSubmit={handleSubmit}>
                <h2 className="demouser-title-webname">
                    Welcome to Dupe-brb
                </h2>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <div className="email-password-input">
                    <div className="email-username-demo-div">
                        <label>

                            <input
                                placeholder="Username or Email"
                                type="text"
                                value={credential}
                                required
                                className="demoUser-email-username"
                            />
                        </label>
                    </div>
                    <div className="password-demo-div">

                        <label>

                            <input
                                placeholder="Password"
                                type="password"
                                value={password}
                                required
                                className="password-demouser"
                            />
                        </label>
                    </div>
                    <span className="disclaimer-demo">
                        Disclaimer this is not the actual Airbnb website.
                    </span>
                </div>
                <div className="button-style-demouser">

                    <button
                        className="submit-demouser-button" type="submit">Demo Login</button>
                </div>

            </form >
        </div>

    )
}

export default DemoUserModal;