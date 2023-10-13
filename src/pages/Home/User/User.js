import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';

export default function User({ user }) {

    const navigate = useNavigate();
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const daysPT = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];

    function navigateToTrainingMember(url) {
        navigate(url);
    }

    return (
        <main>
            <header>
                <h2>Bem vindo {user.name}</h2>
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
                                    <button className="edit-training" onClick={() => { navigateToTrainingMember(`/treino/${day}`) }}>
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