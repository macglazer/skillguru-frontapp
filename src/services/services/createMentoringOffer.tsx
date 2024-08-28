import {PlanInput} from "@customTypes/create-mentoring";
import axios from "axios";

type Response = { success: true } | { success: false, errorMessage: string };

type Input = {
    numberOfPlans: 1 | 2 | 3;
    providesMaterials: boolean;
    basic: PlanInput;
    advanced?: PlanInput;
    pro?: PlanInput;
}

export const createMentoringOffer = async (input: Input): Promise<Response> => {
    const plans = [
        {type: 'basic', ...input.basic},
        input.advanced && {type: 'advanced', ...input.advanced},
        input.pro && {type: 'pro', ...input.pro},
    ].filter(Boolean);

    const body = {
        numberOfPlans: input.numberOfPlans,
        providesMaterials: input.providesMaterials,
        plans,
    };
    try {
        const response = await axios.post('/api/mentorship/create/mentorship-plans', body);
        if (response.status === 200) {
            return {success: true};
        } else {
            console.log('tutaj jeden ')
            return {success: false, errorMessage: `Failed to create mentorship plan. Status code: ${response.status}`};
        }
    } catch (error) {
        console.log('tutaj dwa ')
        console.error('Failed to create mentorship plan', error);
        return {success: false, errorMessage: 'Failed to create mentorship plan'};
    }
};