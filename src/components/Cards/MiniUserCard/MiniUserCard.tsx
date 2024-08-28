// Libraries
import React from 'react';
import {Link} from 'react-router-dom';
// Styles
import styles from './MiniUserCard.module.scss';

export interface MiniUserCardProps {
	id: string;
	link: string;
	image: string;
	name: string;
}

const MiniUserCard = (props: MiniUserCardProps) => {
	const {image, name, link} = props;

	return (
		<div className={styles.wrapper}>
			<div className={styles.image}>
				<img src={image} alt={name} />
			</div>
			<div className={styles.content}>
				<h3 className={styles.title}>{name}</h3>
				<Link className={styles.link} to={link}>Zobacz profil</Link>
			</div>
		</div>
	);
};

export default MiniUserCard;
