// Libraries
import React from 'react';
import RangeSlider from 'react-range-slider-input';
import Input from '../Input/Input';
// Styles
import styles from './RangeInput.module.scss';
import 'react-range-slider-input/dist/style.css';

interface RangeInputProps {
	id: string;
	label: string;
	currentMinValue: number;
	currentMaxValue: number;
	minValue: number;
	maxValue: number;
	valueChangeHandler: (name: string, value: any) => void;
}

const RangeInput = (props: RangeInputProps) => {
	const {
		id,
		label,
		minValue,
		maxValue,
		currentMinValue,
		currentMaxValue,
		valueChangeHandler,
	} = props;

	const changeHandler = (name: string, value: any) => {
		if (name.includes('max')) {
			if(+value.value > maxValue || +value.value < currentMinValue || +value.value < minValue) return
			valueChangeHandler(id, {
				value: [currentMinValue, +value.value],
				errorMessage: undefined,
				isValid: true,
			});
		} else if (name.includes('min')) {
			if(+value.value < minValue || +value.value > maxValue || +value.value > currentMaxValue) return
			valueChangeHandler(id, {
				value: [+value.value, currentMaxValue],
				errorMessage: undefined,
				isValid: true,
			});
		}else{
			valueChangeHandler(id, {
				value: value,
				errorMessage: undefined,
				isValid: true,
			});
		}
	};

	return (
		<div className={styles.wrapper}>
			<span className={styles.label}>{label}</span>
			<RangeSlider
				min={minValue}
				max={maxValue}
				value={[currentMinValue, currentMaxValue]}
				onInput={(e: any) => changeHandler(id, e)}
			/>

			<div className={styles.inputs}>
				<Input
					classes={styles.field}
					id={id + 'min'}
					name={id + 'min'}
					label=''
					type='number'
					value={currentMinValue}
					valueChangeHandler={(name: any, value) => changeHandler('min', value)}
				/>
				<span>-</span>
				<Input
					classes={styles.field}
					id={id + 'max'}
					name={id + 'max'}
					label=''
					type='number'
					value={currentMaxValue}
					valueChangeHandler={(name: any, value) => changeHandler('max', value)}
				/>
				<span>zł</span>
			</div>
		</div>
	);
};

export default RangeInput;
