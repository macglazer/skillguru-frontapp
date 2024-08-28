import {MentorDetails, PlanDetails} from "src/reducers/mentorship-application/types"
import axios from "axios";

type AvailableGoalsDTO = {
    value: string,
    label: string;
}

type Output = {
    mentor: MentorDetails
    plan: PlanDetails
    availableGoals: AvailableGoalsDTO[]
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getMentorshipDetails = async (mentorshipId: number): Promise<Output> => {
    await delay(1000);

    const response = await axios.get(`/api/mentorship/get-selected-mentorship-by/${mentorshipId}`);
    const mentor = await axios.get(`/api/mentorship/get-selected-mentor-by-mentorshipId/${mentorshipId}`);
    const getAllMenteeAvailableGoal = await axios.get('/api/mentorship/get-all-mentee-available-goal');

    return {
        mentor: {
            id: mentor.data.data.mentorId,
            fullName: mentor.data.data.fullName,
            avatarUrl: mentor.data.data.avatarUrl,
            rate: 4,
            profession: mentor.data.data.profession,
            company: mentor.data.data.company,
        },
        plan: {
            id: response.data.data.id,
            plan: response.data.title,
            monthlyPrice: response.data.data.price,
            included: (response.data.data.descriptionRows || []).map((element: any) => {
                return element.description;
            })
        },

        availableGoals: getAllMenteeAvailableGoal.data.data.map((goal: any) => ({
            label: goal.label,
            value: goal.value
        })) as AvailableGoalsDTO[],
    }
}