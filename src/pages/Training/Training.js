import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Loading from "../../components/Loading/Loading";
import ButtonHome from "../../components/ButtonHome/ButtonHome";
import { getTrainingMember } from "../../services/getTrainingsMember";
import YouTube from "react-youtube";
import "./Training.css";

export default function Training() {
    const { id, day } = useParams();
    const navigate = useNavigate();

    const [trainings, setTrainings] = useState(null);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [orderedTrainings, setOrderedTrainings] = useState(trainings);

    function navigateToMember() {
        navigate(`/aluno/detalhes/${id}`);
    }

    function navigateToCreateTraining() {
        var position = trainings.at(-1).position;

        localStorage.setItem('position', position);

        navigate(`/aluno/${id}/treino/${day}/criar`);
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

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
    
        const updatedTrainings = [...orderedTrainings];
        const [reorderedItem] = updatedTrainings.splice(result.source.index, 1);
        updatedTrainings.splice(result.destination.index, 0, reorderedItem);
    
        setOrderedTrainings(updatedTrainings);
    };
    

    useEffect(() => {
        const fetchData = async () => {
            const response = await getTrainingMember(id);
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
                    <button className="button-delete">
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
                                    <button className="button-edit">
                                        Editar
                                    </button>
                                    <button className="button-delete-training">
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
