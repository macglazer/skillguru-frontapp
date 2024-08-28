import { Terms } from "@customTypes/mentor";
import { termsInitialState } from "./constants";
import { type TermsAction, type TermsState } from "./types";

export const termsReducer = (
  state = termsInitialState,
  action: TermsAction
): TermsState => {
  switch (action.type) {
    case "UPDATE_TERMS":
      return {
        ...state,
        ...action.payload as Terms,
      };

    default:
      return state;
  }
};
