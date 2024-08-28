import React, { useRef } from "react";
import { ServiceSession } from "@customTypes/order";
import Camera from "@icons/Camera";
import People from "@icons/People";
import styles from "./ServiceSessionOptionCard.module.scss";
import clx from "classnames";
import { RadioInputIcon } from "@icons/RadioInput";
import { ClockSolidCircleIcon } from "@icons/ClockSolidCircleIcon";
import { DollarCircleIcon } from "@icons/DollarCircleIcon";

type Props = ServiceSession & {
  name?: string;
  value?: string;
  selected?: boolean;
  displayRadioInput?: boolean;
  handleSelect?: React.MouseEventHandler<HTMLButtonElement>;
  handleDetails?: React.MouseEventHandler<HTMLDivElement>;
};

export const ServiceSessionOptionCard = ({
  name,
  value,
  selected,
  handleDetails,
  handleSelect,
  meetTime,
  scheduleName,
  sessionName,
  sessionPrice,
  sessionType,
  description,
  displayRadioInput,
}: Props) => {
  const detailsRef = useRef<HTMLInputElement>(null);
  const _handleSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLElement;
    if (detailsRef.current && target === detailsRef.current) {
      return;
    }
    handleSelect && handleSelect(e);
  };

  return (
    <button
      className={clx(styles.card, {
        [styles.selected]: selected,
        [styles.selectable]: !!handleSelect,
      })}
      onClick={_handleSelect}
      name={name}
      value={value}
    >
      <div className={styles.rowTitle}>
        {handleSelect && displayRadioInput ? (
          <RadioInputIcon filled={selected} />
        ) : null}
        <h5 className={styles.title}>{sessionType}</h5>
      </div>
      <div className={styles.rowInfo}>
        {sessionPrice ? (
          <div className={styles.infoCell}>
            <DollarCircleIcon />
            {Math.ceil(sessionPrice)} zł/h
          </div>
        ) : null}
        {meetTime ? (
          <div className={styles.infoCell}>
            <ClockSolidCircleIcon />
            {meetTime} min
          </div>
        ) : null}
      </div>
      {handleDetails ? (
        <div
          className={styles.rowActions}
          role="button"
          ref={detailsRef}
          onClick={handleDetails}
        >
          Więcej informacji
        </div>
      ) : null}
    </button>
  );
};
