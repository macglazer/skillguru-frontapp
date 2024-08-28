import React, {FC} from "react";
import {Tag} from "@customTypes/tags";
import stylesSessions from "../SessionForm/SessionForm.module.scss";
import NavTitle from "../../../../../components/typography/NavTitle/NavTitle";
import Container from "../../../../../components/Container/Container";
import ScheduleForm from "./ScheduleForm";
import {ScheduleFormInputT} from "./_types/ScheduleFormInputT";
import {addMonths, setHours, setMinutes} from "date-fns";
import {weekdays, type WeekdayT} from "./_types/WeekdayT";
import {WeekdayInputT} from "./_types/WeekdayInputT";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {getScheduleFormInitialData} from "@services/scheduleService";
import {CircularProgress, Fade} from "@mui/material";
import Box from "@mui/material/Box";

const today = new Date();

const defaultSlot = {
    dateFrom: setHours(setMinutes(today, 0), 9),
    dateTo: setHours(setMinutes(today, 0), 17)
};


const defaultValues: ScheduleFormInputT = {
    scheduleName: '',
    meetingLength: 30,
    type: 'individual',
    cancelAvailable: false,
    dateFrom: today,
    dateTo: addMonths(today, 1),
    participantsNumber: 1,
    weekdays: weekdays.reduce((acc, day) => {
        acc[day] = {
            isActivated: false,
            slots: [defaultSlot]
        }
        return acc;
    }, {} as Record<WeekdayT, WeekdayInputT>)
};

export const getScheduleQueryOptions = (scheduleId: string) => ({
    queryKey: ['schedule', scheduleId],
    queryFn: () => getScheduleFormInitialData(scheduleId),
});

const ScheduleScreen: FC = () => {
    const {scheduleId} = useParams<{ scheduleId: string | undefined }>();

    const {data, isLoading} = useQuery({
        ...getScheduleQueryOptions(scheduleId as string),
        enabled: !!scheduleId
    })

    return (
        <Container as={Tag.Section} classes={stylesSessions.wrapper}>
            <NavTitle>{!!scheduleId ? 'Edycja harmonogramu' : 'Tworzenie nowego harmonogramu'}</NavTitle>
            {!!scheduleId && !data && isLoading
                ? (
                    <Box sx={{display: 'flex', paddingTop: 6, justifyContent: 'center'}}>
                        <CircularProgress size={45}/>
                    </Box>
                ) : (
                    <Fade in>
                        <div>
                            <ScheduleForm defaultValues={data || defaultValues}/>
                        </div>
                    </Fade>
                )
            }
        </Container>
    )
}

export default ScheduleScreen