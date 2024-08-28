import React from "react";

type Props = {
  className?: string;
};

export const PdfIcon = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 20 20"
      className={className}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M7.5 9.167v5L9.167 12.5M7.5 14.167L5.835 12.5"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M18.333 8.334V12.5c0 4.167-1.667 5.834-5.834 5.834h-5c-4.166 0-5.833-1.667-5.833-5.834v-5c0-4.166 1.667-5.833 5.833-5.833h4.167"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M18.333 8.334h-3.334c-2.5 0-3.333-.834-3.333-3.334V1.667l6.667 6.667z"
      ></path>
    </svg>
  );
};
