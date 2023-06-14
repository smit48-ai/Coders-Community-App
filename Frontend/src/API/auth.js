import axios from 'axios';
const url="https://transfer-app-api.onrender.com/auth";

export const signup = (data)=>axios.post(`${url}/register`, data)
export const login = (data)=>axios.post(`${url}/Login`, data)
export const verify =(id,token)=>axios.get(`${url}/${id}/verify/${token}`);