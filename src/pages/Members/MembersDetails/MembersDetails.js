import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from '../../../components/Loading/Loading';
import { getMember } from "../../../services/getMember";
import "./MembersDetails.css";

export default function MembersDetails() {

    const { id } = useParams();
    const [aluno, setAluno] = useState(null);
    const navigate = useNavigate();

    const navigateToHome = async () => {
        navigate("/");
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
            <div>
                <h1 className="title-member-details">
                    Detalhes do aluno
                </h1>
            </div>
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
                            <td>{aluno.RG}</td>
                        </tr>
                        <tr>
                            <td>CPF:</td>
                            <td>{aluno.CPF}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}