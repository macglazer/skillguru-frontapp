import React from "react";

type Props = {
  className?: string;
  color?: string;
  size?: string;
};

export const TwitterCircleIcon = ({
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
      <g clipPath="url(#clip0_3962_20319)">
        <path
          fill="#56658F"
          d="M19.583 10.17h2.011l-4.393 5.022 5.168 6.832h-4.046l-3.17-4.143-3.627 4.143H9.514l4.7-5.37-4.959-6.483h4.15l2.865 3.788 3.313-3.788zm-.705 10.65h1.114l-7.193-9.509h-1.195l7.274 9.51z"
        />
      </g>
      <defs>
        <clipPath id="clip0_3962_20319">
          <path
            fill="#fff"
            d="M0 0H14.306V14.306H0z"
            transform="translate(8.66 9.036)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
