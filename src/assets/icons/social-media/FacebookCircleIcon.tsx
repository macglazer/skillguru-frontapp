import React from "react";

type Props = {
  className?: string;
  color?: string;
  size?: string;
};

export const FacebookInCircleIcon = ({
  size = "1em",
  className,
  color = "currentColor",
}: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 32 32"
      className={className}
    >
      <circle cx="16" cy="16" r="16" fill={color} />
      <path
        fill="#56658F"
        d="M16.873 17.262v5.516H14.34v-5.516h-2.105v-2.237h2.105v-.814c0-3.02 1.263-4.61 3.933-4.61.819 0 1.023.132 1.472.24v2.212c-.502-.088-.644-.137-1.165-.137-.619 0-.95.176-1.252.522-.303.346-.454.945-.454 1.803v.789h2.87l-.77 2.237h-2.1v-.005z"
      />
    </svg>
  );
};
