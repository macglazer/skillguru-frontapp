import React from "react";

type Props = {
    className?: string
}

export function BinIcon({ className } : Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 18 19"
      className={className}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15.75 4.985a76.276 76.276 0 00-7.515-.375c-1.485 0-2.97.075-4.455.225l-1.53.15M6.375 4.228l.165-.983C6.66 2.533 6.75 2 8.018 2h1.964c1.268 0 1.366.563 1.478 1.252l.165.976M14.137 7.355l-.487 7.553C13.567 16.086 13.5 17 11.407 17H6.592c-2.092 0-2.16-.915-2.242-2.092l-.488-7.553M7.748 12.875h2.497M7.125 9.875h3.75"
      ></path>
    </svg>
  );
}
