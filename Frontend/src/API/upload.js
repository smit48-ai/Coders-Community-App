import axios from 'axios';

//for Dev
const url="http://localhost:8900/upload";
//for Deploy
// const url="https://transfer-app-api.onrender.com/upload";

export const uploadProfileImg = (data)=>axios.post(`${url}`,data);
export const uploadCoverImg = (data)=>axios.post(`${url}`,data);