import React from "react";

type Props = {
    className?: string
}

export function ArrowLongRight({ className} : Props) {
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
        d="M14.43 5.93L20.5 12l-6.07 6.07M3.5 12h16.83"
      ></path>
    </svg>
  );
}
