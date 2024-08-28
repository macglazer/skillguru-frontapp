import React from 'react';

type Props = {
	className?: string
	size?: string
}

export const CrownIcon = ({ className, size = '1em' } : Props) => {
	return (
		<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		fill="none"
		viewBox="0 0 20 21"
		className={className}
	  >
		<path
		  stroke="currentColor"
		  strokeLinecap="round"
		  strokeLinejoin="round"
		  strokeWidth="1.5"
		  d="M13.917 16.317H6.083c-.35 0-.741-.275-.858-.608l-3.45-9.65c-.492-1.384.083-1.809 1.267-.959l3.25 2.325C6.833 7.8 7.45 7.608 7.683 7L9.15 3.092c.467-1.25 1.242-1.25 1.708 0L12.325 7c.233.608.85.8 1.383.425l3.05-2.175c1.3-.933 1.925-.458 1.392 1.05l-3.367 9.425c-.125.317-.516.592-.866.592zM5.417 18.834h9.166M7.917 12.166h4.166"
		></path>
	  </svg>
	);
};
