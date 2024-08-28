import {
    AboutFormInput,
    MergedRegisterMentorFormInput,
    PortfolioFormInput,
    ProfileFormInput,
    RegisterFormInput
} from "@customTypes/registerFlow";

export type MentorRegisterReducerState = {
    step: number,
    maxVisitedStep: number,
    userId: string | null,
    formData: MergedRegisterMentorFormInput
};

export type MentorRegisterReducerAction =
    | {
    type: 'COMMIT_REGISTER_INFO';
    payload: RegisterFormInput;
}
    | {
    type: 'COMMIT_ABOUT_INFO';
    payload: AboutFormInput;
}
    | {
    type: 'COMMIT_PROFILE_INFO';
    payload: ProfileFormInput;
}
    | {
    type: 'COMMIT_PORTFOLIO_INFO';
    payload: PortfolioFormInput;
}
    | {
    type: 'FLUSH_STATE'
}
    | {
    type: 'SET_USER_ID';
    payload: string;
}
    | {
    type: 'GO_TO_STEP';
    payload: number;
}