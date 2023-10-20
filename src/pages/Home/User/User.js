import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./User.css";

export default function User({ user }) {

    const navigate = useNavigate();
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const daysPT = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];

    function navigateToTrainingMember(url) {
        navigate(url);
    }

    function navigateToProfile() {
        navigate("/profile");
    }

    return (
        <main>
            <header className="header">
                <div>
                    <h2>Bem vindo {user.name}</h2>
                </div>
                <div>
                    <button onClick={navigateToProfile} className="button-user">
                        <FontAwesomeIcon className="icon-user" icon={faUser} />
                    </button>
                </div>
            </header>
            <section>
                <div>
                    {
                        days.map((day, index) => (
                            <div key={day} className="day-training">
                                <div>
                                    <h3>
                                        <Link className="link" to={`/treino/${day}`}>{daysPT[index]}</Link>
                                    </h3>
                                </div>
                                <div>
                                    <button className="view-training" onClick={() => { navigateToTrainingMember(`/treino/${day}`) }}>
                                        Ver treino
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
        </main>
    )
}