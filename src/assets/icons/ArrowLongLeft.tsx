import React from "react";

type Props = {
  className?: string;
};

export function ArrowLongLeft({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M9.57 5.93L3.5 12l6.07 6.07M20.5 12H3.67"
      />
    </svg>
  );
}
