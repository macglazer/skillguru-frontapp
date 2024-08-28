import { createOfferInitialState } from "./constants";
import {
  type CreateOfferAction,
  type CreateOfferState,
  type CreateOfferStepType,
} from "./types";

const getPrevStep = (current: CreateOfferStepType): CreateOfferStepType => {
  switch (current) {
    case "build":
      return "determine";
    case "summary":
    case "determine":
    case "initial":
    default:
      return "initial";
  }
};

export const createOfferReducer = (
  state = createOfferInitialState,
  action: CreateOfferAction
): CreateOfferState => {
  switch (action.type) {
    case "PREV_STEP":
      return {
        ...state,
        step: getPrevStep(state.step),
      };
    case "SUBMIT_INITIAL":
      return {
        ...state,
        step: "determine",
      };
    case "SUBMIT_DETERMINE":
      return {
        ...state,
        step: action.payload.nextStep ? "build" : "determine",
        numberOfPlans: action.payload.numberOfPlans,
      };
    case "LOAD_SCHEDULES":
      return {
        ...state,
        availableSchedules: action.payload.availableSchedules,
        fetchedInitial: true,
      };
    case "SUBMIT_BUILD":
      return {
        ...state,
        step: action.payload.nextStep ? "summary" : "build",
        providesMaterials: action.payload.providesMaterials,
        basic: action.payload.basic,
        advanced: action.payload.advanced || createOfferInitialState.advanced,
        pro: action.payload.pro || createOfferInitialState.pro,
      };
    case "UPDATE_PENDING":
      return {
        ...state,
        pending: action.payload.pending,
      };
    case "UPDATE_STATUS":
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
        success: action.payload.success,
      };
    case "LOAD_OFFERS":
      return {
        ...state,
        numberOfPlans: action.payload.numberOfPlans,
        providesMaterials: action.payload.providesMaterials,
        basic: action.payload.basic,
        advanced: action.payload.advanced || createOfferInitialState.advanced,
        pro: action.payload.pro || createOfferInitialState.pro,
        saved: action.payload.saved,
      };      
    case "LOGOUT":
    case "LOGIN": 
    case "RESET":
      return {
        ...createOfferInitialState,
      };

    default:
      return state;
  }
};
