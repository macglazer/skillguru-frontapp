import {
    FetchRecommendedMentorsOutput,
    FetchRecommendedMentorsInput,
} from "./fetchRecommendedMentors.types";
import {FetchSimilarMentorsInput, FetchSimilarMentorsOutput} from "@services/mentor/fetchSimilarMentors.types";
import axios from "axios";

// export const fetchRecommendedMentors = async (
//     props: FetchRecommendedMentorsInput
// ): Promise<FetchRecommendedMentorsOutput> => {
//     const res = await fetch('/similar-mentors.json')
//     const data = await res.json()
//
//     return {
//         mentors: data.slice(0, props.take),
//     };
// };


export const fetchRecommendedMentors = async (props: FetchRecommendedMentorsInput): Promise<FetchRecommendedMentorsOutput> => {
    try {
        const response = await axios.get('/mentee/home/suggested');
        const data = response.data;

        return {
            mentors: data.slice(0, props.take),
        };
    } catch (error) {
        console.error('Error fetching similar mentors:', error);
        throw error;
    }
};
