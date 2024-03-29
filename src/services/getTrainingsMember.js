import axios from 'axios';
import { url } from './api';

export const getTrainingsMember = async (id, day) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.get(url + `/workouts/member/${id}/${day}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        return (response.status === 200) ? response : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}