import axios from "axios";

export const backend = axios.create({
    baseURL: 'https://auth-rg69.onrender.com/api/'
})