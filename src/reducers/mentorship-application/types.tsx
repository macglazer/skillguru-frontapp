import { SubscriptionPlan } from "@customTypes/order";

export type MentAppStep = "plan" | "goals" | "details" | "summary";

export type MentorDetails = {
  id: number;
  fullName: string;
  avatarUrl: string;
  profession: string;
  company: string;
  rate: number;
};

export type PlanDetails = {
  id: number;
  plan: SubscriptionPlan;
  monthlyPrice: number;
  included: string[];
};

type AvailableGoalsDTO = {
  value: string,
  label: string;
}

export type MentAppState = {
  step: MentAppStep;
  mentor: MentorDetails | null;
  selectedPlan: PlanDetails | null;
  availableGoals: AvailableGoalsDTO[];
  availableTimezones: string[];
  selectedGoals: string[];
  timezone: string;
  location: string;
  description: string;
  questions: string;
  pending: boolean;
  success: boolean;
  errorMessage: string;
};

export type MentAppActionType =
  | "MENTAPP_SET_STEP"
  | "MENTAPP_UPDATE_DATA"
  | "MENTAPP_UPDATE_GOALS"
  | "MENTAPP_UPDATE_DETAILS"
  | "MENTAPP_UPDATE_STATE"
  | "MENTAPP_RESET";

export type MentAppAction =
  | {
      type: "MENTAPP_SET_STEP";
      payload: {
        step: MentAppStep;
      };
    }
  | {
      type: "MENTAPP_UPDATE_DATA";
      payload: {
        mentor?: MentorDetails | null;
        selectedPlan?: PlanDetails | null;
        availableGoals?: AvailableGoalsDTO[];
        availableTimezones?: string[];
      };
    }
  | {
      type: "MENTAPP_UPDATE_GOALS";
      payload: { selectedGoals: string[] };
    }
  | {
      type: "MENTAPP_UPDATE_DETAILS";
      payload: {
        timezone?: string;
        location?: string;
        description?: string;
        questions?: string;
      };
    }
  | {
      type: "MENTAPP_UPDATE_STATE";
      payload: {
        pending: boolean;
        success: boolean;
        errorMessage: string;
      };
    }
  | {
      type: "MENTAPP_RESET";
    };
