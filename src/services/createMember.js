import axios from 'axios';
import { url } from './api';

export const createMember = async (aluno) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.post(url + "/user", aluno, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        return (response.status === 201) ? response : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}