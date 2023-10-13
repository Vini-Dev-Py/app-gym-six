import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import ButtonHome from "../../../components/ButtonHome/ButtonHome";
import { getTrainingsMember } from "../../../services/getTrainingsMember";
import { getUser } from "../../../services/getUser";
import YouTube from "react-youtube";
import "../Training.css";

export default function MemberTraining() {

    const { day } = useParams();
    const navigate = useNavigate();
    const [trainings, setTrainings] = useState(null);
    const [user, setUser] = useState(null);
    const [expandedIndex, setExpandedIndex] = useState(null);

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

    useEffect(() => {
        const fetchData = async () => {
            var user = await getUser();

            user = JSON.parse(user);

            const response = await getTrainingsMember(user.id, day);

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
                <h1 className="title-member-training">Treino</h1>
                <div>
                    <ButtonHome />
                </div>
            </header>
            <section>
            {trainings.map((training, index) => (
                    <div className={`training ${expandedIndex === index ? "expanded" : ""}`} key={training.id}>
                        <div onClick={() => toggleExpansion(index)}>
                            <div className="training-header">
                                <div className="exercise-name">Exercício: {training.exercise_name}</div>
                                <div className="sets">Séries: {training.sets}</div>
                                <div className="reps">Repetições: {training.repes}</div>
                                <div className="rest-time">Tempo de descanso: {training.rest_time}</div>
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
    )
}