import menteeRegisterInitialState from "./constants";
import {MenteeRegisterReducerState, MenteeRegisterReducerAction} from "./types";
import exhaustiveGuard from "../../helpers/exhaustiveGuard";

const menteeRegisterReducer = (
    state = menteeRegisterInitialState,
    action: MenteeRegisterReducerAction
): MenteeRegisterReducerState => {
    const getMaxVisitedStep = (step: number) => Math.max(state.maxVisitedStep || 0, step);
    switch (action.type) {
        case 'COMMIT_REGISTER_INFO':
            return {
                ...state,
                step: 1,
                maxVisitedStep: getMaxVisitedStep(1),
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
            return menteeRegisterInitialState;
        }
        default:
            return exhaustiveGuard(action);
    }
}

export default menteeRegisterReducer;