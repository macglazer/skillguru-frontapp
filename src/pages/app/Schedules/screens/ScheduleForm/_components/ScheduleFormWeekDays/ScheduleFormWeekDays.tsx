import {weekdays} from "../../_types/WeekdayT";
import {format, setDay} from "date-fns";
import WeekTime from "../WeekTime/WeekTime";
import React, {FC} from "react";
import {Control, UseFormClearErrors, UseFormGetValues, UseFormWatch} from "react-hook-form";
import {ScheduleFormInputT} from "../../_types/ScheduleFormInputT";

const today = new Date();

type Props = {
    watch: UseFormWatch<ScheduleFormInputT>;
    formControl: Control<ScheduleFormInputT>;
    formGetValues: UseFormGetValues<ScheduleFormInputT>
    formClearErrors: UseFormClearErrors<ScheduleFormInputT>;
    revalidate: (name: string) => () => void;
}

const ScheduleFormWeekDays: FC<Props> = ({watch, formControl, formClearErrors, revalidate, formGetValues}) => {
    const weekdaysValue = watch('weekdays');

    return <div>
        {weekdays.map((name, index) => {
            const weekdayDate = setDay(today, index + 1);
            const baseName = `weekdays.${name}`
            return (
                <WeekTime
                    key={name}
                    label={format(weekdayDate, 'EEEEEE')}
                    baseName={baseName}
                    formControl={formControl}
                    formGetValues={formGetValues}
                    formClearErrors={formClearErrors}
                    isRowActivated={weekdaysValue ? weekdaysValue[name].isActivated : false}
                    revalidate={revalidate(baseName)}
                />
            )
        })}
    </div>
};

export default ScheduleFormWeekDays;