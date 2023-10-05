import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addUserToPersonal } from "../../../services/addUserToPersonal";
import { createMember } from "../../../services/createMember";
import "./MembersCreate.css";

export default function MembersCreate() {

    const [aluno, setAluno] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        phone: "",
        RG: "",
        CPF: ""
    });

    const navigate = useNavigate();

    const navigateToHome = async () => {
        navigate("/");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await createMember(aluno);

        const responsePersonal = await addUserToPersonal(response.data["data"]["id"]);

        response ? navigate(`/`) : console.error("Erro ao criar o aluno");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setAluno({
            ...aluno,
            [name]: value
        });
    };

    return (
        <div className="container">
            <div>
                <h2>
                    Criar aluno
                </h2>
            </div>
            <div className="inputs">
                <form onSubmit={handleSubmit}>
                    <div className="flex-inputs">
                        <div className="container-input nome">
                            <label>Nome:</label>
                            <input className="inputs name"
                                type="text"
                                name="name"
                                value={aluno.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex-inputs">
                        <div className="container-input email">
                            <label>Email:</label>
                            <input className="inputs email"
                                type="text"
                                name="email"
                                value={aluno.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex-inputs">
                        <div className="container-input password">
                            <label>Password:</label>
                            <input className="inputs password"
                                type="text"
                                name="password"
                                value={aluno.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex-inputs">
                        <div className="container-input phone">
                            <label>Telefone:</label>
                            <input className="inputs phone"
                                type="text"
                                name="phone"
                                value={aluno.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex-inputs">
                        <div className="container-input email">
                            <label>RG:</label>
                            <input className="inputs RG"
                                type="text"
                                name="RG"
                                value={aluno.RG}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex-inputs">
                        <div className="container-input CPF">
                            <label>CPF:</label>
                            <input className="inputs CPF"
                                type="text"
                                name="CPF"
                                value={aluno.CPF}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex-buttons">
                        <div>
                            <button onClick={navigateToHome} className="home">
                                Home
                            </button>
                        </div>
                        <div>
                            <button className="criar-aluno-button" type="submit">
                                Cadastrar Aluno
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}