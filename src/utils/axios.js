import axios from 'axios';

const api = axios.create({
    baseURL: 'https://team-management-api-service.vercel.app',
    timeout: 5000,
});

export default api;