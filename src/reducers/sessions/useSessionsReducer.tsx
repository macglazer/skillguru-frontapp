import { sessionsInitialState } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { SessionRowType, SessionsState } from "./types";
import { useCallback } from "react";

type Output = {
  sessionsState: SessionsState;
  updatePage: (page: number) => void;
  updateRecords: (records: SessionRowType[], total: number) => void;
  updateStatus: (errorMessage: string) => void;
  setPending: (pending: boolean) => void;
  reset: () => void;
};

export const useSessionsReducer = (): Output => {
  const sessionsState: SessionsState = useSelector((state) => {
    if (state && typeof state === "object" && "sessions" in state) {
      return state?.sessions as SessionsState;
    }
    return sessionsInitialState;
  });
  
  const dispatch = useDispatch();

  const updatePage = useCallback(
    (page: number) =>
      dispatch({
        type: "SESSIONS_UPDATE_PAGE",
        payload: {
          page,
        },
      }),
    [dispatch]
  );

  const updateRecords = useCallback(
    (sessions: SessionRowType[], totalRecords: number) =>
      dispatch({
        type: "SESSIONS_UPDATE_RECORDS",
        payload: {
          totalRecords,
          sessions,
        },
      }),
    [dispatch]
  );

  const setPending = useCallback(
    (pending: boolean) =>
      dispatch({
        type: "SESSIONS_UPDATE_PENDING",
        payload: {
          pending,
        },
      }),
    [dispatch]
  );

  const updateStatus = useCallback(
    (errorMessage: string) =>
      dispatch({
        type: "SESSIONS_UPDATE_STATUS",
        payload: {
          errorMessage: errorMessage || undefined,
        },
      }),
    [dispatch]
  );

  const reset = useCallback(
    () =>
      dispatch({
        type: "SESSIONS_RESET",
      }),
    [dispatch]
  );

  return {
    sessionsState,
    updatePage,
    updateRecords,
    setPending,
    updateStatus,
    reset,
  };
};
