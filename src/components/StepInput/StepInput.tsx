import React from 'react';
// Icons
import Add from '@icons/Add';
import Minus from '@icons/Minus';
// styles
import styles from './StepInput.module.scss';
import Typography from "@mui/material/Typography";

interface TimeProps {
	step: number;
	maxValue: number;
	minValue: number;
	value: number;
	label: string;
	name: string;
	measure?: string;
	onChange: (value: number) => void;
}

const StepInput = (props: TimeProps) => {
	const {
		value,
		onChange,
		step,
		minValue,
		maxValue,
		label,
		measure,
	} = props;

	const stepper = {
		increase: () => {
			const newTime = value + step;
			if (newTime > maxValue) return;
			onChange(newTime);
		},
		decrease: () => {
			const newTime = value - step;
			if (newTime < minValue) return;
			onChange(newTime);
		},
		disabledIncrease: value === maxValue,
		disabledDecrease: value === minValue,
	};

	return (
		<div className={styles.time}>
			<Typography variant='buttonMd' className={styles.fieldText}>{label}</Typography>
			<div className={styles.timeControler}>
				<button
					disabled={stepper.disabledDecrease}
					type='button'
					onClick={stepper.decrease}>
					<Minus />
				</button>
				<span>
					{value} {measure}
				</span>
				<button
					disabled={stepper.disabledIncrease}
					type='button'
					onClick={stepper.increase}>
					<Add />
				</button>
			</div>
		</div>
	);
};

export default React.forwardRef(StepInput);
