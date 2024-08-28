import React from 'react';
import {useNavigate} from 'react-router-dom';
// Styles
import styles from './NavTitle.module.scss';

const NavTitle = (props: {children: React.ReactNode}) => {
	const navigate = useNavigate();

	return (
		<h2 className={styles.title}>
			<button onClick={() => navigate(-1)}>
				<svg
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M9.57 5.93005L3.5 12.0001L9.57 18.0701'
						stroke='#8E9ABB'
						strokeWidth='1.5'
						strokeMiterlimit='10'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M20.5 12H3.67004'
						stroke='#8E9ABB'
						strokeWidth='1.5'
						strokeMiterlimit='10'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</button>
			{props.children}
		</h2>
	);
};

export default NavTitle;
