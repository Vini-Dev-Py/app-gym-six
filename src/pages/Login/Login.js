import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { signIn } from '../../services/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Login({ onLoginSuccess }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    async function login(email, password) {
        const response = await signIn(email, password)

        setResponse(response);
    }

    const handlerLogin = async () => {
        await login(email, password);
    };

    const passwordInputType = showPassword ? 'text' : 'password';

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
                            <div className="password-input">
                                <input
                                    type={passwordInputType} // Tipo do campo de senha
                                    placeholder="s&nh@"
                                    className={`password ${hasError ? 'input-error' : ''}`}
                                    id="input_pass"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    className="toggle-password-button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEye : faEyeSlash}
                                        className={showPassword ? 'eye-open' : 'eye-closed'}
                                    />
                                </button>
                            </div>
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