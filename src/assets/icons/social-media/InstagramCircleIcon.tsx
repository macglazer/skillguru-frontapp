import React from "react";

type Props = {
  className?: string;
  color?: string;
  size?: string;
};

export const InstagramCircleIcon = ({
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
      <circle cx="16" cy="16" r="16" fill={color}/>
      <path
        fill="#56658F"
        d="M19.758 21.836h-7.519a1.892 1.892 0 01-1.887-1.888V12.43c0-1.04.848-1.888 1.887-1.888h7.519c1.039 0 1.888.849 1.888 1.888v7.518a1.887 1.887 0 01-1.888 1.888z"
      />
      <path
        fill="#E2E9FC"
        d="M16 19.09a2.88 2.88 0 01-2.05-.849 2.88 2.88 0 01-.848-2.05c0-.774.301-1.502.848-2.05a2.88 2.88 0 012.05-.848 2.88 2.88 0 012.05.848 2.88 2.88 0 01.85 2.05 2.88 2.88 0 01-.85 2.05 2.889 2.889 0 01-2.05.85zm0-5.18a2.283 2.283 0 00-2.282 2.281A2.283 2.283 0 0016 18.473a2.283 2.283 0 002.282-2.282A2.29 2.29 0 0016 13.91zM19.463 13.197a.557.557 0 100-1.113.557.557 0 000 1.113z"
      />
    </svg>
  );
};
