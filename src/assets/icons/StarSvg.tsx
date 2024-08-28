import React from 'react';

type Props = {
	size?: string
	filled?: boolean
	color?: string
}

const StarSvg = ({ color = '#FFC728', filled = true, size = '20' }: Props = {}) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={size}
			height={size}
			viewBox='0 0 20 20'
			fill='none'>
			<path
				d='M19.9599 6.7776C19.8808 6.59148 19.6981 6.4706 19.4958 6.4706H13.346L10.4567 0.29075C10.3737 0.113248 10.1957 0 10 0C9.80428 0 9.62629 0.113248 9.54332 0.29075L6.65404 6.4706H0.50422C0.301851 6.4706 0.11918 6.59148 0.0401525 6.7776C-0.0388752 6.96372 0.000764683 7.17914 0.141335 7.32488L4.69535 12.0478L2.86395 19.3734C2.81496 19.5694 2.88759 19.7757 3.04859 19.8975C3.2096 20.0194 3.42797 20.0334 3.60326 19.9335L10 16.2781L16.3967 19.9335C16.4745 19.978 16.5607 20 16.6469 20C16.7545 20 16.8618 19.9655 16.9514 19.8975C17.1124 19.7757 17.185 19.5694 17.136 19.3734L15.3047 12.0478L19.8587 7.32488C19.9992 7.17914 20.0389 6.96372 19.9599 6.7776Z'
				fill={filled ? color : undefined}
				stroke={filled ? undefined : color}
    			strokeWidth={filled ? undefined :'2'}
			/>
		</svg>
	);
};

export default StarSvg;
