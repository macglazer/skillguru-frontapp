import React from "react";

type Props = {
  className?: string;
  color?: string;
  size?: string;
};

export const LinkedInCircleIcon = ({
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
        d="M12.389 13.932H9.636v8.78h2.753v-8.78zM19.833 13.741c-.102-.012-.21-.019-.318-.025a3.213 3.213 0 00-2.835 1.415v-1.174h-2.633v8.78H16.8V20.06v-1.446c0-.597-.044-1.231.254-1.777.254-.456.71-.685 1.224-.685 1.523 0 1.555 1.377 1.555 1.504v5.119h2.753v-5.728c0-1.96-.996-3.115-2.753-3.306zM11.012 12.799a1.599 1.599 0 100-3.197 1.599 1.599 0 000 3.197z"
      />
    </svg>
  );
};
