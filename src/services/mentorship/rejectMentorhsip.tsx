import axios from "axios";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const rejectMentorship = async (offerId: number) : Promise<boolean> => {
    await delay(1000);

    const res = await axios.post(`/api/mentorship/reject/${offerId}`);
    return true
}


