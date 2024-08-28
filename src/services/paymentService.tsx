import axios from "axios";

export const createCheckoutSession = async (sessionData:any) => {
    return await axios.post('/api/stripe/create-checkout-session',sessionData);
}