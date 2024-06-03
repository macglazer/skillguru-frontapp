import axios from "axios";
import {MenteeDTO} from "../../pages/app/MenteeProfileEdit/sections";

// MenteeDTO.ts
export interface JobPosition {
    id: number;
    name: string;
}

// export interface MenteeDTO {
//     email: string;
//     coverUrl: string;
//     avatarUrl: string;
//     id: string;
//     firstName: string;
//     lastName: string;
//     location: string;
//     profession: string;
//     jobPosition: JobPosition[];
// }

export const getMenteeProfileById = async (studentId: any) => {
    return await axios.get<MenteeDTO>(`/api/mentee/get-mentee-by-id/${studentId}`);
}