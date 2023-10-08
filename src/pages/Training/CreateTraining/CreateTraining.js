import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import ButtonHome from "../../../components/ButtonHome/ButtonHome";
import { getUser } from "../../../services/getUser";
import "../Training.css";
import { createTraining } from "../../../services/createTraining";

export default function CreateTraining() {

    const { id, day } = useParams();
    const [personal, setPersonal] = useState(null);
    const navigate = useNavigate();

    const [trainign, setTraining] = useState({
        exercise_name: "",
        url_video_img: "",
        sets: "",
        repes: "",
        rest_time: "",
        day: day,
        id_user: id,
        id_personal_code: null,
        position: parseInt(localStorage.getItem("position")) + 1
    })

    function navigateToMember() {
        navigate(`/aluno/${id}/treino/${day}`);
    }

    async function getUserLocal() {
        const response = await getUser();

        setPersonal(JSON.parse(response));
    }

    useEffect(() => {
        getUserLocal();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        trainign.id_personal_code = personal.id_personal_code;

        const response = await createTraining(trainign);

        response ? navigate(`/aluno/${id}/treino/${day}`) : console.error("Erro ao criar o treino");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setTraining({
            ...trainign,
            [name]: value
        });
    };

    if (!personal) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    return (
        <div className="container">
            <header className="header">
                <h2>
                    Criar treino
                </h2>
                <div className="flex-buttons">
                    <div>
                        <ButtonHome />
                    </div>
                    <div>
                        <button className="go-back" onClick={() => { navigateToMember() }}>
                            Voltar
                        </button>
                    </div>
                </div>
            </header>
            <div className="inputs">
                <form onSubmit={handleSubmit}>
                    <div className="flex-inputs">
                        <div className="container-input exercise_name">
                            <label>Nome do exercício:</label>
                            <input className="inputs exercise_name"
                                type="text"
                                name="exercise_name"
                                value={trainign.exercise_name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex-inputs">
                        <div className="container-input url_video_img">
                            <label>Url do video:</label>
                            <input className="inputs url_video_img"
                                type="text"
                                name="url_video_img"
                                value={trainign.url_video_img}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex-inputs">
                        <div className="container-input sets">
                            <label>Series:</label>
                            <input className="inputs sets"
                                type="text"
                                name="sets"
                                value={trainign.sets}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex-inputs">
                        <div className="container-input repes">
                            <label>Repetições:</label>
                            <input className="inputs repes"
                                type="text"
                                name="repes"
                                value={trainign.repes}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex-inputs">
                        <div className="container-input rest_time">
                            <label>Tempo de descanso:</label>
                            <input className="inputs rest_time"
                                type="text"
                                name="rest_time"
                                value={trainign.rest_time}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex-buttons">
                        <div>
                            <button className="create-training" type="submit">
                                Criar treino
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}