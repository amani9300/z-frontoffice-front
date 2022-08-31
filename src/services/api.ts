import axios from "axios"

const API_ROOT = import.meta.env.API_ROOT || "http://localhost:9999";

export const api = {
    GetProducts: async () => {
        return axios.get(`${API_ROOT}/products`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, }, })
    },
    DeleteProduct: async (id) => {
        return axios.delete(`${API_ROOT}/products/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, }, })
    },
    UpdateProduct: async (id, product) => {
        return axios.put(`${API_ROOT}/products/${id}`, product, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, }, })
    },
    CreateProduct: async (product) => {
        return axios.post(`${API_ROOT}/products`, product, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, }, })
    },
    Register: async (user) => {
        try {
            await axios.post(`${API_ROOT}/auth/register`, user);
        } catch (e) {
            throw new Error(e.response.data.message || 'An error has occured');
        }
    },
    Login: async (user) => {
        return axios.post(`${API_ROOT}/auth/login`, user)
    },
}