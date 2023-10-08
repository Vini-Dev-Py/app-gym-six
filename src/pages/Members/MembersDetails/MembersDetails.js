import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ButtonHome from "../../../components/ButtonHome/ButtonHome";
import Loading from "../../../components/Loading/Loading";
import { deleteAllTrainings } from "../../../services/deleteAllTrainings";
import { getMember } from "../../../services/getMember";
import "./MembersDetails.css";

export default function MembersDetails() {

    const { id } = useParams();
    const [aluno, setAluno] = useState(null);
    const navigate = useNavigate();

    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    const daysPT = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];

    function navigateToTraining(url) {
        navigate(url);
    }

    async function handlerDeleteAllTrainings(id) {
        const response = await deleteAllTrainings(id);
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await getMember(id);

            setAluno(response.data["data"]);
        }

        fetchData();
    }, [])

    if (!aluno) {
        return (
            <div>
                <Loading />
            </div>
        )
    }

    return (
        <div className="container">
            <header className="header-member">
                <h1 className="title-member-details">
                    Detalhes do aluno
                </h1>
                <ButtonHome />
            </header>
            <div>
                <table id="aluno">
                    <tbody>
                        <tr>
                            <td>Nome:</td>
                            <td>{aluno.name}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{aluno.email}</td>
                        </tr>
                        <tr>
                            <td>Telefone:</td>
                            <td>{aluno.phone}</td>
                        </tr>
                        <tr>
                            <td>RG:</td>
                            <td>{aluno.RG !== null ? aluno.RG : "Sem registro"}</td>
                        </tr>
                        <tr>
                            <td>CPF:</td>
                            <td>{aluno.CPF}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                {
                    days.map((day, index) => (
                        <div className="day-training">
                            <div>
                                <h3>
                                    <Link className="link" to={`/aluno/${id}/treino/${day}/`}>{daysPT[index]}</Link>
                                </h3>
                            </div>
                            <div>
                                <button className="edit-training" onClick={() => {navigateToTraining(`/aluno/${id}/treino/${day}/`)}}>
                                    Editar treino
                                </button>
                                <button className="delete-trainign" onClick={() => handlerDeleteAllTrainings(id)}>
                                    Limpar treino
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}