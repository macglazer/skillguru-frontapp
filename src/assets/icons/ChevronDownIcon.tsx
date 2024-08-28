import React from "react";

type Props = {
  className?: string;
  size?: string;
  filled?: boolean;
  color?: string;
};

export function ChevronDownIcon({
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
    viewBox="0 0 24 25"
    className={className}
  >
    <path
      fill={color}
      d="M12 16.5a.997.997 0 01-.707-.293l-6-6a.999.999 0 111.414-1.414L12 14.086l5.293-5.293a.999.999 0 111.414 1.414l-6 6A.997.997 0 0112 16.5z"
    />
  </svg>
  );
}
