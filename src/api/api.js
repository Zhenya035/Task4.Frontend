import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'https://task4.somee.com',
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
    },
    blockUsers(userIds) {
        return apiClient.post(`users/block`,  userIds, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
    },
    unblockUsers(userIds) {
        return apiClient.post(`users/unblock`,  userIds, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
    },
    deleteUsers(userIds) {
        return apiClient.post(`users/delete`,  userIds, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
    }
}