import React from "react";

type Props = {
  className?: string;
  size?: string;
  filled?: boolean;
  color?: string;
};

export const RadioInputIcon = ({
  size = "1em",
  className,
  filled,
  color = "currentColor",
}: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 21"
      className={className}
    >
      <circle cx="10" cy="10.5" r="9.5" fill="#fff" stroke={color} />
      {filled ? <circle cx="10" cy="10.5" r="5" fill={color} /> : null}
    </svg>
  );
};
