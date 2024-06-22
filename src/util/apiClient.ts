import axios from 'axios';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

apiClient.interceptors.request.use(
    (config) => {
        const accessToken = JSON.parse(localStorage.getItem('access_token'));
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        const serverResponse = response.data;
        if (serverResponse.accessToken != null) {
            localStorage.setItem('access_token', JSON.stringify(serverResponse.accessToken));
        }
        return response;
    },
    (error) => {
        console.error(error);
        return Promise.reject(error);
    }
);
