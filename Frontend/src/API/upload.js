import axios from 'axios';
const url="https://transfer-app-api.onrender.com/upload";

export const uploadProfileImg = (data)=>axios.post(`${url}`,data);
export const uploadCoverImg = (data)=>axios.post(`${url}`,data);