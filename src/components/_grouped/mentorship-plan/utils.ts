import { SubscriptionPlan } from "@customTypes/order";
import { ChangeEvent } from "react";
import { MentorshipPlanFormFieldName } from "./types";
import {
  MentorshipPlanFormValues,
  MentorshipPlanFormErrors,
  MentorshipPlanFormTouched,
} from "./types";

export const initialErrors: MentorshipPlanFormErrors = {
  description: "",
  price: "",
  sessionDuration: "",
  sessionsPerMonth: "",
  responseTime: "",
  planIncludes: {} as Record<number, string>,
};

export const initialTouched: MentorshipPlanFormTouched = {
  description: false,
  price: false, 
  sessionDuration: false,
  sessionsPerMonth: false,
  responseTime: false,
  planIncludes: {},
};

export const defaultPlanValues: MentorshipPlanFormValues = {
  description: "",
  price: 159,
  sessionDuration: 45,
  responseTime: 48,
  sessionsPerMonth: 3,
  planIncludes: [
    "Bezpośrednie wsparcie praktyczne w realizacji Twoich projektów",
    "Nieograniczony dostęp do pytań i odpowiedzi",
  ],
};

export const getDefaultPlanValues = (plan?: SubscriptionPlan) => {
  const defaultValues = {
    ...defaultPlanValues,
  };
  if (plan === "advanced") {
    defaultValues.price = 189;
    defaultValues.responseTime = 48;
    defaultValues.sessionDuration = 60;
    defaultValues.sessionsPerMonth = 3;
  }
  if (plan === "pro") {
    defaultValues.price = 300;
    defaultValues.responseTime = 24;
    defaultValues.sessionDuration = 60;
    defaultValues.sessionsPerMonth = 4;
  }
  return { ...defaultValues };
};

const regex = /^(\w+)\[(\d+)\]$/; ///planIncludes\[(\d+)\]/;

export const parseNameAndIndex = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
): { fullName: string; name: MentorshipPlanFormFieldName; i?: number } => {
  const inp = e.currentTarget as HTMLInputElement | HTMLTextAreaElement;
  const _name = inp.name as MentorshipPlanFormFieldName;
  try {
    const match = _name.match(regex);
    if (match && match.length >= 3 && match[1] && match[2]) {
      const name = match[1] as MentorshipPlanFormFieldName;
      const i = Number(match[2]);
      if (isNaN(i)) {
        throw new Error("Wrong or missing index");
      }
      return {
        fullName: name,
        name,
        i,
      };
    }
  } catch (e) {}

  return { fullName: _name, name: _name };
};
