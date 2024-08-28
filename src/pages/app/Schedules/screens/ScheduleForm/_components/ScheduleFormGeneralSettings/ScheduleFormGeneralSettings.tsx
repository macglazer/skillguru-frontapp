import React, {FC, memo, useMemo} from "react";
import {Box, Collapse, useMediaQuery} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Control, Controller, FormState, UseFormWatch} from "react-hook-form";
import MeetingType from "../../../../components/MeetingType/MeetingType";
import styles from "../../ScheduleForm.module.scss";
import {isAfter, isBefore} from "date-fns";
import FormDatePicker from "../../../../../../../components/_form/FormDatePicker/FormDatePicker";
import FormInputText from "../../../../../../../components/_form/FormInputText/FormInputText";
import StepInput from "../../../../../../../components/StepInput/StepInput";
import Checkbox from "../../../../../../../components/Checkbox/Checkbox";
import {ScheduleFormInputT} from "../../_types/ScheduleFormInputT";
import {debounce} from "lodash";
import {StyledFeedbackWrapper} from "../../../../../../../components/_form/_common/FormInput.styles";
import InputFeedback from "../../../../../../../components/_form/InputFeedback/InputFeedback";

type Props = {
    formControl: Control<ScheduleFormInputT>,
    formState: FormState<ScheduleFormInputT>,
    formWatch: UseFormWatch<ScheduleFormInputT>,
};

const ScheduleFormGeneralSettings: FC<Props> = ({formControl, formState, formWatch}) => {
    const selectedType = formWatch('type');

    const dateRangeError = useMemo(() => {
        const {dateTo, dateFrom} = formState.errors;
        if (!dateFrom && !dateTo) return '';
        return 'Data końcowa musi być późniejsza niż początkowa'
    }, [formState]);

    return (
        <>
            <Box sx={{display: 'grid', gap: 1}}>
                <Typography variant='buttonMd'>Nazwa</Typography>
                <FormInputText
                    name='scheduleName'
                    control={formControl}
                    formState={formState}
                    inputProps={{placeholder: 'Nazwa harmonogramu'}}
                    controllerProps={{rules: {required: 'To pole jest wymagane'}}}
                />
            </Box>

            <Controller
                control={formControl}
                name='meetingLength'
                render={({field}) => (
                    <StepInput
                        minValue={15}
                        maxValue={120}
                        step={15}
                        measure='min'
                        label='Długość spotkania'
                        {...field}
                    />
                )}
            />

            <Controller
                control={formControl}
                name='type'
                render={({field}) => (
                    <MeetingType
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}
            />

            <Collapse in={selectedType === 'group'}>
                <Controller
                    control={formControl}
                    name='participantsNumber'
                    render={({field}) => (
                        <StepInput
                            minValue={1}
                            maxValue={5}
                            step={1}
                            label='Ilość uczestników'
                            {...field}
                        />
                    )}
                />
            </Collapse>
            <Controller
                control={formControl}
                name='cancelAvailable'
                render={({field}) => (
                    <Checkbox
                        id='cancelAvailable'
                        slide
                        label='Możliwość odwołania spotkania przez klienta'
                        name={field.name}
                        valueChangeHandler={(_, {value}) => field.onChange(value)}
                        value={field.value}

                    />
                )}
            />
            <div>
                <Typography variant='buttonMd' className={styles.fieldText}>Okres obowiązywania</Typography>
                <div className={styles.date}>
                    <FormDatePicker
                        formState={formState}
                        name='dateFrom'
                        control={formControl}
                        hideError
                        controllerProps={{
                            rules: {
                                required: 'To pole jest wymagane',
                                validate: (value, formValues) => {
                                    const dateTo = formValues.dateTo;
                                    if (!dateTo) return true;
                                    return isBefore(value as Date, dateTo) || 'Error message is set in dateRangeError function';
                                }
                            }
                        }}
                    />
                    <FormDatePicker
                        formState={formState}
                        name='dateTo'
                        control={formControl}
                        hideError
                        controllerProps={{
                            rules: {
                                required: 'To pole jest wymagane',
                                validate: (value, formValues) => {
                                    const dateFrom = formValues.dateFrom;
                                    if (!dateFrom) return true;
                                    return isAfter(value as Date, dateFrom) || 'Error message is set in dateRangeError function';
                                }
                            }
                        }}
                    />
                </div>
                <Collapse in={!!dateRangeError}>
                    <Box sx={{marginTop: 1}}>
                        <InputFeedback message={dateRangeError} severity='error'/>
                    </Box>
                </Collapse>
            </div>
        </>
    )
};

export default memo(ScheduleFormGeneralSettings);