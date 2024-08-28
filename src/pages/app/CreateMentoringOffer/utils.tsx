import { PlanInput } from "@customTypes/create-mentoring";
import { MentorshipPlanFormErrors } from "src/components/_grouped/mentorship-plan/types";
import { CreateOfferState } from "src/reducers/createOffer/types";

type Errors = MentorshipPlanFormErrors & {
  description: string
    price: string
    sessionDuration: string
    responseTime: string
    sessionsPerMonth: string
    planIncludes: string
    schedule: string
};

const defaultErrors : Errors = {
    description: "",
    price: "",
    sessionDuration: "",
    responseTime: "",
    sessionsPerMonth: "",
    planIncludes: "",
    schedule: "",
}

const validatePlan = (inp: PlanInput) => {
  const errors: Errors = {
    ...defaultErrors,
  } as Errors;
  if (!inp.schedule) {
    errors.schedule = "Wybierz harmonogram";
  }
  if (!inp.description) {
    errors.description = "Wprowadź opis";
  }
  if (!inp.price || isNaN(inp.price) || inp.price < 1) {
    errors.price = "Wprowadź cenę";
  }
  if (!inp.responseTime) {
    errors.responseTime = "Wprowadź maksymalny czas odpowiedzi";
  }
  const hasEmptyRows = inp.planIncludes.filter((r) => r === '' || typeof r !== 'string')
  if (hasEmptyRows.length) {
    errors.responseTime = "Nie zostawiaj pustego opisu";
  }
  if (!inp.sessionsPerMonth) {
    errors.sessionsPerMonth = "Wprowadź ilość sesji w miesiącu";
  }
  return errors;
};

const getPlanErrorMessage = (errors: Errors) => {
  const joined = Object.values(errors).filter((e) => !!e);
  return joined.filter(x => typeof x === 'string').join(', ')
}

export const getStateErrorMessage = (valid: ValidateStateOutput) => {
  if(valid.isValid === false){
    const invalidPlans = {
      basic: !!getPlanErrorMessage(valid.errors.basic),
      advanced: !!getPlanErrorMessage(valid.errors.advanced),
      pro: !!getPlanErrorMessage(valid.errors.pro),
    }
    const invalidNames = Object.entries(invalidPlans).filter(([plan, err]) => {
      if(err){
        return true
      }
      return false
    }).map(([plan, err]) => {
      switch(plan){
        case 'basic':
          return 'Podstawowy';
        case 'advanced':
          return 'Zaawansowany';
        case 'pro':
          return 'Pro';
      }
    }).join(', ')
    return `Popraw błędy w planach: ${invalidNames}`
  }
}

type ValidateStateOutput = {
  isValid: boolean,
    errors: {
        basic: Errors,
        advanced: Errors,
        pro: Errors,
    }
}

export const validateState = (state: CreateOfferState) : ValidateStateOutput => {
  try {
    const basicErrors = validatePlan(state.basic);
    const avancedErrors =
      state.numberOfPlans > 2 ? validatePlan(state.advanced) : {...defaultErrors};
    const proErrors = state.numberOfPlans > 1 ? validatePlan(state.pro) : {...defaultErrors};
    const joined = [
      ...Object.values(basicErrors),
      ...Object.values(avancedErrors),
      ...Object.values(proErrors),
    ].filter((e) => !!e);
    return {
      isValid: joined.length === 0,
      errors: {
        basic: basicErrors,
        advanced: avancedErrors,
        pro: proErrors,
      },
    };
  } catch (e) {
    return {
      isValid: false,
      errors: {
        basic: {...defaultErrors},
        advanced: {...defaultErrors},
        pro: {...defaultErrors},
      },
    };
  }
};
