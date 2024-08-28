import React from "react";

type Props = {
  className?: string;
  size?: string;
  filled?: boolean;
  color?: string;
};

export function MapMarkIcon({
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
      viewBox="0 0 20 21"
      className={className}
    >
      <path
        stroke={color}
        strokeWidth="1.5"
        d="M10 11.692a2.6 2.6 0 100-5.2 2.6 2.6 0 000 5.2z"
      ></path>
      <path
        stroke={color}
        strokeWidth="1.5"
        d="M3.017 7.575C4.658.358 15.35.367 16.983 7.583c.959 4.233-1.675 7.817-3.983 10.034a4.328 4.328 0 01-6.008 0c-2.3-2.217-4.934-5.809-3.975-10.042z"
      ></path>
    </svg>
  );
}
