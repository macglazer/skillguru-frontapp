import { MentAppState } from "./types";

export const mentAppInitialState: MentAppState = {
  step: 'plan',
  mentor: null,
  selectedPlan: null,
  availableGoals: [],
  selectedGoals: [],
  availableTimezones: [],
  timezone: '', 
  location: '', 
  description: '', 
  questions: '', 
  pending: false,
  success: false,
  errorMessage: '',
};
