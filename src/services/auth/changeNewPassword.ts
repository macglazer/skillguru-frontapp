import {ChangePasswordDTO, SetNewPasswordDTO, SetNewPasswordInput} from "./setNewPassword.types";
import axios from "axios";

// const inputParser = (input: SetNewPasswordInput): SetNewPasswordDTO => {
//     return {
//         // password: input.password,
//         // token: input.changeToken,
//         // userId: ,
//         // repeatPassword: input.repeatPassword,
//         // email: input.email
//     }
// }

type SetNewPasswordServiceResponse = Promise<
    | { success: true }
    | { success: false, errorMessage: string }
>

const changeNewPasswordService = async (inputData: ChangePasswordDTO): SetNewPasswordServiceResponse => {

    try {
        const { status } = await axios.post('/api/auth/password/change-password', inputData);
        if(!status || status >= 300) throw 'Coś poszło nie tak';
        return { success: true };
    } catch (e) {
        return { success: false, errorMessage: typeof e === 'string' ? e : 'Coś poszło nie tak' };
    }
}




export  default changeNewPasswordService