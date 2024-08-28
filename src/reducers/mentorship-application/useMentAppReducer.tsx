import { mentAppInitialState } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import {
  MentAppState,
  MentorDetails,
  PlanDetails,
} from "./types";
import { useCallback } from "react";

type Details = {
  timezone: string;
  location: string;
  description: string;
  questions: string;
};

type Status = {
  pending?: boolean 
  success?: boolean
  errorMessage?: string
}

type AvailableGoalsDTO = {
  value: string,
  label: string;
}

type Output = {
  state: MentAppState;
  submitPlan: () => void;
  submitGoals: (goals: string[], isValid: boolean) => void;
  submitDetails: (details: Details, isValid: boolean) => void;
  updateMentor: (mentor: MentorDetails) => void;
  updatePlan: (plan: PlanDetails) => void;
  updateAvailableGoals: (goals: AvailableGoalsDTO[]) => void;
  updateAvailableTimezones: (zones: string[]) => void;
  setStatus: (status: Status) => void;
  reset: () => void;
};

export const useMentAppReducer = (): Output => {
  const state: MentAppState = useSelector((state) => {
    if (state && typeof state === "object" && "mentApp" in state) {
      return state?.mentApp as MentAppState;
    }
    return mentAppInitialState;
  });

  const dispatch = useDispatch();

  const submitPlan = useCallback(
    () =>
      dispatch({
        type: "MENTAPP_SET_STEP",
        payload: {
          step: 'goals',
        },
      }),
    [dispatch]
  );

  const submitGoals = useCallback(
    (goals: string[], isValid: boolean) => {
      dispatch({
        type: "MENTAPP_UPDATE_GOALS",
        payload: {
          selectedGoals: goals,
        },
      })
      if(isValid){
        dispatch({
          type: "MENTAPP_SET_STEP",
          payload: {
            step: 'details',
          },
        })
      }
    },
    [dispatch]
  );
  
  const submitDetails = useCallback(
    (details: Details, isValid: boolean) => {
      dispatch({
        type: "MENTAPP_UPDATE_DETAILS",
        payload: {
          timezone: details.timezone,
          location: details.location,
          description: details.description,
          questions: details.questions,
        },
      })
      if(isValid){
        dispatch({
          type: "MENTAPP_SET_STEP",
          payload: {
            step: 'summary',
          },
        })
      }
    },
    [dispatch]
  );
  
  const updateMentor = useCallback(
    (mentor: MentorDetails) => {
      dispatch({
        type: "MENTAPP_UPDATE_DATA",
        payload: {
          mentor,
        },
      })
    },
    [dispatch]
  );

  const updatePlan = useCallback(
    (plan: PlanDetails) => {
      dispatch({
        type: "MENTAPP_UPDATE_DATA",
        payload: {
          selectedPlan: plan,
        },
      })
    },
    [dispatch]
  );
  
  const updateAvailableGoals = useCallback(
    (availableGoals: AvailableGoalsDTO[]) => {
      dispatch({
        type: "MENTAPP_UPDATE_DATA",
        payload: {
          availableGoals,
        },
      })
    },
    [dispatch]
  );
  
  const updateAvailableTimezones = useCallback(
    (availableTimezones: string[]) => {
      dispatch({
        type: "MENTAPP_UPDATE_DATA",
        payload: {
          availableTimezones,
        },
      })
    },
    [dispatch]
  );
  
  const setStatus = useCallback(
    (status: Status) => {
      dispatch({
        type: "MENTAPP_UPDATE_STATE",
        payload: status as Status,
      })
    },
    [dispatch]
  );
  
  const reset = useCallback(
    () =>
      dispatch({
        type: "MENTAPP_RESET",
      }),
    [dispatch]
  );

  return {
    state,
    submitPlan,
    submitGoals,
    submitDetails,
    updateMentor,
    updatePlan,
    updateAvailableGoals,
    updateAvailableTimezones,
    setStatus,
    reset,
  };
};
