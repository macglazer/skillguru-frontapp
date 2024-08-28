// Libraries
import React from 'react';
import classNames from 'classnames';
// Types
import {Common, FontColors} from '../../../types/main';
// Styles
import styles from './Title.module.scss'

export enum TitleTag {
	h1 = 'h1',
	h2 = 'h2',
	h3 = 'h3',
	h4 = 'h4',
	h5 = 'h5',
	h6 = 'h6',
}

export enum TitleVariant {
	main = 'main',
	section = 'section',
	standard = 'standard',
	sectionConst = 'section-const',
}


interface Title extends Common {
	tag: TitleTag;
	variant: TitleVariant;
	color?: FontColors;
}

const SectionTitle = (props: Title) => {
	const {classes, id, children, tag: Tag, variant, color = FontColors.dark} = props;

	return (
		<Tag id={id} className={classNames(styles.title, classes)} data-variant={variant} data-color={color}>
			{children}
		</Tag>
	);
};

export default SectionTitle;
