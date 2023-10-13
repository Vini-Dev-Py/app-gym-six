import axios from 'axios';
import { url } from './api';

export const signIn = async (email, password) => {
    try {
        const response = await axios.post(`${url}/login`, {
            email,
            password
        });

        const { id, name, role, active, personal } = response.data.user;
        const id_personal = personal ? personal.id : null;

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('app-gym-six-user', JSON.stringify({
            id,
            name,
            email,
            role,
            active,
            id_personal_code: id_personal
        }));

        return response.status === 200 ? response : false;
    } catch (error) {
        console.error(error);
        return false;
    }
};
