import {Input, OutputFailed, OutputSuccess} from './fetchMentorServices.types'
import {FiltersSelected, Mentor, Review} from "@customTypes/mentor";
import axios from "axios";

type ResponseData = {
    mentors: Mentor[];
    total: number;
};

export type ServiceMentoring = {
    id: string
    title: string
    subtitle: string
    price: number
    variant: '' | 'pro'
    descriptionRows: string[]
}

type FetchMentorReviewsInput = {
    mentorId: string;
    take: number;
    skip: number;
};

type FetchMentorReviewsData = {
    total: number;
    avgRate: number
    reviews: Review[];
};

export interface DescriptionRowDTO {
    description: string;
}

export interface MentorshipPlanDTO {
    id: string;
    title: string;
    subtitle: string;
    price: number;
    variant: string;
    descriptionRows: DescriptionRowDTO[];
    sessionsPerMonth: number;
    sessionDurationMinutes: number;
    responseTimeHours: number;
    providesMaterials: boolean;
    mentoringDescription: string;
}

export interface MentorshipDTO {
    mentorships: MentorshipPlanDTO[];
}

export const fetchMentorShip = async (input: Input): Promise<OutputSuccess | OutputFailed> => {
    try {
        const resp = await fetch('/mentor-services.json')
        const respData = await resp.json()
        return {
            success: true,
            session: respData.session,
            mentoring: respData.mentoring,
        }
    } catch (e) {
        return {success: false, error: 'Error'}
    }
}

export const fetchMentorMentorshipPlans = async (mentorId: any): Promise<MentorshipDTO> => {
    try {
        const response = await axios.get<any>(`/api/mentorship/mentors/${mentorId.mentorId}/mentorship-plans`);
        const mentoringData = response.data;
        const mentorships: MentorshipPlanDTO[] = mentoringData.map((plan: any) => ({
            id: plan.id,
            title: plan.title,
            subtitle: plan.subtitle,
            price: plan.price,
            variant: plan.variant,
            descriptionRows: plan.descriptionRows,
            sessionsPerMonth: plan.sessionsPerMonth,
            sessionDurationMinutes: plan.sessionDurationMinutes,
            responseTimeHours: plan.responseTimeHours,
            providesMaterials: plan.providesMaterials,
            mentoringDescription: plan.mentoringDescription
        }));
        return { mentorships };
    } catch (error) {
        console.error("Error fetching mentorship plans", error);
        throw error;
    }
};


export const fetchMentorFilteredList = async (take: number, skip: number, filters?: FiltersSelected): Promise<ResponseData> => {
    try {
        const filterMentorToSend = {
            take: 10,
            skip: 10,

            // take: take.toString(),
            // skip: skip.toString(),
            filters: filters || null
        };


        const response = await axios.post('/api/mentor/filtered-mentors', filterMentorToSend);


        const {total, mentors} = response.data;
        const filteredMentors = mentors.slice(skip, skip + take);


        return {total, mentors: filteredMentors}
    } catch (error) {
        console.error('Error fetching mentors:', error);
        throw error;
    }
};

export const fetchMentorReviews = async ({
                                             mentorId,
                                             take = 10,
                                             skip = 0,
                                         }: FetchMentorReviewsInput): Promise<FetchMentorReviewsData> => {
    try {
        const response = await fetch("/mentor-reviews.json");
        const responseData = await response.json();
        const {total, reviews, avgRate} = responseData;
        return {total, reviews, avgRate};
    } catch (error) {
        console.error("Error fetching mentor reviews:", error);
        throw error;
    }
};

export const getMentorProfileByID = async (mentorID: any) => {
    return await axios.get(`/api/mentor/get-mentor-by-mentor-id/${mentorID}`);

}
export const getMentorByUsername = async (username: any) => {
    return await axios.get(`/api/mentor/get-mentor-by-mentor-username/${username}`);
}

