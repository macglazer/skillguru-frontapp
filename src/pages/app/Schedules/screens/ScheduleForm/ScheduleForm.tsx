import React, {FC, useCallback, useEffect, useMemo} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import stylesSessions from '../SessionForm/SessionForm.module.scss';
import {SubmitHandler, useForm} from "react-hook-form";
import {Button} from "@mui/material";
import {ScheduleFormInputT} from "./_types/ScheduleFormInputT";
import ScheduleFormGeneralSettings from "./_components/ScheduleFormGeneralSettings/ScheduleFormGeneralSettings";
import {createScheduleMeeting, editMentorSchedule} from "@services/scheduleService";
import ScheduleFormWeekDays from "./_components/ScheduleFormWeekDays/ScheduleFormWeekDays";

const revalidatingTimeout: Record<string, ReturnType<typeof setTimeout>> = {};

type Props = {
    defaultValues: ScheduleFormInputT;
}

const ScheduleForm: FC<Props> = ({defaultValues}) => {
    const {scheduleId} = useParams();
    const navigate = useNavigate();
    const {
        formState,
        control,
        clearErrors,
        watch,
        getValues,
        handleSubmit,
        trigger,
        setFocus,
    } = useForm<ScheduleFormInputT>({
        defaultValues,
        mode: 'all',
    })


    const meetingLengthValue = watch('meetingLength');

    const onSubmit: SubmitHandler<ScheduleFormInputT> = useCallback((data) => {
        if (scheduleId) {
            editMentorSchedule(scheduleId, data)
                .then(() => {
                    navigate('/schedules');
                })
                .catch(error => {
                    console.error('Error updating schedule:', error.message);
                });
        } else {
            createScheduleMeeting(data)
                .then(() => {
                    navigate('/schedules');
                })
                .catch(error => {
                    console.error('Error creating schedule meeting:', error.message);
                });
        }
    }, [navigate]);

    const revalidate = useCallback((path: string) => () => {
        const timeoutId = revalidatingTimeout[path]
        if (timeoutId) clearTimeout(timeoutId);

        revalidatingTimeout[path] = setTimeout(() => {
            trigger(path as keyof ScheduleFormInputT);
        }, 10);
    }, []);


    useEffect(() => {
        // revalidate weekdays when meeting length changes
        revalidate('weekdays')();
    }, [meetingLengthValue]);

    useEffect(() => {
        setFocus('scheduleName');
    }, []);

    return (
        <form className={stylesSessions.form} onSubmit={handleSubmit(onSubmit)}>
            <ScheduleFormGeneralSettings formControl={control} formWatch={watch} formState={formState}/>
            <ScheduleFormWeekDays
                formControl={control}
                formGetValues={getValues}
                formClearErrors={clearErrors}
                revalidate={revalidate}
                watch={watch}
            />
            <Button
                sx={{mt: 2}}
                fullWidth
                variant='contained'
                type='submit'
                disabled={!!Object.entries(formState.errors).length}>
                Zapisz zmiany
            </Button>
        </form>
    );
};

export default ScheduleForm;
