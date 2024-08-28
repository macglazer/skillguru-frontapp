import axios from "axios";

export const fetchUserImageFile = async (userId: number) => {
   return  await axios.get(`/api/file/avatar/${userId}`);
}

export const fetchUserCoverFile = async (userId: number) => {
   return  await axios.get(`/api/file/cover/${userId}`);
}