// Libraries
import React, {useState} from 'react';
import classNames from 'classnames';
// Components
import {Text} from '../typography';
import Checkbox from '../Checkbox/Checkbox';
// Styles
import styles from './MulitSelect.module.scss';

export interface MultiSelectProps {
	classes?: string;
	name: string;
	value: any;
	label: string;
	onValueChange: (name: string, value: any) => any;
	limit?: number;
	isSelect?: boolean
}

const MulitSelect = (props: MultiSelectProps) => {
	const {label, onValueChange, limit, value, classes, name, isSelect} = props;
	const [currentLimit, setCurrentLimit] = useState<number | undefined>(limit);
	const [selected, setSelected] = useState<any>(value);

	const updateStateHandler = (id: string) => {
		const newState = {
			...selected,
			[id]: {...selected[id], value: !selected[id].value},
		};

		setSelected(newState);
		onValueChange(name, {value: newState, errorMessage: '', touched: true});
	};

	return (
		<div className={classNames(classes, 'multi-select')}>
			{!isSelect && <Text classes={classNames(styles.label, 'multi-select__title')}>
				{label}
			</Text>}
			<div className={classNames(styles.options, 'multi-select__options')}>
				{Object.keys(value)
					.slice(0, currentLimit)
					.map((key) => (
						<Checkbox
							classes='multi-select__checkbox'
							key={value[key].id}
							id={value[key].id}
							name={value[key].name}
							value={selected[value[key].id]?.value}
							errorMessage={selected[value[key].id]?.errorMessage}
							isValid={selected[value[key].id]?.isValid}
							valueChangeHandler={() => updateStateHandler(value[key].id)}
							label={value[key].label}
						/>
					))}
			</div>
		{!!limit &&	<button
				className={styles.more}
				type='button'
				onClick={() => setCurrentLimit(currentLimit ? undefined : limit)}>
				{currentLimit ? 'Pokaż więcej' : 'Pokaż mniej'}
			</button>}
		</div>
	);
};

export default MulitSelect;
