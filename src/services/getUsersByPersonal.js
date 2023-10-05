import axios from 'axios';
import { url } from './api';

export const getUsersByPersonal = async (id_personal) => {
    try {
        const token = localStorage.getItem("token");
        
        const response = await axios.get(url + `/get/users/personal/${id_personal}`, {
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