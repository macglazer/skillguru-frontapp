// Libraries
import React, { useState } from "react";
// Icons
import NotificationsSvg from "src/assets/icons/NotificationsSvg";
// Styles
import styles from "./Notifications.module.scss";
import clx from 'classnames'

type Props = {
	className?: string
}

const Notifications = ({ className } : Props) => {
  const [nots, setNots] = useState<any[]>([
    { id: "d01", text: "Otrzymałeś wiadomość" },
  ]);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={clx(styles.wrapper, className)}>
      <button
        className={styles.button}
        onClick={() => setIsVisible(!isVisible)}
      >
        <NotificationsSvg />
        {nots.length > 0 && <span className={styles.counter}></span>}
      </button>
      {nots.length > 0 && (
        <div className={styles.notifications} data-is-visible={isVisible}>
          <button className={styles.close} onClick={() => setIsVisible(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="13"
              viewBox="0 0 15 13"
              fill="none"
            >
              <path
                d="M13.5652 1L1 11.9736"
                stroke="#252B42"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.5652 11.9736L7.86615 6.99644L1 1"
                stroke="#252B42"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {nots.map((item) => (
            <div className={styles.notificationsItem} key={item.id}>
              {item.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
