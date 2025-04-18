import axios from "axios";

const url = process.env.REACT_APP_BASE_URL + "/auth";

export const signup = (data) => axios.post(`${url}/register`, data);
export const login = (data) => axios.post(`${url}/Login`, data);
export const googlelogin = (data) => axios.post(`${url}/google`, data);
export const verify = (id, token) => axios.get(`${url}/${id}/verify/${token}`);
