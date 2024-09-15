// Libraries
import {Dispatch} from 'react';
import {NavigateFunction} from 'react-router-dom';
// Service
import {parseUserFromJwt} from './parseUserFromJwt';
import paths from "../paths";
import {loginGoogleUser, loginUser} from "@services/auth/authenticationService";

type SuccessResponse = { success: true, userData: ReturnType<typeof parseUserFromJwt> & { id: string } };
type ErrorResponse = { success: false, errorMessage: string };

type LoginReturn = Promise<SuccessResponse | ErrorResponse>;

export const loginUserByEmail = async (email: string, password: string, rememberMe: boolean): LoginReturn => {
    try {
        const response = await loginUser(email, password);

        const status = response?.request?.status;

        if (status === 200 && response.data?.data) {
            const userJWT = response.data.data;
            return await getStoreAndReturnUserData(userJWT, email);
        }
        if (status === 401) {
            return { success: false, errorMessage: 'Złe hasło. Spróbuj ponownie.' };
        }
        if (status === 404) {
            return { success: false, errorMessage: 'Taki email nie istnieje w naszej bazie.' };
        }
        return { success: false, errorMessage: `Wystąpił problem: Status ${status}` };
    } catch (err: any) {
        return { success: false, errorMessage: 'Wystąpił nieznany problem z zalogowaniem.' };
    }
};

const getStoreAndReturnUserData = async (userJWT: string, email: string): LoginReturn => {
    const userData = parseUserFromJwt(userJWT);
    if (!userData) {
        return {success: false, errorMessage: 'Nie udało się pobrać danych użytkownika'};
    }

    localStorage.setItem('jwttoken', userJWT);
    return {
        success: true,
        userData: {
            id: userData.id,
            email: userData.email,
            role: userData.role[0],
            username: userData.username,
            stripeIntegrationStatus: userData.stripeIntegrationStatus,
        },
    };
};


export const loginUserByGoogle = async (email: string, token: string): LoginReturn => {
    try {
        const {data: {body: userJWT}} = await loginGoogleUser(token);
        return getStoreAndReturnUserData(userJWT, email);
    } catch (err) {
        return {
            success: false,
            errorMessage: typeof err === 'string' ? err : 'Wystąpił problem z zalogowaniem przez Google'
        };
    }
};

export const logout = (dispatch: Dispatch<any>, navigate: NavigateFunction) => {
    localStorage.removeItem('jwttoken');
    dispatch({type: 'LOGOUT'});
    navigate(paths.login);
};


