
const initialState = {
    userSettingStep: {
        firstName: '',
        lastName: '',
        phone: '',
        jobPosition: '',
        location: '',
        linkedin: '',
        instagram: '',
        facebook: '',
        youtube: '',
        x: '',
        www: '',
        description: '',
        highlighted: false,
        hidden: false,
        skill: [],
        mentorCategory: [],
        services: [],
        mentorTopics:[]

    }
}

const userSettingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'YOUR_DATA_USER_SETTING':
            return {
                ...state,
                userSettingStep: {
                    id: action.payload.id,
                    profileImage: action.payload.profileImage,
                    hobby: action.payload.hobby,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    oldEmail: action.payload.oldEmail,
                    newEmail: action.payload.newEmail,
                    location: action.payload.location,
                    description: action.payload.description,
                    phone: action.payload.phone,
                    timeZone: action.payload.timeZone,
                    jobPosition: action.payload.jobPosition,
                    facebook: action.payload.facebook,
                    instagram: action.payload.instagram,
                    linkedin: action.payload.linkedin,
                    youtube: action.payload.youtube,
                    www: action.payload.www,
                    x: action.payload.x,

                },
            };
        case 'SPECIFICATION_USER_SETTING':
            return {
                ...state,
                userSettingStep: {
                    skill: action.payload.skill,
                    mentorCategory: action.payload.mentorCategory,
                    services: action.payload.services,
                    mentorTopics: action.payload.mentorTopics,
                }
            }
        default:
            return state;
    }
};


export default userSettingReducer;
