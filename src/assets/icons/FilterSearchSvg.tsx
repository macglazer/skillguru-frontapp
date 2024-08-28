import React from "react";

type Props = {
    className?: string
    color?: string
    size?: string
}

export function FilterSearchSvg({ className, color = 'currentColor', size = '1em' } : Props) {
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
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M11.933 15.892c0 .508-.333 1.175-.758 1.433L10 18.083c-1.092.675-2.608-.083-2.608-1.433v-4.458c0-.592-.334-1.35-.675-1.767l-3.2-3.367c-.425-.425-.759-1.175-.759-1.683V3.44c0-1.008.759-1.766 1.684-1.766h11.116a1.69 1.69 0 011.684 1.683v1.85c0 .675-.425 1.517-.842 1.933"
      ></path>
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M13.392 13.766a2.667 2.667 0 100-5.333 2.667 2.667 0 000 5.333zM16.558 14.266l-.833-.833"
      ></path>
    </svg>
  );
}
