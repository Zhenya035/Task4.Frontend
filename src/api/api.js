import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'http://localhost:5165',
    timeout: 5000,
});

export default {
    register(userData) {
        return apiClient.post('users/registration', userData);
    },
    login(userData) {
        return apiClient.post('users/login', userData);
    },
    getUsers(userId) {
        return apiClient.get(`users/${userId}/all`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
    }
}