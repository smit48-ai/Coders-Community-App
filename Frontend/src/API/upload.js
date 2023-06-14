import axios from 'axios';
const url="http://localhost:8900/upload";

export const uploadProfileImg = (data)=>axios.post(`${url}`,data);
export const uploadCoverImg = (data)=>axios.post(`${url}`,data);