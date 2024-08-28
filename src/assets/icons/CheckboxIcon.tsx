import React from "react";

type Props = {
  className?: string;
  big?: boolean;
  checked?: boolean;
};

export function CheckboxIcon({ big, className, checked }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={big ? "32" : "20"}
      height={big ? "32" : "20"}
      fill="none"
      viewBox="0 0 20 20"
      className={className}
    >
      <rect
        width="19.167"
        height="19.167"
        x="0.417"
        y="0.417"
        fill={checked ? "#252B61" : "#fff"}
        stroke="#252B61"
        strokeWidth="0.833"
        rx="4.583"
      />
      {checked ? (
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.667"
          d="M6.666 10.667l2 2 5-5"
        />
      ) : null}
    </svg>
  );
}
