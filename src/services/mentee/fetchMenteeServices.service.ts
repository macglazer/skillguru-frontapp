import axios from "axios";
import {MenteeDTO} from "../../pages/app/MenteeProfileEdit/sections";

export interface JobPosition {
    id: number;
    name: string;
}


export const getMenteeProfileById = async (studentId: any) => {
    return await axios.get<MenteeDTO>(`/api/mentee/get-mentee-by-id/${studentId}`);
}

export const getMenteeByUserName = async (username: any) => {
    return await axios.get(`/api/mentee/get-mentee-by-mentee-username/${username}`);
}

