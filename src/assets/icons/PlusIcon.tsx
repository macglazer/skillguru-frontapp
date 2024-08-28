import React from "react";

type Props = {
  size?: string;
  color?: string;
  className?: string;
};

export const PlusIcon = ({
  size = "1em",
  color = "currentColor",
  className,
}: Props) => {
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
        d="M11 19.5a1 1 0 102 0v-6h6a1 1 0 100-2h-6v-6a1 1 0 00-2 0v6H5a1 1 0 000 2h6v6z"
      />
    </svg>
  );
};
