// Libraries
import React, {useState} from 'react';
// Components
import {Title} from '../../typography';
import AccordionItem from './components/AccordionItem/AccordionItem';
// Types
import {TitleTag, TitleVariant} from '../../typography/Title/Title';
import {AccordionItemModel} from './components/AccordionItem/AccordionItem';
// Styles
import styles from './Accordion.module.scss';

interface AccordionProps {
	title?: string;
	elements: AccordionItemModel[];
}

const Accordion = (props: AccordionProps) => {
	const {title, elements} = props;

	const [currentId, setCurrentId] = useState<string | undefined>(undefined);

	const changeIdHandler = (id: string | undefined) => setCurrentId(id);

	return (
		<div className={styles.wrapper}>
			<Title
				classes={styles.title}
				tag={TitleTag.h3}
				variant={TitleVariant.standard}>
				{title ?? 'FAQ'}
			</Title>
			<ul>
				{elements.map((item) => (
					<AccordionItem
						key={item.id}
						currentId={currentId}
						changeIdHandler={changeIdHandler}
						{...item}
            />
				))}
			</ul>
		</div>
	);
};

export default Accordion;
