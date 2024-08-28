export type SetNewPasswordInput = {
    password: string;
    repeatPassword: string;
    // changeToken: string;
    userToken: string;
    // email: string;
}

export type SetNewPasswordDTO = {
    password: string;
    repeatPassword: string;
    // changeToken: string;
    userToken: string;
    // email: string;
}

export type ChangePasswordDTO = {
    password: string;
    repeatPassword: string;
    email: string;

}