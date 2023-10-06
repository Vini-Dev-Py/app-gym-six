import React from 'react';
import { useNavigate } from "react-router-dom";
import './ButtonHome.css';

const ButtonHome = () => {

    const navigate = useNavigate();

    const navigateToHome = async () => {
        navigate("/");
    }

    return (
        <button className="home" role="button" onClick={navigateToHome}>
            Home
        </button>
    );
};

export default ButtonHome;