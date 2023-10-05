import axios from 'axios';
import { url } from './api';

export const signIn = async (email, password) => {
    try {
        const response = await axios.post(url + '/login', {
            email: email, 
            password: password 
        })

        const { id, name, role, active } = response.data["user"];

        localStorage.setItem('token', response.data["token"]);
        localStorage.setItem('app-gym-six-user', JSON.stringify({
            id: id,
            name: name,
            email: email,
            role: role,
            active: active
        }));

        return (response.status === 200) ? response : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}