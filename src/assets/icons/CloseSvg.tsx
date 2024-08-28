import React from 'react';

type Props = {
	className?: string
	height?: number|string
	width?: number|string
	onClick?: React.MouseEventHandler
}

const CloseSvg = ({ className, height, width, onClick } : Props) => {
	return (
		<svg
			onClick={onClick}
			xmlns='http://www.w3.org/2000/svg'
			width={width || '1em'}
			height={height || '1em'}
			viewBox='0 0 15 13'
			fill='none'
			className={className}
			>
			<path
				d='M13.5652 1L1 11.9736'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M13.5652 11.9736L7.86615 6.99644L1 1'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default CloseSvg;
