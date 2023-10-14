import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import ButtonHome from "../../../components/ButtonHome/ButtonHome";
import "../Training.css";
import { getTrainingMember } from "../../../services/getTrainingMember";
import { updateTrainingMember } from "../../../services/updateTrainingMember";

export default function UpdateTraining() {

    const { id, day, id_training } = useParams();
    const [trainign, setTraining] = useState(null);
    const [originalTraining, setOriginalTraining] = useState(null);
    const navigate = useNavigate();

    function navigateToMember() {
        navigate(`/aluno/${id}/treino/${day}`);
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await getTrainingMember(id_training);

            setTraining(response.data["data"]);
            setOriginalTraining(response.data["data"])
        }

        fetchData();
    }, [])

    const handlerSubmit = async (e) => {
        e.preventDefault();

        const trainignNew = Object.keys(trainign).reduce((acc, key) => {
            if (trainign[key] !== originalTraining[key]) {
                return { ...acc, [key]: trainign[key] };
            }

            return acc;
        }, {});

        const response = await updateTrainingMember(id_training, trainignNew);

        response ? navigate(`/aluno/${id}/treino/${day}`) : console.error("Erro ao atualizar o treino");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setTraining({
            ...trainign,
            [name]: value
        });
    };

    if (!trainign) {
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
                    Editar treino
                </h2>
                <div className="buttons-header">
                    <ButtonHome />
                    <button className="go-back" onClick={() => { navigateToMember() }}>
                        Voltar
                    </button>
                </div>
            </header>
            <section className="inputs">
                <form onSubmit={handlerSubmit}>
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
                            <button className="update-training" type="submit">
                                Salvar treino
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    )
}