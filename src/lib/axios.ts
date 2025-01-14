import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.vapi.ai',
    headers: {
        'Authorization': 'Bearer 021a13d6-f9ea-496a-8841-03263d341575',
        'Content-Type': 'application/json',
    }
});

export default axiosInstance; 