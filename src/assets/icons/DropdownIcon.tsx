import React from "react";

type Props = {
  color?: string
  className?: string
}

const DropdownIcon = ({ className, color = "#637381" }: Props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10.0002 12.9179C9.80546 12.9183 9.61676 12.8505 9.46683 12.7262L4.46683 8.55956C4.11245 8.26501 4.06395 7.73894 4.3585 7.38456C4.65305 7.03018 5.17912 6.98167 5.5335 7.27623L10.0002 11.0096L14.4668 7.40956C14.639 7.26975 14.8598 7.20433 15.0803 7.2278C15.3009 7.25126 15.5029 7.36166 15.6418 7.53456C15.7961 7.70777 15.8712 7.93746 15.8491 8.16836C15.8269 8.39926 15.7096 8.61048 15.5252 8.75123L10.5252 12.7762C10.3709 12.8808 10.1861 12.9307 10.0002 12.9179Z"
        fill={color}
      />
    </svg>
  );
};

export default DropdownIcon;
