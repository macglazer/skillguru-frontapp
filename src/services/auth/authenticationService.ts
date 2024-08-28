import axios from "axios";

export const registerAccount = async (firstName: string, lastName: string, email: string, password: string, agreement: boolean) => {
    return await axios
        .post('/api/auth/student/register', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            agreement: agreement,
        });
}
export const loginUser = async (email: string, password: string) => {
    return await axios
        .post('api/auth/login', {
            email: email,
            password: password,
        });
}

export const loginGoogleUser = async (token: string) => {
    return await axios
        .post('api/auth/google-login', {
            tokenId: token
        });
}