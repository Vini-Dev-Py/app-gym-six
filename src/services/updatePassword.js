import axios from 'axios';
import { url } from './api';

export const updatePassword = async (password) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.put(url + `/user/password`, password, {
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