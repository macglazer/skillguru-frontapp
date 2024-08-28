import axios from "axios";


export const fetchAllUserData = async () => {
    return await axios.get('/api/user/setting/get-all-users-data');
}