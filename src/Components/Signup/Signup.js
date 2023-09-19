import "./Signup.scss";
import { useState } from "react";
import axios from "axios";
import Input from "../../Components/Input/Input";

function Signup ({handleLoggingIn}) {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post(`${process.env.REACT_APP_URL}/users/register`, {
                email: event.target.email.value,
                password: event.target.password.value,
                username: event.target.username.value,
            })
            .then(() => {
                setSuccess(true);
                setError("");
                event.target.reset();
            })
            .catch((error) => {
                setSuccess(false);
                setError(error.response.data);
            });
    };

    return (
        <main className="signup-page" >
            <form className="signup" onSubmit={handleSubmit}>
                <h1 className="signup__title">Sign up</h1>

                <Input type="text" name="username" label="Username" />
                <Input type="text" name="email" label="Email" />
                <Input type="password" name="password" label="Password" />

                <button className="signup__button">Sign up</button>

                {success && <div className="signup__message">Signed up!</div>}
                {error && <div className="signup__message">{error}</div>}
            </form>
            <p>Have an account? <span className="signup__span" onClick={handleLoggingIn}>Log in</span></p>
        </main>
    );
}

export default Signup;
