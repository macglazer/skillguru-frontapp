import { mentAppInitialState } from "./constants";
import { type MentAppAction, type MentAppState } from "./types";

export const mentAppReducer = (
  state = mentAppInitialState,
  action: MentAppAction
): MentAppState => {
  switch (action.type) {
    case "MENTAPP_SET_STEP":
      return {
        ...state,
        step: action.payload.step,
      };
    case "MENTAPP_UPDATE_DATA":
      return {
        ...state,
        mentor: ('mentor' in action.payload ? action.payload.mentor : state.mentor) || null,
        selectedPlan: ('selectedPlan' in action.payload ? action.payload.selectedPlan : state.selectedPlan) || null,
        availableGoals: ('availableGoals' in action.payload ? action.payload.availableGoals : state.availableGoals) || [],
        availableTimezones: ('availableTimezones' in action.payload ? action.payload.availableTimezones : state.availableTimezones) || [],
      };
    case "MENTAPP_UPDATE_GOALS":
      return {
        ...state,
        selectedGoals: action.payload.selectedGoals,
      };
    case "MENTAPP_UPDATE_DETAILS":
      return {
        ...state,
        timezone: String('timezone' in action.payload ? action.payload.timezone : state.timezone),
        location: String('location' in action.payload ? action.payload.location : state.location),
        description: String('description' in action.payload ? action.payload.description : state.description),
        questions: String('questions' in action.payload ? action.payload.questions : state.questions),
      };
    case "MENTAPP_UPDATE_STATE":
      return {
        ...state,
        pending: 'pending' in action.payload ? action.payload.pending : state.pending,
        success: 'success' in action.payload ? action.payload.success : state.success,
        errorMessage: 'errorMessage' in action.payload ? action.payload.errorMessage : state.errorMessage,
      };
    case "MENTAPP_RESET":
      return {
        ...mentAppInitialState,
      };
    default:
      return state;
  }
};
