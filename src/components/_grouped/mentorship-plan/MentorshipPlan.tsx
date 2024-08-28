import React, { ReactNode } from "react";
import styles from "./MentorshipPlan.module.scss";
import clx from "classnames";
import { MentorhsipPlanType, SubscriptionPlan } from "@customTypes/order";
import { PlanName } from "src/components/_base/PlanName";
import { CheckCircleSolidIcon } from "@icons/CheckCircleSolidIcon";
import { replaceSpacesWithNonBreaking } from "src/utils/text";

type Props = Pick<
  MentorhsipPlanType,
  | "id"
  | "description"
  | "price"
  | "sessionDuration"
  | "responseTime"
  | "sessionsPerMonth"
  | "planIncludes"
> & {
  subscriptionVariant: SubscriptionPlan;
  userIdentity?: ReactNode;
  selected?: boolean;
  selectable?: boolean;
  onClick?: () => void;
};

const checkIcon = <CheckCircleSolidIcon className={styles.checkIcon} />;

export const MentorshipPlan = ({
  id,
  subscriptionVariant,
  description,
  price,
  sessionDuration,
  sessionsPerMonth,
  responseTime,
  planIncludes,
  userIdentity,
  selected,
  selectable,
  onClick,
}: Props) => {
  return (
    <div
      className={clx(styles.wrapper, {
        [styles.selected]: selected,
      })}
    >
      {userIdentity}
      <div className={styles.rows}>
        <PlanName
          className={styles.planName}
          plan={subscriptionVariant}
          fontVariant="subtitle-1"
          iconSize={20}
          noPadding
          iconPosition="trailing"
        />
        <div className={clx(styles.row, styles.priceRow)}>
          <span className={styles.textCurrency}>{price} zł</span>
          <span>miesięcznie</span>
        </div>
        {description ? (
          <div className={clx(styles.row, styles.description)}>
            <span>{description}</span>
          </div>
        ) : null}

        <h6 className={styles.subtitle}>Plan obejmuje</h6>
        {typeof sessionsPerMonth !== "undefined" ? (
          <div className={clx(styles.row)}>
            {checkIcon}
            <div className={styles.text}>
              <span>
                {replaceSpacesWithNonBreaking(
                  `${sessionsPerMonth} sesje mentoringowe na miesiąc ${
                    typeof sessionDuration !== "undefined"
                      ? `(${sessionDuration} minut każda)`
                      : null
                  }`
                )}{" "}
              </span>
            </div>
          </div>
        ) : null}
        {typeof responseTime !== "undefined" ? (
          <div className={clx(styles.row)}>
            {checkIcon}
            <div className={styles.text}>
              <span>
                {replaceSpacesWithNonBreaking(
                  `Odpowiedzi na Twoje pytania w ciągu ${responseTime}h `
                )}
              </span>
            </div>
          </div>
        ) : null}
        {planIncludes.map((r, i) => (
          <div className={clx(styles.row)} key={r + "_" + i}>
            {checkIcon}
            <div className={styles.text}>
              <span>{replaceSpacesWithNonBreaking(r)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
