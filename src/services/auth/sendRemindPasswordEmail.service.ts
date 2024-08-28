import axios from "axios";
import {EmailCheckDTO, EmailCheckInput, EmailCheckOutput} from "@services/emailCheck/emailCheck.types";


const parseDataForAPI = (data: EmailCheckInput): EmailCheckDTO => data;

const sendRemindPasswordEmailService = async (email: string) => {
    try {
        const {data} = await axios.post('/api/auth/password/reset-link',{
            email: parseDataForAPI(email)
        });
        return {success: !!data}
    } catch (e) {
        return {success: false}
    }
}

export default sendRemindPasswordEmailService;
