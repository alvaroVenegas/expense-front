import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { postLogin } from "../../api/api";
import './Login.scss';
import { useHistory } from 'react-router-dom'

const INITIAL_STATE = {
    email: "",
    password: ""
};


const Login = (props) => {
    const [loginForm, setLoginForm] = useState(INITIAL_STATE);
    const [error, setError] = useState("");
    const history = useHistory();
    const submitForm = async (event) => {
        event.preventDefault();
        setError("");

        try {
            const user = await postLogin(loginForm);
            props.storeUser(user);
            history.push('/details')
        } catch (error) {
            setError(error.message);
        }
    };

    const handleInput = (ev) => {
        const { name, value } = ev.target;
        setLoginForm({ ...loginForm, [name]: value });
    };

    return (
        <div>
            <div className="info">
                <h1 className="info__title">EXPENSE APP</h1>
                <h2 className="info__slogan">Make your life better by saving money</h2>
            </div>
            <div className="layout">
                <div className="login__container">
                    <div className="form">
                        <form onSubmit={submitForm}>
                            <label>
                                <p>Email</p>
                                <input type="email" name="email" placeholder="Introduce tu email" value={loginForm.email} onChange={handleInput} />
                            </label>
                            <label>
                                <p>Password</p>
                                <input type="password" name="password" placeholder="Introduce tu contraseña" value={loginForm.password} onChange={handleInput} />
                            </label>

                            {error && <div className="error">{error}</div>}

                            <div>
                                <button type="submit" value="Login" className="register-btn"> Entrar </button>
                            </div>
                        </form>

                        <div className="signin">
                            <p>No tienes una cuenta? <a href="/register">Registrar</a>.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default Login;