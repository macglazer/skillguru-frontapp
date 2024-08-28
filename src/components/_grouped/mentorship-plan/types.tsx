import { MentorhsipPlanType } from "@customTypes/order";

export type FieldName =
  | "description"
  | "price"
  | "sessionDuration"
  | "responseTime"
  | "sessionsPerMonth"
  | "planIncludes";

export type MentorshipPlanFormValues = Pick<
  MentorhsipPlanType,
  | "description"
  | "price"
  | "sessionDuration"
  | "responseTime"
  | "sessionsPerMonth"
  | "planIncludes"
>;

export type MentorshipPlanFormErrors = Omit<
  Record<keyof MentorshipPlanFormValues, string>,
  'planIncludes'
> & {
  planIncludes: Record<number, string>;
};

export type MentorshipPlanFormTouched = Omit<
  Record<keyof MentorshipPlanFormValues, boolean>,
  'planIncludes'
> & {
  planIncludes: Record<number, boolean>;
};

export type MentorshipPlanFormFieldName =
  | "description"
  | "price"
  | "sessionDuration"
  | "responseTime"
  | "sessionsPerMonth"
  | "planIncludes";

export type MentorshipPlanFormChangeProp =
  | { name: "description"; value: string }
  | { name: "price"; value: number }
  | { name: "sessionDuration"; value: number }
  | { name: "responseTime"; value: number }
  | { name: "sessionsPerMonth"; value: number }
  | { name: "planIncludes"; value?: string; i: number };
