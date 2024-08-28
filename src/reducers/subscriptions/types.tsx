import { SubscriptionStatus } from "@customTypes/subscriptions";

export type SubscribedMentor = {
  id: number;
  nickname: string;
  avatarUrl: string;
  fullName: string;
  date: string;
  status: SubscriptionStatus;
  serviceType: "session" | "mentoring";
  serviceName: string;
  isPro: boolean
  planName: string
};

export type Subscriber = {
  id: number;
  nickname: string;
  avatarUrl: string;
  fullName: string;
  date: string;
  status: SubscriptionStatus;
  serviceType: "session" | "mentoring";
  serviceName: string;
  isPro: boolean
  planName: string
};

type State = {
  pending: boolean;
  errorMessage: string;
  page: number;
  total: number;
  tab: SubscriptionStatus;
};

type MentorState = State & {
  role: "M";
  records: Subscriber[];
};

type StudentState = State & {
  role: "S";
  records: SubscribedMentor[];
};

export type SubscriptionsState = StudentState | MentorState;

export type SubscriptionsActionType =
  | "SUBSCRIPTIONS_UPDATE_PENDING"
  | "SUBSCRIPTIONS_UPDATE_STATUS"
  | "SUBSCRIPTIONS_UPDATE_PAGE"
  | "SUBSCRIPTIONS_UPDATE_RECORDS"
  | "SUBSCRIPTIONS_UPDATE_TAB"
  | "SUBSCRIPTIONS_RESET";

export type SubscriptionsAction =
  | {
      type: "SUBSCRIPTIONS_UPDATE_PAGE";
      payload: {
        page: number;
      };
    }
  | {
      type: "SUBSCRIPTIONS_UPDATE_RECORDS";
      payload:
        | {
            role: "M";
            total: number;
            records: Subscriber[];
          }
        | {
            role: "S";
            total: number;
            records: SubscribedMentor[];
          };
    }
  | {
      type: "SUBSCRIPTIONS_UPDATE_PENDING";
      payload: { pending: boolean };
    }
  | {
      type: "SUBSCRIPTIONS_UPDATE_STATUS";
      payload: { errorMessage: string };
    }
  | {
      type: "SUBSCRIPTIONS_UPDATE_TAB";
      payload: { tab: SubscriptionStatus };
    }
  | {
      type: "SUBSCRIPTIONS_RESET";
    };
