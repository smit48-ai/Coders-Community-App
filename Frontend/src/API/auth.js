import axios from 'axios';
//for Dev
const url="http://localhost:8900/auth";
//for Deploy
// const url="https://transfer-app-api.onrender.com/auth";

export const signup = (data)=>axios.post(`${url}/register`, data)
export const login = (data)=>axios.post(`${url}/Login`, data)
export const verify =(id,token)=>axios.get(`${url}/${id}/verify/${token}`);