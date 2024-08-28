import React from "react";

type Props = {
  className?: string;
  size?: string;
  filled?: boolean;
  color?: string;
};

export const ClockSolidCircleIcon = ({
  size = "1em",
  className,
  color = "currentColor",
}: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 14 14"
      className={className}
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M7 13.66A6.667 6.667 0 107 .327 6.667 6.667 0 007 13.66zm.5-9.333a.5.5 0 10-1 0v2.666c0 .133.053.26.147.354l1.666 1.666a.5.5 0 10.707-.706L7.5 6.787v-2.46z"
        clipRule="evenodd"
      />
    </svg>
  );
};
