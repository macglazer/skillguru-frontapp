import {MentorRegisterReducerState} from "./types";

const mentorRegisterInitialState: MentorRegisterReducerState =  {
    step: 0,
    maxVisitedStep: 0,
    userId: null,
    formData: {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        acceptRules: false,

        profession: "",
        company: "",
        timezone: 0,
        language: "",

        profilePhoto: null,
        bio: "",
        skills: [],

        personalWebsite: "",
        linkedin: "",
        twitter: "",
        github: "",
        dribble: "",
        behance: ""
    }
};

export default mentorRegisterInitialState;