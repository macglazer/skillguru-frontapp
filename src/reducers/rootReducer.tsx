// rootReducer.js
import {combineReducers} from 'redux';
import connectionProcessReducer from "./connectionProcessReducer";
import userSettingReducer from "./userSettingReducer";
import bookSessionReducer from "./bookSessionProcessReducer";
import sessionIDReducer from "./calendarProcessReducer";
import { termsReducer } from './terms';
import { mentorsReducer } from './mentors';
import { bookingReducer } from './booking';
import { chatReducer } from './chat';
import {authReducer} from "./auth/authReducer";
import { createOfferReducer } from './createOffer';
import { sessionsReducer } from './sessions'
import { subscriptionsReducer } from './subscriptions';
import { mentAppReducer } from './mentorship-application';
import { layoutReducer } from './layout';

const rootReducer = combineReducers({
    auth: authReducer,
    connectionProcess: connectionProcessReducer,
    userSetting: userSettingReducer,
    book: bookSessionReducer,
    sessionIDStep: sessionIDReducer,
    terms: termsReducer,
    mentors: mentorsReducer,
    booking: bookingReducer,
    chat: chatReducer,
    createOffer: createOfferReducer,
    sessions: sessionsReducer,
    subscriptions: subscriptionsReducer,
    mentApp: mentAppReducer,
    layout: layoutReducer,
    // Add other reducers if you have them
});

export default rootReducer;
