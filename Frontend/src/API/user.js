import axios from "axios";

const url = process.env.REACT_APP_BASE_URL + "/user";

export const getUser = (userId) => axios.get(`${url}/${userId}`);
export const getAllUsers = () => axios.get(`${url}`);
export const updateUser = (data) =>
  axios.put(`${url}/${data._id}/Update`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("profile")}`,
    },
  });
export const followUser = (userdId, id) =>
  axios.put(
    `${url}/${id}/Follow`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("profile")}`,
      },
    }
  );
export const UnFollowUser = (userId, id) =>
  axios.put(
    `${url}/${id}/UnFollow`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("profile")}`,
      },
    }
  );
export const fetchTopFollowed = () => axios.get(`${url}/TopFollowed`);
