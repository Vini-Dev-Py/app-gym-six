import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { signIn } from '../../services/auth';

export default function Login({ onLoginSuccess }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState(null);
    const [hasError, setHasError] = useState(false);
    const navigate = useNavigate();

    async function login(email, password) {
        const response = await signIn(email, password)

        setResponse(response);
    }

    const handlerLogin = async () => {
        await login(email, password);
    };

    useEffect(() => {
        if (response && response.status) {
            onLoginSuccess();
            navigate('/');
        } else if (response) {
            console.log("Erro no login");
            setHasError(true)
        }
    }, [response]);

    return (
        <div className="box">
            <div className="name">
                <h1 className="Name">GymSix</h1>
            </div>
            <div className="inputs">
                <div className="container">
                    <div className="box-inputs">
                        <div className={`login ${hasError ? 'has-error' : ''}`}>
                            <div className="title-input">
                                <span className="textInput">Email</span>
                                <span className={`invalid ${hasError ? 'show' : ''}`}>Invalido</span>
                            </div>
                            <input
                                type="text"
                                placeholder="email@gmail.com"
                                className={`user ${hasError ? 'input-error' : ''}`}
                                id="input_user"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={`login ${hasError ? 'has-error' : ''}`}>
                            <div className="title-input">
                                <span className="textInput">Password</span>
                                <span className={`invalid ${hasError ? 'show' : ''}`}>Invalido</span>
                            </div>
                            <input
                                type="password"
                                placeholder="s&nh@"
                                className={`password ${hasError ? 'input-error' : ''}`}
                                id="input_pass"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="box-buttons">
                        <button type="submit" className="login btn-grad" onClick={handlerLogin}>
                            Login
                        </button>
                        <div className="forgot-password">
                            <a href="">Esqueceu a senha ?</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}