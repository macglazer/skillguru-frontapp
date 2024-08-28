import {useMemo} from "react";
import {BIG_SIGN_REGEX, NUM_REGEX} from "../helpers/improovedValidation";
import {InputFeedbackProps} from "../components/_form/InputFeedback/InputFeedback";

type Config = {
    minLength: number
};

const defaultConfig: Config = {
    minLength: 8
}

const usePasswordValidation = (passwordValue: string, configOverride?: Config) => {
    const {minLength} = {...defaultConfig, ...configOverride || {}}

    const passwordFeedback: InputFeedbackProps[] | undefined = useMemo(() => {
        if (!passwordValue) return undefined;
        return [
            {
                message: `Hasło musi mieć co najmniej ${minLength} znaków`,
                severity: passwordValue.length >= minLength ? 'success' : 'error'
            },
            {
                message: 'Hasło musi zawierać co najmniej 1 liczbę',
                severity: NUM_REGEX.test(passwordValue) ? 'success' : 'error'
            },
            {
                message: 'Hasło musi zawierać co najmniej 1 dużą literę',
                severity: BIG_SIGN_REGEX.test(passwordValue) ? 'success' : 'error'
            },
        ]
    }, [passwordValue]);
    const isPasswordValid = useMemo(() => passwordFeedback?.every(feedback => feedback.severity === 'success'), [passwordFeedback]);
    return {passwordFeedback, isPasswordValid};
}

export default usePasswordValidation;