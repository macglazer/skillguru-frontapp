// Libraries
import React from 'react';
import {Link} from 'react-router-dom';
// Styles
import styles from './NavCard.module.scss'
import { ArrowRightIcon } from '@mui/x-date-pickers';
import Arrow from '@icons/Arrow';

interface NavCardProps {
	link: string;
  title: string;
	text: React.ReactNode;
	icon: React.ReactNode;
}

const NavCard = (props: NavCardProps) => {
  const {link, icon, title, text} = props

	return <Link to={link} className={styles.card}>
    <span className={styles.cardIcon}>{icon}</span>
    <span className={styles.cardTitle}>
      <span>{title}</span>
      <Arrow />
    </span>
    <span className={styles.cardText}>{text}</span>
  </Link>;
};

export default NavCard;
