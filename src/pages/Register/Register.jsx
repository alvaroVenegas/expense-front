import React, { useState } from 'react';
import { postRegister } from "../../api/api";
import { useHistory } from 'react-router-dom'
import "./Register.scss";

const INITIAL_STATE = {
    userName: "",
    email: "",
    password: ""
};

const Register = (props) => {
    const [registerForm, setRegisterForm] = useState(INITIAL_STATE);
    const [error, setError] = useState("");
    const history = useHistory();

    const submitForm = async (event) => {
        event.preventDefault();
        setError("");

        try {
            const user = await postRegister(registerForm);
            props.storeUser(user);
            setRegisterForm(INITIAL_STATE);
            history.push('/details')
        } catch (error) {
            console.log("Error en el registro: ", error);
            setError(error.message);
        }
    };

    const handleInput = (ev) => {
        const { name, value } = ev.target;
        setRegisterForm({ ...registerForm, [name]: value });
    };

    return (
        <div>
            <div className="info">
                <h1 className="info__title">EXPENSE APP</h1>
                <h2 className="info__slogan">Make your life better by saving money</h2>
            </div>
            <div className="layout">
                <div className="container">
                    <div className="form">
                        <form onSubmit={submitForm}>
                            <label>
                                <p>Username</p>
                                <input type="text" name="userName" value={registerForm.userName} onChange={handleInput} />
                            </label>
                            <label>
                                <p>Email</p>
                                <input type="email" name="email" value={registerForm.email} onChange={handleInput} />
                            </label>
                            <label>
                                <p>Password</p>
                                <input type="password" name="password" value={registerForm.password} onChange={handleInput} />
                            </label>

                            {error && <div>{error}</div>}

                            <div>
                                <input className="register-btn" type="submit" value="Registrarse" />
                            </div>
                        </form>
                        <div className="signin">
                            <p>Estas registrado? <a href="/login">LogIn</a>.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
};

export default Register;