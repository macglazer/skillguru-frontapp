import {FetchStudentMentorsInput, FetchStudentMentorsOutput,} from "./fetchStudentMentors.types";
import axios from "axios";

// export const fetchYoursStudentMentors = async (
//     props: FetchStudentMentorsInput
// ): Promise<FetchStudentMentorsOutput> => {
//   // const res = await fetch('/sessions-mocked.json')
//   // const response = await axios.get('/mentor/home/meeting/history');
//   // const response = await fetch('/student-mentors.json')
//   const response = await fetch('/api/subscriptions/fetch/mentee/mentor/subs')
//   // const data = response.data;
//   const data = await response.json();
//
//
//     return {
//         mentors: data.slice(0, props.take),
//         total: data.length,
//     };
// };

export const fetchYoursStudentMentors = async (
    props: FetchStudentMentorsInput
): Promise<FetchStudentMentorsOutput> => {
    try {
        const response = await axios.get('/api/subscriptions/mentee/mentor');
        const data = response.data;

        return {
            mentors: data.data.slice(0, props.take),
            total: data.data.length,
        };
    } catch (error) {
        console.error('Error fetching student mentors:', error);
        throw error;
    }
};
