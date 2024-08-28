import React, {useCallback} from "react";
import styles from "../MentorshipApplication.module.scss";
import {useMentAppReducer} from "src/reducers/mentorship-application";
import {ContentWrapper} from "../elements/ContentWrapper";
import {CheckboxIcon} from "@icons/CheckboxIcon";
export const GoalsStep = () => {
    const { state, submitGoals } = useMentAppReducer();
    const { availableGoals, selectedGoals } = state;

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const input = e.currentTarget as HTMLInputElement;
            const { value, checked } = input;
            if (checked) {
                submitGoals([...selectedGoals, value], false);
            } else {
                submitGoals([...selectedGoals].filter((a) => a !== value), false);
            }
        },
        [selectedGoals, submitGoals]
    );

    return (
        <ContentWrapper
            title={``}
            subtitle={"Jakie są Twoje główne cele?"}
            description={""}
            submitText={"Dalej"}
            submitHandler={() => submitGoals(state.selectedGoals, true)}
            step={2}
            sidebar
        >
            <form className={styles.checkboxes}>
                {availableGoals.map((element, i) => (
                    <label key={i} className={styles.checkboxFieldset}>
                        <CheckboxIcon className={styles.checkIcon} checked={selectedGoals.includes(element.value)} />
                        <input
                            value={element.value}
                            onChange={handleChange}
                            type="checkbox"
                            checked={selectedGoals.includes(element.value)}
                        />
                        <span>{element.value}</span>
                    </label>
                ))}
            </form>
        </ContentWrapper>
    );
};
