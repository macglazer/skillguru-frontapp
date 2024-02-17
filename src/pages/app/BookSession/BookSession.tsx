// Libraries
import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
// Components
import Container from 'src/new-components/Container/Container';
import Info from './components/Info/Info';
import BookForm from './components/BookForm/BookForm';
// Types
import {Tag} from 'src/types/tags';
// Styles
import styles from './BookSession.module.scss';

const BookSession = () => {
	const {id} = useParams();
	const [term, setTerm] = useState<Date | undefined>(undefined);

	const selectTermHandler = (term: Date) => {
		setTerm(term);
	};

	return (
		<>
			<Container as={Tag.Section}>
				<div className={styles.content}>
					<Info
						fullName='Jan Kowalski'
						position='Tester oprogramowania'
						descripiton='Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident est ipsum sed temporibus, iste adipisci esse amet explicabo impedit qui in aspernatur. Animi vel aliquid eius hic tempora eos voluptatem!'
						price={250}
						time={60}
						imageUrl='https://cdn.pixabay.com/photo/2024/01/10/16/22/man-8499961_1280.jpg'
						sessionTitle='Konsultacja'
						term={term}
					/>
					<BookForm selectTermHandler={selectTermHandler} />
				</div>
			</Container>
		</>
	);
};

export default BookSession;
