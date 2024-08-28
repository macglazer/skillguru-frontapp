import React from "react";
import styles from '../MentorshipApplication.module.scss'
import clx from 'classnames'
import { useMentAppReducer } from "src/reducers/mentorship-application";
import { Link } from "react-router-dom";
import { ContentWrapper } from "../elements/ContentWrapper";
import { PlanDetails } from "../elements";
import { MentorshipPlan } from "src/components/_grouped/mentorship-plan";

export const PlanStep = () => {
    const { state, ...actions } = useMentAppReducer()

    return (
        <ContentWrapper
            title={`Wybrałeś Plan Pro`} 
            subtitle={''} 
            description={'Informacje, które wypełnisz, zostaną przesłane do mentora, aby ten mógł lepiej przygotować się do Waszych spotkań.'} 
            submitText={'Zaczynajmy'}
            submitHandler={actions.submitPlan}
            step={1}
        >
            <PlanDetails />            
        </ContentWrapper>
    )
}
