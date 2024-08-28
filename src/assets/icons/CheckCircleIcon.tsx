import React from "react";

type Props = {
  className?: string;
  size?: string;
  filled?: boolean;
  color?: string;
};

export function CheckCircleIcon({
  size = "1em",
  className,
  color = "currentColor",
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
      className={className}
    >
      <path
        fill={color}
        d="M8.577 12.256a.831.831 0 001.179 0l3.333-3.333a.832.832 0 10-1.178-1.179L9.167 10.49 8.089 9.41a.832.832 0 10-1.178 1.178l1.666 1.667z"
      ></path>
      <path
        fill={color}
        fillRule="evenodd"
        d="M.833 10c0 5.054 4.113 9.167 9.167 9.167 5.054 0 9.167-4.113 9.167-9.167 0-5.054-4.113-9.167-9.167-9.167C4.946.833.833 4.946.833 10zM2.5 10c0-4.135 3.365-7.5 7.5-7.5 4.136 0 7.5 3.365 7.5 7.5 0 4.136-3.364 7.5-7.5 7.5-4.135 0-7.5-3.364-7.5-7.5z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
