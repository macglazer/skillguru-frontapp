import React from "react";

type Props = {
  className?: string;
  height?: number | string;
  width?: number | string;
  onClick?: React.MouseEventHandler;
};

const CloseSmallSvg = ({ className, height, width, onClick }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "1em"}
      height={height || "1em"}
      fill="none"
      onClick={onClick}
      viewBox="0 0 16 16"
      className={className}
    >
      <path
        stroke="#56658F"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3.334 3.333l9.333 9.333M3.334 12.666l9.332-9.332"
      ></path>
    </svg>
  );
};

export default CloseSmallSvg;
