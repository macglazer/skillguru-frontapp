import {MenteeRegisterReducerState} from "./types";

const menteeRegisterInitialState: MenteeRegisterReducerState =  {
    step: 0,
    maxVisitedStep: 0,
    userId: null,
    formData: {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        acceptRules: false,
    }
};

export default menteeRegisterInitialState;