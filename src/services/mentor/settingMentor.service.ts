import axios from "axios";
import {SpecialVariant} from "@customTypes/mentor";
import {DropdownOption} from "@customTypes/dropdownOption";

type MentorPersonalData = {
    firstName: string;
    surname: string;
    avatarUrl: File[];
    coverUrl: File[];
};

export interface MentorData {
    avatar_url: string;
    description: string;
    id: string;
    firstName: string;
    lastName: string;
    price: number;
    location: string;
    profession: string;
    reviewsAvgRate: number;
    reviewsCount: number;
    special: string;
    title: string;
    intro: string;
    jobPosition: string;
    profileImage: string;

    specialVariant: SpecialVariant;
    services: DropdownOption[];
    skill: DropdownOption[];
    // mentorTopics: DropdownOption[];
    mentorCategory: DropdownOption[];
    linkedin: string | null;
    website: string | null;
    youtube: string | null;
    instagram: string | null;
    twitter: string | null;
    facebook: string | null;
    dribble: string | null;
    behance: string | null;
    avatarUrl: File[];
    coverUrl: File[];
}


export type MentorEditProfileFormInput = {
    heading: string;
    profession: string;
    company: string;
    biography: string;
    skill: DropdownOption[];
    services: DropdownOption[];
    timezone: string;
    language: DropdownOption[];
    categories: DropdownOption[];
    mentorTopics: DropdownOption[];
};

interface MentorEditLinksFormInput {
    website: string;
    linkedin: string;
    twitter: string;
    github: string;
    dribble: string;
    behance: string;
    youtube: string;
    facebook: string;
};


const updateUserPersonalData = async (personalData: MentorPersonalData) => {
    try {
        const formData = new FormData();

        const profilePhoto = personalData.avatarUrl ? personalData.avatarUrl[0] : null;
        const profilePhotoCover = personalData.coverUrl ? personalData.coverUrl[0] : null;

        if (profilePhoto != null) {
            formData.append('profilePhoto', profilePhoto);
        }

        if (profilePhotoCover != null) {
            formData.append('profilePhotoCover', profilePhotoCover);
        }

        formData.append('formData', new Blob([JSON.stringify(personalData)], {
            type: 'application/json'
        }));

        return await axios.patch('/api/user/setting/personal-data', formData);

    } catch (error) {
        console.error(error);
        throw new Error("Failed to update personal data");
    }
};


export const updateUserProfile = async (mentorEditSection: MentorEditProfileFormInput) => {
    console.log(mentorEditSection)
    try {

        return await axios.patch<string>('/api/user/setting/profile', mentorEditSection);

    } catch (error) {
        console.error(error);
        throw new Error("Failed to update personal data");
    }
};

export const updateUserSocialLinks = async (mentorEditLinksSocial: MentorEditLinksFormInput) => {
    try {

        return await axios.patch<string>('/api/user/setting/social', mentorEditLinksSocial);

    } catch (error) {
        console.error(error);
        throw new Error("Failed to update personal data");
    }
}

export default updateUserPersonalData;