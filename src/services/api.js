import axios from "axios"

const API_ROOT = process.env.API_ROOT || "http://localhost:3001/api";

export const api = {
    GetProducts: async () => {
        return axios.get(`${API_ROOT}/api/products`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, }, })
    },
    DeleteProduct: async (id) => {
        return axios.delete(`${API_ROOT}/product/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, }, })
    },
    UpdateProduct: async (id, product) => {
        return axios.put(`${API_ROOT}/product/${id}`, product, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, }, })
    },
    CreateProduct: async (product) => {
        return axios.post(`${API_ROOT}/product`, product, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, }, })
    },
    Register: async (user) => {
        return axios.post(`${API_ROOT}/user/register`, user);
    },
    Login: async (user) => {
        return axios.get(`${API_ROOT}/api/login`, user)
    },
}