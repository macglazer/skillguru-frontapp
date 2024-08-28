import React from "react";

type Props = {
  className?: string;
  size?: string;
  filled?: boolean;
  color?: string;
  bg?: string
};

export function CheckCircleSolidIcon({
  size = "1em",
  className,
  color = "currentColor",
  bg = '#fff'
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 18 18"
      className={className}
    >
      <g clipPath="url(#clip0_4023_22115)">
        <path
          fill={color}
          d="M9 18a9 9 0 009-9 9 9 0 00-9-9 9 9 0 00-9 9 9 9 0 009 9z"
        ></path>
        <path
          stroke={bg}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4.927 9.582l2.327 2.327 5.819-5.818"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_4023_22115">
          <path fill={bg} d="M0 0H18V18H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}
