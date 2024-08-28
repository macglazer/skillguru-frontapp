// Libraries
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
// Components
import Container from '../Container/Container';
import {Tag} from 'src/types/tags';
// Icons
// Styles
import styles from './SimpleLayout.module.scss';

interface SimpleLayoutProps {
	children?: React.ReactNode;
}

const SimpleLayout = (props: SimpleLayoutProps) => {
	const {children} = props;

  const navigate = useNavigate()

	return (
		<>
			<Container as={Tag.Header} classes={styles.header}>
				<div className={styles.headerTop}>
					<Link to={'/'} className={styles.navbarLogo}>
						{/*<Logo />*/}
					</Link>
				</div>
				<nav className={styles.headerBottom}>
          <button className={styles.headerButton} onClick={() => navigate(-1)}>Wróć</button>
        </nav>
			</Container>
			<main className={styles.main}>{children}</main>
		</>
	);
};

export default SimpleLayout;
