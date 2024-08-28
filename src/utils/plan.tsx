import { SubscriptionPlan } from "@customTypes/order";

export const displayPlanName = (plan: SubscriptionPlan) => {
  switch (plan) {
    case "basic":
      return "Plan podstawowy";
    case "advanced":
      return "Plan zaawansowany";
    case "pro":
      return "Plan pro";
    default:
      return "";
  }
};
