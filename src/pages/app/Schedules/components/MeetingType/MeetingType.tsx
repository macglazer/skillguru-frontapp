import React, {ChangeEvent} from 'react';
// Icons
import Person from '@icons/Person';
import Group from '@icons/Group';
// Styles
import styles from '../../screens/ScheduleForm/ScheduleForm.module.scss';
import meetingStyles from './MeetingType.module.scss';
import Typography from "@mui/material/Typography";

interface MeetingTypeProps {
    value: string;
    onChange: (value: string) => void;
}

const MeetingType = (props: MeetingTypeProps) => {
    const {value, onChange} = props;

    const updateHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id;

        onChange(id);
    };

    return (
        <div>
            <Typography variant='buttonMd' className={styles.fieldText}>Rodzaj spotkania</Typography>
            <div className={meetingStyles.wrapper}>
                <label className={meetingStyles.field}>
                    <input
                        type='radio'
                        name='type'
                        id='individual'
                        checked={value === 'individual'}
                        onChange={updateHandler}
                    />
                    <Person/>
                    <span>1:1</span>
                </label>
                <label className={meetingStyles.field}>
                    <input
                        type='radio'
                        name='type'
                        id='group'
                        checked={value === 'group'}
                        onChange={updateHandler}
                    />
                    <Group/>
                    <span>Grupowe</span>
                </label>
            </div>
        </div>
    );
};

export default MeetingType;
