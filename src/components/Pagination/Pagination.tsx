// Library
import React from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
// Assets
import Arrow from '@icons/Arrow';
// Styles
import styles from './Pagination.module.scss';

interface PaginationProps {
	name?: string;
	maxPage: number;
}

const Pagination = (props: PaginationProps) => {
	const {name, maxPage} = props;

	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const currentPage = Number(searchParams.get(`page${name}`)) || 1;

	const goToPage = (page: number) => {
		const updatedSearchParams = new URLSearchParams(searchParams);
		updatedSearchParams.set(`page${name}`, String(page));
		setSearchParams(updatedSearchParams);
		navigate(`?${updatedSearchParams.toString()}`);
	};

	const nextPageHandler = () => {
		const nextPage = currentPage + 1;
		if (nextPage <= maxPage) {
			goToPage(nextPage);
		}
	};

	const prevPageHandler = () => {
		const prevPage = currentPage > 1 ? currentPage - 1 : 1;
		goToPage(prevPage);
	};

	if (maxPage === 1) return <></>;

	return (
		<div className={styles.wrapper}>
			<button
				type='button'
				onClick={prevPageHandler}
				data-hidden={currentPage === 1}
				disabled={currentPage === 1}
				className={styles.sideButton}>
				<Arrow />
				<span>Poprzednia</span>
			</button>
			<div className={styles.mobilePages}>
				Strona {currentPage} z {maxPage}
			</div>
			<div className={styles.desktopPages}>
				{currentPage - 1 !== 0 && (
					<button
						type='button'
						onClick={() => goToPage(currentPage - 1)}
						disabled={currentPage === currentPage - 1}
						className={styles.pageButton}>
						{currentPage - 1}
					</button>
				)}
				<button
					type='button'
					onClick={() => goToPage(currentPage)}
					disabled={true}
					className={styles.pageButton}>
					{currentPage}
				</button>
				{currentPage + 1 <= maxPage && (
					<button
						type='button'
						onClick={() => goToPage(currentPage + 1)}
						disabled={currentPage === currentPage + 1}
						className={styles.pageButton}>
						{currentPage + 1}
					</button>
				)}
				{maxPage - 2 > currentPage + 1 && <button>...</button>}
				{currentPage + 1 < maxPage - 2 && (
					<button
						type='button'
						onClick={() => goToPage(maxPage - 2)}
						disabled={currentPage === maxPage - 2}
						className={styles.pageButton}>
						{maxPage - 2}
					</button>
				)}
				{currentPage + 1 < maxPage - 1 && (
					<button
						type='button'
						onClick={() => goToPage(maxPage - 1)}
						disabled={currentPage === maxPage - 1}
						className={styles.pageButton}>
						{maxPage - 1}
					</button>
				)}
				{currentPage + 1 < maxPage && (
					<button
						type='button'
						onClick={() => goToPage(maxPage)}
						disabled={currentPage === maxPage}
						className={styles.pageButton}>
						{maxPage}
					</button>
				)}
			</div>
			<button
				type='button'
				onClick={nextPageHandler}
				data-hidden={currentPage === maxPage}
				disabled={currentPage === maxPage}
				className={styles.sideButton}>
				<span>Następna</span> <Arrow />
			</button>
		</div>
	);
};

export default Pagination;
