import axios from 'axios';
import { url } from './api';

export const addUserToPersonal = async (id_user) => {
    try {
        const token = localStorage.getItem("token");

        const data = {
            id_user: id_user
        }

        const response = await axios.post(url + "/add/user/personal", data, {
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