import React from 'react';

type Props = {
	className?: string
}

const SearchSvg = ({ className } : Props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='1em'
			height='1em'
			viewBox='0 0 21 21'
			fill='none'
			className={className}
			>
			<mask
				id='mask0_798_291'
				style={{maskType: 'luminance'}}
				maskUnits='userSpaceOnUse'
				x='0'
				y='0'
				width='20'
				height='20'>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M0 0H19.4768V19.477H0V0Z'
					fill='white'
				/>
			</mask>
			<g mask='url(#mask0_798_291)'>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M9.739 1.5C5.196 1.5 1.5 5.195 1.5 9.738C1.5 14.281 5.196 17.977 9.739 17.977C14.281 17.977 17.977 14.281 17.977 9.738C17.977 5.195 14.281 1.5 9.739 1.5ZM9.739 19.477C4.369 19.477 0 15.108 0 9.738C0 4.368 4.369 0 9.739 0C15.109 0 19.477 4.368 19.477 9.738C19.477 15.108 15.109 19.477 9.739 19.477Z'
					fill='currentColor'
				/>
			</g>
			<mask
				id='mask1_798_291'
				style={{maskType: 'luminance'}}
				maskUnits='userSpaceOnUse'
				x='15'
				y='15'
				width='6'
				height='6'>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M15.2402 15.707H20.2643V20.7217H15.2402V15.707Z'
					fill='white'
				/>
			</mask>
			<g mask='url(#mask1_798_291)'>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M19.5145 20.7217C19.3235 20.7217 19.1315 20.6487 18.9845 20.5027L15.4605 16.9887C15.1675 16.6957 15.1665 16.2207 15.4595 15.9277C15.7515 15.6327 16.2265 15.6347 16.5205 15.9257L20.0445 19.4407C20.3375 19.7337 20.3385 20.2077 20.0455 20.5007C19.8995 20.6487 19.7065 20.7217 19.5145 20.7217Z'
					fill='currentColor'
				/>
			</g>
		</svg>
	);
};

export default SearchSvg;
