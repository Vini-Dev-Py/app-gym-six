import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import './Home.css';

import { getUser } from '../../services/getUser';
import Personal from './Personal/Personal';
import User from './User/User';

export default function Home() {

    const [user, setUser] = useState(null);

    async function getUserLocal() {
        const response = await getUser();

        setUser(JSON.parse(response));
    }

    useEffect(() => {
        getUserLocal();
    }, [])

    if (!user) {
        return (
            <div>
                <Loading />
            </div>
        )
    }

    return (
        <div className="container">
            {user.active && user.role === "personal" || user.role === "admin" ? 
                (
                    <Personal user={user} />
                ) :
                (
                    <User />
                )
            }
        </div>
    )
}