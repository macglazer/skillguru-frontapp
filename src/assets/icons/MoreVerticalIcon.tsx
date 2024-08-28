import React from "react";

type Props = {
  className?: string;
  size?: string;
  filled?: boolean;
  color?: string;
  strokeWidth?: string
};

export const MoreVerticalIcon = ({ strokeWidth="1.667", size = "1em", className, color = "currentColor",}: Props) => {
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
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M10 10.834a.833.833 0 100-1.667.833.833 0 000 1.667zM10 5a.833.833 0 100-1.666.833.833 0 000 1.667zM10 16.667a.833.833 0 100-1.666.833.833 0 000 1.666z"
      />
    </svg>
  );
};
