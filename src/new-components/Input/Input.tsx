// Libraries
import React, {useEffect, useState, ChangeEvent} from 'react';
import classNames from 'classnames';
// Components
import Chip from '../Tag/Tag';
// Helpers
import validation from '../../helpers/improovedValidation';
// Styles
import styles from './Input.module.scss';

interface InputProps {
	id: string;
	type?: string;
	name: string;
	label: string;
	as?: 'input' | 'textarea';
	required?: boolean;
	value: string | string[];
	errorMessage?: string;
	placeholder?: string;
	isValid?: boolean;
	valueChangeHandler: (name: string, value: any) => void;
	classes?: string;
}

export const defaultInput = {
	value: '',
	errorMessage: '',
	isValid: undefined,
};

const Input = (props: InputProps) => {
	const {
		id,
		type = 'text',
		name,
		label,
		as = 'input',
		required = false,
		value,
		placeholder,
		errorMessage,
		isValid,
		valueChangeHandler,
		classes,
	} = props;
	const Tag = as;

	const [touched, setTouched] = useState(false);
	const [currentChip, setCurrentChip] = useState('');
	const [chip, setChip] = useState<{id: string; text: string}[]>([]);

	const changeHandler = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (type === 'multi') {
			setCurrentChip(e.target.value);
		} else {
			const errorMessage = validation(touched, e.target.value, name, required);
			valueChangeHandler(name, {
				value: e.target.value,
				errorMessage,
				isValid: errorMessage === '' && touched,
			});
		}
	};

	const handleEnterPressHandler = (e: any) => {
		if (type !== 'multi' || e.key !== 'Enter' || currentChip.trim().length === 0)
			return;

		const newChips = [
			...chip,
			{id: Math.random().toString(36), text: currentChip},
		];

		setChip(newChips);
		setCurrentChip('');
		valueChangeHandler(name, {
			value: newChips,
			errorMessage,
			isValid: errorMessage === '' && touched,
		});
	};

	useEffect(() => {
		if (!touched) return;
		const errorMessage = validation(touched, value, name, required);

		valueChangeHandler(name, {
			value,
			errorMessage,
			isValid: errorMessage === '',
		});
	}, [touched]);

	return (
		<div
			className={classNames(styles.input, classes)}
			data-status={!!errorMessage ? 'error' : isValid ? 'success' : ''}>
			<label className={styles.inputLabel}>
				<span className={styles.inputLabelText}>
					{label}
					{required && ' *'}
				</span>
				<Tag
					id={id}
					name={name}
					className={styles.inputField}
					type={as === 'textarea' ? undefined : type}
					onChange={changeHandler}
					value={type === 'multi' ? currentChip : value}
					required={required}
					placeholder={placeholder}
					autoComplete='true'
					onBlur={() => setTouched(true)}
					onKeyDown={handleEnterPressHandler}
				/>
				{type === 'multi' && (
					<div className={styles.chips}>
						{chip.map((item) => (
							<Chip
								key={item.id}
								{...item}
								onRemoveHandler={() => {
									const filteredChips = chip.filter(({id}) => id !== item.id)
									setChip(filteredChips);
									valueChangeHandler(name, {
										value: filteredChips,
										errorMessage,
										isValid: errorMessage === '' && touched,
									});
								}}
							/>
						))}
					</div>
				)}
			</label>
			{/* <span className={styles.inputError}>{errorMessage}</span> */}
		</div>
	);
};

export default Input;
