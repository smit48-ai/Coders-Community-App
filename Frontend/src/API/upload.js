import axios from "axios";


const url = process.env.REACT_APP_BASE_URL + "/upload";


export const uploadProfileImg = (data) => axios.post(`${url}`, data);
export const uploadCoverImg = (data) => axios.post(`${url}`, data);
