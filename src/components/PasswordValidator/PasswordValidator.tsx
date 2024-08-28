// Libraries
import React, {useMemo} from 'react';
// Icons
import ErrorSign from '../../assets/icons/ErrorSign';
import SuccessSign from '../../assets/icons/SuccessSign';
// Styles
import styles from './PasswordValidator.module.scss';
import classNames from 'classnames';
// Constants
import { NUM_REGEX, BIG_SIGN_REGEX } from 'src/helpers/improovedValidation';

interface PasswordValidatorProps {
	password: string;
}

const PasswordValidator = (props: PasswordValidatorProps) => {
	const {password} = props;

	const isLong = useMemo(() => password.length >= 8, [password]);
	const hasNum = useMemo(() => NUM_REGEX.test(password), [password]);
	const hasBigSign = useMemo(() => BIG_SIGN_REGEX.test(password), [password]);

	return (
		<ul className={classNames('password-validator', styles.list)}>
			<li className={styles.listItem} data-is-valid={isLong}>
				{isLong ? <SuccessSign /> : <ErrorSign />}Hasło musi mieć co najmniej 8
				znaków
			</li>
			<li className={styles.listItem} data-is-valid={hasNum}>
				{hasNum ? <SuccessSign /> : <ErrorSign />}Hasło musi mieć w sobie liczbę
			</li>
			<li className={styles.listItem} data-is-valid={hasBigSign}>
				{hasBigSign ? <SuccessSign /> : <ErrorSign />}Hasło musi mieć jedną dużą
				literę
			</li>
		</ul>
	);
};

export default PasswordValidator;
