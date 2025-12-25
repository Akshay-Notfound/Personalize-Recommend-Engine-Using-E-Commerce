import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getProducts = () => api.get('/products');
export const getProduct = (id) => api.get(`/products/${id}`);
export const getRecommendations = (userId) => api.get(`/recommend/${userId}`);

export default api;
