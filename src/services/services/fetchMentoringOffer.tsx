import {PlanInput} from "@customTypes/create-mentoring";
import axios from "axios";

type OutputData = {
    numberOfPlans: 1 | 2 | 3;
    providesMaterials: boolean;
    basic: PlanInput;
    advanced?: PlanInput;
    pro?: PlanInput;
    saved: boolean
}

type Response = { data: OutputData, success: true } | { success: false, errorMessage: string };

export const fetchMentoringOffer = async (): Promise<Response> => {
    try {
        // const response = await axios.post('/api/mentorship/create/mentorship-plans', body);
        // if (response.status === 201) {
            return {
                success: true,
                data: {
                    numberOfPlans: 3,
                    providesMaterials: true,
                    saved: true,
                    basic: {
                        schedule: '1',
                        price: 260,
                        description: 'Lorem ipsum',
                        sessionsPerMonth: 3,
                        sessionDuration: 45,
                        responseTime: 24,
                        planIncludes: [],
                        planType: 'basic',
                    },
                    advanced: {
                        schedule: '1',
                        price: 260,
                        description: 'Lorem ipsum',
                        sessionsPerMonth: 3,
                        sessionDuration: 45,
                        responseTime: 24,
                        planIncludes: [],
                        planType: 'advanced',
                    },
                    pro: {
                        schedule: '1',
                        price: 260,
                        description: 'Lorem ipsum',
                        sessionsPerMonth: 3,
                        sessionDuration: 45,
                        responseTime: 24,
                        planIncludes: [],
                        planType: 'pro',
                    },
                }
            };
        // } else {
        //     return {success: false, errorMessage: `Failed to create mentorship plan. Status code: ${response.status}`};
        // }
    } catch (error) {
        console.error('Failed to create mentorship plan', error);
        return {success: false, errorMessage: 'Failed to create mentorship plan'};
    }
};