import { PER_PAGE, subscriptionsInitialState } from "./constants";
import { type SubscriptionsAction, type SubscriptionsState } from "./types";

const parsePage = (newPage: number, max: number): number => {
  return Math.max(0, Math.min(newPage, max));
};

export const subscriptionsReducer = (
  state = subscriptionsInitialState,
  action: SubscriptionsAction
): SubscriptionsState => {
  switch (action.type) {
    case "SUBSCRIPTIONS_UPDATE_PAGE":
      return {
        ...state,
        page: parsePage(action.payload.page, PER_PAGE),
      };
    case "SUBSCRIPTIONS_UPDATE_RECORDS":
      return action.payload.role === "M"
        ? {
            ...state,
            role: "M",
            total: action.payload.total,
            records: action.payload.records,
          }
        : {
            ...state,
            role: "S",
            total: action.payload.total,
            records: action.payload.records,
          };
    case "SUBSCRIPTIONS_UPDATE_PENDING":
      return {
        ...state,
        pending: action.payload.pending,
      };
    case "SUBSCRIPTIONS_UPDATE_STATUS":
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      };
    case "SUBSCRIPTIONS_UPDATE_TAB":
      return {
        ...state,
        tab: action.payload.tab,
      };
    case "SUBSCRIPTIONS_RESET":
      return {
        ...subscriptionsInitialState,
      };
    default:
      return state;
  }
};
