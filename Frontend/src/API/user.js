import axios from 'axios';
const url="https://transfer-app-api.onrender.com/user";



export const getUser = (userId)=>axios.get(`${url}/${userId}`);
export const updateUser = (data)=>axios.put(`${url}/${data._id}/Update`,data, {headers: {
  'Authorization': `Bearer ${localStorage.getItem("profile")}`
}});
export const followUser=(userdId,id)=>axios.put(`${url}/${id}/Follow`,{}, {headers: {
  'Authorization': `Bearer ${localStorage.getItem("profile")}`
}});
export const UnFollowUser=(userId,id)=>axios.put(`${url}/${id}/UnFollow`,{}, {headers: {
  'Authorization': `Bearer ${localStorage.getItem("profile")}`
}});
export const fetchTopFollowed=()=>axios.get(`${url}/TopFollowed`);