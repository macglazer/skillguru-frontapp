import { CreateOfferState } from "./types";

export const createOfferInitialState: CreateOfferState = {
  fetchedInitial: false,
  step: "initial",
  availableSchedules: [],
  numberOfPlans: 1,
  providesMaterials: true,
  pending: false,
  errorMessage: "",
  success: false,
  basic: {
    schedule: "",
    price: 159,
    description: "",
    sessionsPerMonth: 3,
    sessionDuration: 45,
    responseTime: 48,
    planIncludes: ["Nieograniczony dostęp do pytań i odpowiedzi"],
  },
  advanced: {
    schedule: "",
    price: 189,
    description: "",
    sessionsPerMonth: 3,
    sessionDuration: 60,
    responseTime: 48,
    planIncludes: ["Nieograniczony dostęp do pytań i odpowiedzi"],
  },
  pro: {
    schedule: "",
    price: 300,
    description: "",
    sessionsPerMonth: 4,
    sessionDuration: 60,
    responseTime: 24,
    planIncludes: ["Nieograniczony dostęp do pytań i odpowiedzi"],
  },
};
