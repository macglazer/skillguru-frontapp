import React from "react";
import clx from "classnames";
import styles from "./PlanName.module.scss";
import { SubscriptionPlan } from "@customTypes/order";
import { CrownIcon } from "@icons/CrownIcon";
import { displayPlanName } from "src/utils/plan";

interface Props {
  className?: string;
  plan: SubscriptionPlan;
  planName?: string;
  iconSize?: 24 | 20;
  fontVariant?: "buttonMd" | "subtitle-1";
  iconPosition?: 'leading'|'trailing'
  pillBg?: boolean;
  noPadding?: boolean;
}

export const PlanName = ({
  className,
  plan,
  planName,
  iconSize = 24,
  fontVariant = "buttonMd",
  pillBg,
  iconPosition = 'leading',
  noPadding,
}: Props) => {
  return (
    <div
      className={clx(
        styles.card,
        {
          [styles.pillBg]: !!pillBg,
          [styles.noPadding]: !!noPadding,
        },
        className
      )}
    >
      {plan === "pro" ? <CrownIcon size={`${iconSize}px`} /> : null}
      <span
        className={clx(styles.text, {
          [styles.textButtonMd]: fontVariant === "buttonMd",
          [styles.textSubtitle1]: fontVariant === "subtitle-1",
          [styles[iconPosition]]: iconPosition,
        })}
      >
        {planName ?? displayPlanName(plan)}
      </span>
    </div>
  );
};
