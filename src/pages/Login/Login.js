import './Login.scss';
import Input from "../../Components/Input/Input";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post("http://localhost:8080/users/login", {
            email: event.target.email.value,
            password: event.target.password.value
        })
            .then((response) => {
                sessionStorage.setItem("token", response.data.token);
                navigate('/');
            })
            .catch((error) => {
                setError(error.response.data);
            });
    };

    return (
        <main className="login-page">
            <form className="login" onSubmit={handleSubmit}>
                <Input type="text" name="email" label="Email" />
                <Input type="password" name="password" label="Password" />

                <button className="login__button">
                    Log in
                </button>

                {error && <div className="login__message">{error}</div>}
            </form>
            <p>
                Need an account? <Link to="/signup">Sign up</Link>
            </p>
        </main>
    );
}

export default Login;
