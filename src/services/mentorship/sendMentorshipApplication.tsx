import axios from "axios";

type MentorshipOrderInput = {
    planId: number;
    selectedGoals: string[];
    timezone: string;
    location: string;
    description: string;
    questions: string;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const sendMentorshipApplication = async (props: MentorshipOrderInput): Promise<boolean> => {
    await delay(1000);
    await axios.post('/api/mentorship/mentorship-request', props);


    return true
}