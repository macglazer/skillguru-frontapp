import {RegisterMentorDTO} from "./registerMentor.types";
import axios from "axios";
import {MergedRegisterMentorFormInput} from "@customTypes/registerFlow";

const parseDataForAPI = (inputData: MergedRegisterMentorFormInput): RegisterMentorDTO => {
    return {
        ...inputData,
        personalWebsite: inputData.personalWebsite || null,
        linkedin: inputData.linkedin || null,
        twitter: inputData.twitter || null,
        github: inputData.github || null,
        dribble: inputData.dribble || null,
        behance: inputData.behance || null,

    };
}

const registerMentorService = async (inputData: MergedRegisterMentorFormInput) => {
    try {
        const formData = new FormData();

        const profilePhoto = inputData.profilePhoto ? inputData.profilePhoto[0] : null;

        if (profilePhoto != null) {
            formData.append('profilePhoto', profilePhoto);
            formData.append('formData', new Blob([JSON
                .stringify(inputData)], {
                type: 'application/json'
            }));
        }
        const response = await axios.post<string>('/api/auth/mentor/register', formData);

        return {success: true, data: response.data};
    } catch
        (e) {
        return {success: false, error: e};
    }

};


export default registerMentorService;