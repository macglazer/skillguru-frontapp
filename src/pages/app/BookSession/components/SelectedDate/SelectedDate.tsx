import React from "react";
import styles from "./SelectedDate.module.scss";
import clx from "classnames";

type Props = {
  className?: string;
  selectedDate: string;
  selectedTime: string;
};

export const SelectedDate = ({
  className,
  selectedDate,
  selectedTime,
}: Props) => {
  return selectedTime || selectedDate ? (
    <div className={clx(styles.box, className)}>
      <h3>Wybrany termin</h3>
      <ul>
        {selectedDate ? <li>{selectedDate}</li> : null}
        {selectedTime ? <li>{selectedTime}</li> : null}
      </ul>
    </div>
  ) : null;
};
