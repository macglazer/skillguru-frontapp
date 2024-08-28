import { subscriptionsInitialState } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { SubscribedMentor, Subscriber, SubscriptionsState } from "./types";
import { useCallback } from "react";
import { SubscriptionStatus } from "@customTypes/subscriptions";

type MentorRecordsInput = {
  role: 'M',
  records: Subscriber[]
  total: number
}

type StudentRecordsInput = {
  role: 'S',
  records: SubscribedMentor[]
  total: number
}

type Output = {
  subscriptionsState: SubscriptionsState;
  updatePage: (page: number) => void;
  updateRecords: (props: MentorRecordsInput|StudentRecordsInput) => void;
  updateStatus: (errorMessage: string) => void;
  setPending: (pending: boolean) => void;
  setTab: (tab: SubscriptionStatus) => void
  reset: () => void;
};

export const useSubscriptionsReducer = (): Output => {
  const subscriptionsState: SubscriptionsState = useSelector((state) => {
    if (state && typeof state === "object" && "subscriptions" in state) {
      return state?.subscriptions as SubscriptionsState;
    }
    return subscriptionsInitialState;
  });
  
  const dispatch = useDispatch();

  const updatePage = useCallback(
    (page: number) =>
      dispatch({
        type: "SUBSCRIPTIONS_UPDATE_PAGE",
        payload: {
          page,
        },
      }),
    [dispatch]
  );

  const updateRecords = useCallback(
    (props: MentorRecordsInput|StudentRecordsInput) =>
      dispatch({
        type: "SUBSCRIPTIONS_UPDATE_RECORDS",
        payload: props,
      }),
    [dispatch]
  );

  const setPending = useCallback(
    (pending: boolean) =>
      dispatch({
        type: "SUBSCRIPTIONS_UPDATE_PENDING",
        payload: {
          pending,
        },
      }),
    [dispatch]
  );

  const updateStatus = useCallback(
    (errorMessage: string) =>
      dispatch({
        type: "SUBSCRIPTIONS_UPDATE_STATUS",
        payload: {
          errorMessage: errorMessage || undefined,
        },
      }),
    [dispatch]
  );

  const setTab = useCallback(
    (tab: SubscriptionStatus) => dispatch({
      type: "SUBSCRIPTIONS_UPDATE_TAB",
      payload: {
        tab
      }
    }),
    [dispatch]
  )

  const reset = useCallback(
    () =>
      dispatch({
        type: "SUBSCRIPTIONS_RESET",
      }),
    [dispatch]
  );

  return {
    subscriptionsState,
    updatePage,
    updateRecords,
    setPending,
    setTab,
    updateStatus,
    reset,
  };
};
