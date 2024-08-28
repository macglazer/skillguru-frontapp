import React from "react";
import { MentorshipPlan } from "src/components/_grouped/mentorship-plan";
import { useMentorOfferDetails } from "../context/MentorOfferDetailsContext";
import styles from "../MentorOfferDetails.module.scss";

export const PlanDetails = () => {
  const { plan } = useMentorOfferDetails();

  return plan ? (
    <div className={styles.choosenPlan}>
      <span>Wybrany Plan:</span>
      <MentorshipPlan
        id={plan.id}
        price={plan.price}
        responseTime={plan.responseTime}
        sessionDuration={plan.sessionDuration}
        sessionsPerMonth={plan.sessionsPerMonth}
        planIncludes={plan.planIncludes}
        subscriptionVariant={plan.subscriptionVariant}
        selected
      />
    </div>
  ) : null;
};
