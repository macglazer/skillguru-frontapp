import React, {useContext} from "react";
import {createContext, useReducer} from "react";

import menteeRegisterInitialState from "../reducers/menteeRegister/constants";
import {MenteeRegisterReducerAction} from "../reducers/menteeRegister/types";

import {ReactComponent as TeacherIcon} from '@icons/svg/teacher.svg';
import {ReactComponent as EnvelopeIcon} from '@icons/svg/envelope.svg';
import menteeRegisterReducer from "../reducers/menteeRegister/menteeRegisterReducer";
import RegisterStep1 from "../components/_register/RegisterStep1/RegisterStep1";
import RegisterStep5 from "../components/_register/RegisterStep5/RegisterStep5";
import RegisterStepperNavigation, {NavigationContentT} from "../components/_register/RegisterStepperNavigation/RegisterStepperNavigation";
import AsideTileLayout from "../components/_layouts/AsideTileLayout/AsideTileLayout";

type RegisterMenteeContextType = {
    registerMenteeState: typeof menteeRegisterInitialState;
    registerMenteeDispatch: React.Dispatch<MenteeRegisterReducerAction>;
};


const navigationContent: NavigationContentT[] = [
    {
        id: 0,
        title: 'Rejestracja',
        shorthand: 'Rejestracja',
        subtitle: 'Uzupełnij swoje dane, aby zarejestrować się jako mentor',
        icon: <TeacherIcon/>
    },
    {
        id: 4,
        title: 'Zweryfikuj swoje konto',
        shorthand: 'Weryfikacja',
        subtitle: 'Wejdź do swojej skrzynki e-mail, aby zweryfikować konto',
        icon: <EnvelopeIcon/>
    },
]

const resolveStepView = (step: number) => {
    switch (step) {
        case 0:
            return <RegisterStep1 isMentor={false} title='Zarejestruj się jako uczeń'/>;
        case 1:
            return <RegisterStep5 isMentor={false}/>;
        default: {
            if (process.env.NODE_ENV === 'development') throw Error('Invalid step in RegisterMenteeContext')
            return null;
        }
    }
}

const RegisterMenteeContext = createContext<RegisterMenteeContextType>({
    registerMenteeState: menteeRegisterInitialState,
    registerMenteeDispatch: () => null
});

export const RegisterMenteeProvider: React.FC = () => {
    const [registerMenteeState, registerMenteeDispatch] = useReducer(menteeRegisterReducer, menteeRegisterInitialState);

    const updateStep = (newStep: number) => {
        if (newStep <= registerMenteeState.maxVisitedStep) registerMenteeDispatch({
            type: "GO_TO_STEP",
            payload: newStep
        })
    }

    return (
        <RegisterMenteeContext.Provider value={{registerMenteeState, registerMenteeDispatch}}>
            <AsideTileLayout
                asideContent={
                    <RegisterStepperNavigation
                        updateStep={updateStep}
                        currentStep={registerMenteeState.step}
                        maxStep={registerMenteeState.maxVisitedStep}
                        navigationContent={navigationContent}
                    />
                }
            >
                {resolveStepView(registerMenteeState.step)}
            </AsideTileLayout>
        </RegisterMenteeContext.Provider>
    );
};

const useRegisterMenteeContext = () => useContext(RegisterMenteeContext);

export default useRegisterMenteeContext;
