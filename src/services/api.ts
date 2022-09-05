import axios from "axios"
import { Product } from "../models/product";

const API_ROOT = import.meta.env.API_ROOT || "http://localhost:9999";

export const api = {
    GetProducts: async () => {
        return axios.get(`${API_ROOT}/products`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, }, })
    },
    DeleteProduct: async (id: string) => {
        return axios.delete(`${API_ROOT}/products/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, }, })
    },
    UpdateProduct: async (id: string, product: Product) => {
        return axios.put(`${API_ROOT}/products/${id}`, product, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, }, })
    },
    CreateProduct: async (product: Product) => {
        return axios.post(`${API_ROOT}/products`, product, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, }, })
    },
    Register: async (user: RegisterDto) => {
        try {
            await axios.post(`${API_ROOT}/auth/register`, user);
        } catch (e: any) {
            throw new Error(e.response.data.message || 'An error has occured');
        }
    },
    Login: async (user: LoginDto) => {
        return axios.post(`${API_ROOT}/auth/login`, user)
    },
}

export type LoginDto = {
    username: string;
    password: string;
}

export type RegisterDto = {
    lastName: string;
    firstName: string;
    username: string;
    password: string;
}