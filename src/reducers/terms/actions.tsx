import { Terms } from "@customTypes/mentor";
import { UPDATE_TERMS } from "./constants";

export const updateTerms = (terms: Terms) => ({
  type: UPDATE_TERMS,
  payload: terms,
});
