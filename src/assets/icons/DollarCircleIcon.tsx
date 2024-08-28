import React from "react";

type Props = {
  className?: string;
  size?: string;
  filled?: boolean;
  color?: string;
};

export const DollarCircleIcon = ({size = "1em", className, color = "currentColor",}: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
      className={className}
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.0"
        d="M5.781 9.553c0 .86.66 1.553 1.48 1.553h1.674c.713 0 1.293-.606 1.293-1.353 0-.813-.353-1.1-.88-1.287L6.66 7.533c-.526-.187-.88-.473-.88-1.287 0-.746.58-1.353 1.294-1.353h1.673c.82 0 1.48.693 1.48 1.553M8 4v8"
      ></path>
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.0"
        d="M8 14.667A6.667 6.667 0 108 1.334a6.667 6.667 0 000 13.333z"
      ></path>
    </svg>
  );
};
