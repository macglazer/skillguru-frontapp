import mentorRegisterInitialState from "./constants";
import {MentorRegisterReducerAction, MentorRegisterReducerState} from "./types";
import exhaustiveGuard from "../../helpers/exhaustiveGuard";

const mentorRegisterReducer = (
    state = mentorRegisterInitialState,
    action: MentorRegisterReducerAction
): MentorRegisterReducerState => {
    const getMaxVisitedStep = (step: number) => Math.max(state.maxVisitedStep || 0, step);
    switch (action.type) {
        case 'COMMIT_REGISTER_INFO':
            return {
                ...state,
                step: 1,
                maxVisitedStep: getMaxVisitedStep(1),
                formData: {...state.formData, ...action.payload},
            };
        case 'COMMIT_ABOUT_INFO':
            return {
                ...state,
                step: 2,
                maxVisitedStep: getMaxVisitedStep(2),
                formData: {...state.formData, ...action.payload},
            };
        case 'COMMIT_PROFILE_INFO':
            return {
                ...state,
                step: 3,
                maxVisitedStep: getMaxVisitedStep(3),
                formData: {...state.formData, ...action.payload},
            };
        case 'COMMIT_PORTFOLIO_INFO':
            return {
                ...state,
                step: 4,
                maxVisitedStep: getMaxVisitedStep(4),
                formData: {...state.formData, ...action.payload},
            };
        case 'SET_USER_ID':
            return {
                ...state,
                userId: action.payload,
            };
        case 'GO_TO_STEP':
            return {
                ...state,
                step: action.payload,
            };
        case 'FLUSH_STATE': {
            return mentorRegisterInitialState;
        }
        default:
            return exhaustiveGuard(action);
    }
}

export default mentorRegisterReducer;