import React, {FC} from "react";
import {MentoringSessionInListT} from "@services/mentoringSessions/mentoringSession.types";
import Typography from "@mui/material/Typography";
import {format} from "date-fns";
import {
    StyledButtonsWrapper,
    StyledCard, StyledRoundButton
} from "@newComponents/_mentoringMeeting/MentoringSessionAcordeonCard/MentoringSessionAcordeonCard.styles";
import {ReactComponent as ChevronIcon} from "../../../assets/icons/svg/chevron_up.svg"
import {Box, Button, Collapse} from "@mui/material";
import MentoringSessionMeetingDetailsHeader
    from "@newComponents/_mentoringMeeting/MentoringSessionMeetingDetailsHeader/MentoringSessionMeetingDetailsHeader";
import MentoringSessionMeetingDetails
    from "@newComponents/_mentoringMeeting/MentoringSessionMeetingDetails/MentoringSessionMeetingDetails";
import MentoringSessionJoinButton
    from "@newComponents/_mentoringMeeting/MentoringSessionJoinButton/MentoringSessionJoinButton";
import useConfirmationModalContext from "../../../context/ConfirmationModalContext";
import cancelMentoringSessionById from "@services/mentoringSessions/cancelMentoringSessionById.service";
import {QueryKey, useMutation, useQueryClient} from "@tanstack/react-query";
import {useSnackbar} from "notistack";
import {generatePath, Link} from "react-router-dom";
import paths from "../../../paths";
import {useSelector} from "react-redux";
import {getRole} from "../../../redux/selectors/authSelectors";
import {useAccountType} from "../../../hooks/useAccountType";

type Props = MentoringSessionInListT & {
    isOpen: boolean;
    onToggle: () => void;
    queryKey: QueryKey
}

const MentoringSessionAcordeonCard: FC<Props> = ({
                                                     isOpen,
                                                     start,
                                                     end,
                                                     onToggle,
                                                     id,
                                                     title,
                                                     meetingLink,
                                                     queryKey,
                                                     participant
                                                 }) => {
    const {enqueueSnackbar} = useSnackbar();
    const queryClient = useQueryClient();
    const {showConfirmationDialog} = useConfirmationModalContext();
    const {isMentor} = useAccountType();

    const cancelMutation = useMutation({
        mutationFn: cancelMentoringSessionById,
        onSuccess: () => {
            enqueueSnackbar('Spotkanie zostało odwołane', {variant: 'success'});
            queryClient.invalidateQueries({queryKey});
        },
        onError: () => {
            enqueueSnackbar('Wystąpił błąd podczas odwoływania spotkania', {variant: 'error'})
        }
    });

    const onCancel = async () => {
        const {decision} = await showConfirmationDialog({
            title: 'Odwołaj spotkanie',
            body: 'Czy jesteś pewny, że chcesz odwołać spotkanie?',
            buttons: [
                {
                    label: 'Tak, odwołaj spotkanie',
                    action: {decision: true},
                    buttonProps: {
                        variant: 'contained',
                        color: 'error'
                    },
                    blockedByForm: isMentor,
                }
            ],
            userInputs: isMentor ? [{
                label: 'Powód odwołania',
                key: 'reason',
                required: true,
                inputProps: { multiline: true, rows: 3},
            }] : undefined,
        });

        if (decision) cancelMutation.mutate({id, reason: 'asd'});
    }

    return (
        <StyledCard>
            <Box sx={{gridArea: 'timeRange'}} id={`mentoringSessionId-${id}`}>
                <Typography
                    variant='buttonLg'
                    color='primary'
                >
                    {format(start, 'H:mm')} - {format(end, 'H:mm')}
                </Typography>
            </Box>
            <Box sx={{gridArea: 'main'}}>
                <MentoringSessionMeetingDetailsHeader
                    isLoading={false}
                    title={title}
                    mentorName={participant?.name}
                    avatarUrl={participant?.avatarUrl}
                />
                <Collapse in={isOpen}>
                    <Box sx={{pt: 6}}>
                        <MentoringSessionMeetingDetails
                            isLoading={false}
                            meetingDetails={{participant}}
                        />
                    </Box>
                    <StyledButtonsWrapper>
                        <Button
                            component={Link}
                            to={generatePath(paths.rescheduleMeeting, {meetingId: id})}
                            sx={{gridArea: 'changeMeetingButton'}}
                            color='secondary'
                            variant='contained'
                            disabled={isMentor}
                        >
                            Przełóż spotkanie
                        </Button>
                        <Button
                            onClick={onCancel}
                            sx={{gridArea: 'cancelMeetingButton'}}
                            color='error'
                            variant='contained'
                        >
                            Odwołaj
                        </Button>
                        <Box sx={{gridArea: 'joinMeetingButton'}}>
                            <MentoringSessionJoinButton meetingUrl={meetingLink}/>
                        </Box>
                    </StyledButtonsWrapper>
                </Collapse>
            </Box>
            <Box sx={{justifySelf: 'flex-end', gridArea: 'expandButton'}}>
                <StyledRoundButton isOpen={isOpen} onClick={onToggle}>
                    <ChevronIcon/>
                </StyledRoundButton>
            </Box>
        </StyledCard>
    )
}

export default MentoringSessionAcordeonCard