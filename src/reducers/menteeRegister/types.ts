import {
    MergedRegisterMenteeFormInput,
    RegisterFormInput
} from "@customTypes/registerFlow";

export type MenteeRegisterReducerState = {
    step: number,
    maxVisitedStep: number,
    userId: string | null,
    formData: MergedRegisterMenteeFormInput
};

export type MenteeRegisterReducerAction =
    | {
    type: 'COMMIT_REGISTER_INFO';
    payload: RegisterFormInput;
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