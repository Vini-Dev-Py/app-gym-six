import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import ButtonHome from "../../components/ButtonHome/ButtonHome";
import { getTrainingsMember } from "../../services/getTrainingsMember";
import YouTube from "react-youtube";
import "./Training.css";
import { deleteTraining } from "../../services/deleteTraining";
import { deleteAllTrainings } from "../../services/deleteAllTrainings";

export default function Training() {
    const { id, day } = useParams();
    const navigate = useNavigate();

    const [trainings, setTrainings] = useState(null);
    const [expandedIndex, setExpandedIndex] = useState(null);

    function navigateToMember() {
        navigate(`/aluno/detalhes/${id}`);
    }

    function navigateToCreateTraining() {
        try {
            var position = trainings.at(-1).position ? trainings.at(-1).position : 1;
        } catch (error) {
            var position = 1;
        }

        localStorage.setItem('position', position);

        navigate(`/aluno/${id}/treino/${day}/criar`);
    }

    function navigateToEditTraining(id_training) {
        navigate(`/aluno/${id}/treino/${day}/editar/${id_training}`);
    }

    function extractYouTubeVideoId(url) {
        const videoIdRegex = /(?:\?v=|\/embed\/|\/\d\/|\/vi\/|\/v\/|\/e\/|youtu.be\/|\/embed\/|\/user\/[^/]+\/U\/|\/user\/[^/]+\/c\/|\/user\/[^/]+\/[^?/]+\?annotation_id=annotation_\d+&feature=iv&src_vid=[^/]+&v=|\/attribution_link\?.*?&u=\/watch\?v=|\/watch\?feature=player_embedded&v=|\/embed\/videoseries\?list=|\/embed\/videoseries\?list=|\/embed\/user\/[^/]+\/U\/|\/embed\/user\/[^/]+\/c\/|\/embed\/user\/[^/]+\/[^?/]+\?annotation_id=annotation_\d+&feature=iv&src_vid=[^/]+&list=|\/oembed\?url=https:\/\/www.youtube.com\/playlist%3Flist%3D)([^#\&\?]*).*/;
        const match = url.match(videoIdRegex);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    }

    const toggleExpansion = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    function orderTrainings(id) {
        setTrainings((prevTreinings) => 
            prevTreinings.filter((training) => training.id !== id)
        );
    }

    async function handlerDeleteTraining(id) {
        const response = await deleteTraining(id);

        response ? orderTrainings(id) : console.error("Erro ao deletar treino");
    }

    async function handlerDeleteAllTrainings(id) {
        const response = await deleteAllTrainings(id);

        setTrainings([]);
    }
    

    useEffect(() => {
        const fetchData = async () => {
            const response = await getTrainingsMember(id, day);
            setTrainings(response.data["data"]);
        };

        fetchData();
    }, []);

    if (!trainings) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    return (
        <div className="container">
            <header className="header-training">
                <h1 className="title-member-training">Treino do aluno</h1>
                <div>
                    <ButtonHome />
                    <button className="go-back" onClick={() => navigateToMember()}>
                        Voltar
                    </button>
                </div>
            </header>
            <section>
                <div>
                    <button className="button-create" onClick={() => navigateToCreateTraining()}>
                        Criar bloco
                    </button>
                    <button className="button-delete" onClick={() => handlerDeleteAllTrainings(id)}>
                        Limpar treino
                    </button>
                </div>
            </section>
            <section>
                {trainings.map((training, index) => (
                    <div className={`training ${expandedIndex === index ? "expanded" : ""}`} key={training.id}>
                        <div onClick={() => toggleExpansion(index)}>
                            <div className="training-header">
                                <div className="exercise-name">Exercício: {training.exercise_name}</div>
                                <div className="sets">Séries: {training.sets}</div>
                                <div className="reps">Repetições: {training.repes}</div>
                                <div className="rest-time">Tempo de descanso: {training.rest_time}</div>
                                <div>
                                    <button className="button-edit" onClick={() => navigateToEditTraining(training.id)}>
                                        Editar
                                    </button>
                                    <button className="button-delete-training" onClick={() => { handlerDeleteTraining(training.id) }}>
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        </div>
                        {expandedIndex === index && (
                            <div className="expanded-content">
                                <div className="video-container">
                                    <YouTube videoId={extractYouTubeVideoId(training.url_video_img)} />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </section>
        </div>
    );
}
