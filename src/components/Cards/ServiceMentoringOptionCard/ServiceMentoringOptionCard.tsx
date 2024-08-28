import React from "react";
import {MentorshipPlan, ServiceMentoring} from "@customTypes/order";
import styles from "./ServiceMentoringOptionCard.module.scss";
import clx from "classnames";
import { RadioInputIcon } from "@icons/RadioInput";
import { CrownIcon } from "@icons/CrownIcon";
import { CheckCircleSolidIcon } from "@icons/CheckCircleSolidIcon";

type Props = MentorshipPlan & {
  name?: string;
  value?: string;
  selected?: boolean;
  displayRadioInput?: boolean;
  handleSelect?: React.MouseEventHandler<HTMLButtonElement>;
};

export const ServiceMentoringOptionCard = ({
  name,
  value,
  title,
  price,
  id,
  subtitle,
  variant,
  descriptionRows,
  selected,
  displayRadioInput,
  handleSelect,
}: Props) => {
  return (
    <button
      className={clx(styles.card, {
        [styles.selected]: selected,
      })}
      onClick={handleSelect}
      name={name}
      value={value}
    >
      <div className={styles.rowTitle}>
        {handleSelect && displayRadioInput ? <RadioInputIcon filled={selected} /> : null}
        <h5 className={styles.title}>{title}</h5> 
        {variant === "pro" ? <CrownIcon className={styles.crown} /> : null}
      </div>
      {subtitle ? <p className={styles.subtitle}> {subtitle}</p> : null}

      <div className={styles.priceRow}>
        <strong>{Math.ceil(price)} zł</strong>
        <span>miesięcznie</span>
      </div>

      {descriptionRows && descriptionRows.length > 0 ? (
        <div className={styles.listRow}>
          <h6>Plan obejmuje</h6>
          <ul>
            {descriptionRows.map((r,ind) => (
              <li key={ind}>
                <CheckCircleSolidIcon />
                <span>{r.description}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </button>
  );
};
