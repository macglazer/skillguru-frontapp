import {VerifyEmailAddressDTO} from "./verifyEmailAddress.types";
import axios, {AxiosResponse} from "axios";
import {VerificationFormInput} from "@customTypes/registerFlow";

export interface VerificationResponse {
    body: {
        message: string;
        success: boolean;
        errorCode: number;
    };
    statusCode: string;
    statusCodeValue: number;
}


const parseDataForAPI = (inputData: VerificationFormInput, userId: string): VerifyEmailAddressDTO => {
    return {userId, code: Object.values(inputData).join('')};
}

const verifyEmailAddressService = async (inputData: VerificationFormInput, userId: string): Promise<VerificationResponse> => {
    const response: AxiosResponse<VerificationResponse> = await axios.post('/api/auth/verify/email-address', parseDataForAPI(inputData, userId));
    return response.data;
}

export default verifyEmailAddressService;
