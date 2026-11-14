import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/api', // Base URL for all requests
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosClient;