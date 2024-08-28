// Libraries
import React from 'react';
import classNames from 'classnames';
import ReactSelect from 'react-select';
// Styles
import inputStyles from '../Input/Input.module.scss';
import styles from './Select.module.scss';

interface SelectProps {
	id: string;
	name: string;
	options: any // { value: string, label: string }[];
	value: string;
	label: string;
	valueChangeHandler: (name: string, value: any) => void;
	classes?: string;
	isMulti?: boolean;
	spanLabel?: string;
}

const Select = (props: SelectProps) => {
	const {options, value, classes, label, valueChangeHandler, name, isMulti, spanLabel} =
		props;

	return (
		<div className={classNames(styles.select, inputStyles.input, classes)}>
			{spanLabel && <span className={styles.text}>{spanLabel}</span>}
			<label className={inputStyles.selectLabel}>
				<ReactSelect
					isMulti={isMulti}
					options={options}
					placeholder={label}
					className='select'
					value={value}
					defaultValue={value}
					getOptionLabel={(option: any) => option?.label}
					onChange={(newValue: any) => {
						valueChangeHandler(name, newValue.value);
					}}
				/>
			</label>
		</div>
	);
};

export default Select;
