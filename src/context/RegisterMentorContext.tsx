import React, {useContext} from "react";
import {createContext, useReducer} from "react";
import mentorRegisterInitialState from "../reducers/mentorRegister/constants";
import mentorRegisterReducer from "../reducers/mentorRegister/mentorRegisterReducer";
import {MentorRegisterReducerAction} from "../reducers/mentorRegister/types";

import {ReactComponent as EditIcon} from '@icons/svg/edit.svg';
import {ReactComponent as EnvelopeIcon} from '@icons/svg/envelope.svg';
import {ReactComponent as LinkIcon} from '@icons/svg/link.svg';
import {ReactComponent as UserIcon} from '@icons/svg/user.svg';
import {ReactComponent as TeacherIcon} from '@icons/svg/teacher.svg';
import RegisterStepperNavigation, {NavigationContentT} from "../components/_register/RegisterStepperNavigation/RegisterStepperNavigation";
import RegisterStep1 from "../components/_register/RegisterStep1/RegisterStep1";
import RegisterStep2 from "../components/_register/RegisterStep2/RegisterStep2";
import RegisterStep3 from "../components/_register/RegisterStep3/RegisterStep3";
import RegisterStep4 from "../components/_register/RegisterStep4/RegisterStep4";
import RegisterStep5 from "../components/_register/RegisterStep5/RegisterStep5";
import AsideTileLayout from "../components/_layouts/AsideTileLayout/AsideTileLayout";

type RegisterMentorContextType = {
    registerMentorState: typeof mentorRegisterInitialState;
    registerMentorDispatch: React.Dispatch<MentorRegisterReducerAction>;
}


const navigationContent: NavigationContentT[] = [
    {
        id: 0,
        title: 'Rejestracja',
        shorthand: 'Rejestracja',
        subtitle: 'Uzupełnij swoje dane, aby zarejestrować się jako mentor',
        icon: <TeacherIcon/>
    },
    {
        id: 1,
        title: 'Informacje o sobie',
        shorthand: 'Informacje o sobie',
        subtitle: 'Uzupełnij informacje o sobie',
        icon: <UserIcon/>
    },
    {
        id: 2,
        title: 'Informacje profilu',
        shorthand: 'Informacje profilu',
        subtitle: 'Uzupełnij swój profil, by przyciągnąć uwagę',
        icon: <EditIcon/>
    },
    {
        id: 3,
        title: 'Portfolio',
        shorthand: 'Portfolio',
        subtitle: 'Uzupełnij swoje portfolio o linki',
        icon: <LinkIcon/>
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
            return <RegisterStep1 isMentor title='Zarejestruj się jako mentor'/>;
        case 1:
            return <RegisterStep2/>;
        case 2:
            return <RegisterStep3/>;
        case 3:
            return <RegisterStep4/>;
        case 4:
            return <RegisterStep5 isMentor/>;
        default: {
            if (process.env.NODE_ENV === 'development') throw Error('Invalid step in RegisterMentorContext')
            return null;
        }
    }
}

const RegisterMentorContext = createContext<RegisterMentorContextType>({
    registerMentorState: mentorRegisterInitialState,
    registerMentorDispatch: () => null
});

export const RegisterMentorProvider: React.FC = () => {
    const [registerMentorState, registerMentorDispatch] = useReducer(mentorRegisterReducer, mentorRegisterInitialState);

    const updateStep = (newStep: number) => {
        if (newStep <= registerMentorState.maxVisitedStep) registerMentorDispatch({
            type: "GO_TO_STEP",
            payload: newStep
        })
    }

    return (
        <RegisterMentorContext.Provider value={{registerMentorState, registerMentorDispatch}}>
            <AsideTileLayout
                asideContent={
                    <RegisterStepperNavigation
                        updateStep={updateStep}
                        currentStep={registerMentorState.step}
                        maxStep={registerMentorState.maxVisitedStep}
                        navigationContent={navigationContent}
                    />
                }
            >
                {resolveStepView(registerMentorState.step)}
            </AsideTileLayout>
        </RegisterMentorContext.Provider>
    );
};

const useRegisterMentorContext = () => useContext(RegisterMentorContext);

export default useRegisterMentorContext;
