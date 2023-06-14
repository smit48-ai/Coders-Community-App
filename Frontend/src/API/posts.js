import axios from 'axios';
const url="http://localhost:8900/posts";

export const fetchPosts = ()=> axios.get(url);
export const createPost = (data)=>axios.post(`${url}/create`,data,{headers: {
  'Authorization': `Bearer ${localStorage.getItem("profile")}`
}})
export const AddComment = (data,id)=>axios.put(`${url}/${id}/Addcomment`,data,{headers: {
    'Authorization': `Bearer ${localStorage.getItem("profile")}`
  }})
export const likethePost =(userid,id)=>axios.put(`${url}/${id}/LikePost`,{},{headers: {
    'Authorization': `Bearer ${localStorage.getItem("profile")}`
  }});
export const unlikethePost=(userid,id)=>axios.put(`${url}/${id}/UnLikePost`,{},{headers: {
    'Authorization': `Bearer ${localStorage.getItem("profile")}`
  }});
export const savethePost=(userid,id)=>axios.put(`${url}/${id}/SavePost`,{},{headers: {
    'Authorization': `Bearer ${localStorage.getItem("profile")}`
  }});
export const unsavethePost=(userid,id)=>axios.put(`${url}/${id}/UnSavePost`,{},{headers: {
    'Authorization': `Bearer ${localStorage.getItem("profile")}`
  }});
export const deletePost=(id)=>axios.delete(`${url}/${id}`,{headers: {
  'Authorization': `Bearer ${localStorage.getItem("profile")}`
}})
export const getpostsbysearch =(search)=>axios.get(`${url}/search?content=${search}`);