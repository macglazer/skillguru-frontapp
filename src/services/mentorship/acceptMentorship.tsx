import axios from "axios";
import {FetchMentorStudentsOutput} from "@services/mentor/fetchMentorStudents.types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const acceptMentorship = async (offerId: number) : Promise<boolean> => {
    await delay(1000);

    console.log('tutaj testuje to chce sprawdzic, aplikacja zaakceptowana!', offerId)

    const res = await axios.get(`/api/mentorship/accept-mentorship/${offerId}`);

    return true
}
