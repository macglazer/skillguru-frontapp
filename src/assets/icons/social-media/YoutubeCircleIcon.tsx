import React from "react";

type Props = {
  className?: string;
  color?: string;
  size?: string;
};

export const YoutubeCircleIcon = ({
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
        d="M21.93 21.646H10.633c-1.511 0-2.729-1.337-2.729-2.98v-5.334c0-1.65 1.224-2.98 2.73-2.98h11.294c1.512 0 2.73 1.336 2.73 2.98v5.333c.005 1.65-1.218 2.98-2.73 2.98z"
      />
      <path fill="#E2E9FC" d="M19.244 15.917l-4.752-2.74v5.48l4.752-2.74z" />
    </svg>
  );
};
