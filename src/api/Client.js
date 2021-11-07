import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:3001'
});

export const setAuthorizationHeader = (token) => {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const removeAuthorizationHeader = () => {
    delete client.defaults.headers.common['Authorization'];
}


export default client;