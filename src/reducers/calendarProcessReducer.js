const initialState = {
    sessionState: 0,};

const sessionIDReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_SESSION_ID':
            return {
                ...state,
                sessionState: action.payload.sessionID,
            };

        default:
            return state;
    }
};

export default sessionIDReducer; 