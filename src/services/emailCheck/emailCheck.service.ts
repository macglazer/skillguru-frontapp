import {EmailCheckDTO, EmailCheckInput, EmailCheckOutput} from "./emailCheck.types";
import axios from "axios";

const parseDataForAPI = (data: EmailCheckInput): EmailCheckDTO => data;

const emailCheckService = (emailToCheck: EmailCheckInput): Promise<EmailCheckOutput> => {
    return axios.post('/api/auth/mentor/check-email-exist', {
        email: parseDataForAPI(emailToCheck)
    })
        .then((response) => {
            return response.data as EmailCheckOutput;
        })
        .catch((error) => {
            console.error(error);
            return false;
        });
};

export default emailCheckService;
