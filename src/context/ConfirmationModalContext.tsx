import React, {ReactNode, useCallback, useContext, useMemo, useRef, useState} from "react";
import {createContext} from "react";
import {ButtonProps, Dialog, DialogTitle, DialogContent, DialogActions, Button, Box} from "@mui/material";
import Typography from "@mui/material/Typography";

import {FieldValues, useForm} from "react-hook-form";
import {TextFieldProps} from "@mui/material/TextField";
import FullSizeIconButton from "../components/FullSizeIconButton/FullSizeIconButton";
import CloseIcon from "@mui/icons-material/Close";
import FormInputText from "../components/_form/FormInputText/FormInputText";

// TODO expand it for other use cases
// TODO find any way to type actionType and userFeedback as generic
type CloseResponse = {
    decision: boolean;
    actionType?: string;
}

type ModalButton = {
    buttonProps?: ButtonProps,
    label: string | ReactNode,
    action: CloseResponse,
    blockedByForm?: boolean;
};

type FeedbackInput = {
    label: string,
    key: string;
    required?: boolean;
    inputProps?: TextFieldProps;
}

type ModalConfig = {
    title: string | ReactNode,
    body: string | ReactNode,
    buttons: ModalButton[],
    userInputs?: FeedbackInput[]
};

type ShowConfirmationModalReturn = CloseResponse & { userFeedback?: FieldValues };
type ShowConfirmationModal = (options: ModalConfig) => Promise<ShowConfirmationModalReturn>;

type ConfirmationModalContextType = {
    showConfirmationDialog: ShowConfirmationModal;
};

const ConfirmationModalContext = createContext<ConfirmationModalContextType>({
    showConfirmationDialog: () => new Promise(() => {
    })
});

type Props = {
    children: ReactNode;
};

export const ConfirmationModalProvider: React.FC<Props> = ({children}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalConfig, setModalConfig] = useState<null | ModalConfig>(null);

    const form = useForm({mode: 'all'})

    const awaitingConfirmation = useRef<any>(null);

    // close action - timeout to prevent empty modal flash
    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setModalConfig(null), 150);
    };

    const showConfirmationDialog: ShowConfirmationModal = useCallback(config => {
        setModalConfig(config);
        setIsModalOpen(true);
        return new Promise(resolve => {
            awaitingConfirmation.current = {resolve};
        });
    }, [setIsModalOpen, setModalConfig, awaitingConfirmation]);

    const onCancel = (actionType = '') => {
        if (awaitingConfirmation.current) {
            const response: ShowConfirmationModalReturn = {decision: false, actionType, userFeedback: form.getValues()}
            awaitingConfirmation.current.resolve(response);
        }
        closeModal();
    };

    const onConfirm = (actionType = '') => {
        if (awaitingConfirmation.current) {
            const response: ShowConfirmationModalReturn = {decision: false, actionType, userFeedback: form.getValues()};
            awaitingConfirmation.current.resolve(response);
        }
        closeModal();
    };

    const value = useMemo(() => ({
        showConfirmationDialog
    }), [showConfirmationDialog]);

    return (
        <ConfirmationModalContext.Provider value={value}>
            {children}
            <Dialog open={isModalOpen} onClose={() => onCancel('close-outside')}
                    PaperProps={{sx: {borderRadius: '20px'}}}>
                {modalConfig && (
                    <Box sx={{pt: 4, pr: 4, pb: 7, pl: 4, display: 'grid'}}>
                        <FullSizeIconButton onClick={() => onCancel('close-button')} sx={{justifySelf: 'flex-end'}}>
                            <CloseIcon/>
                        </FullSizeIconButton>
                        <DialogTitle>
                            <Typography variant='h3'>
                                {modalConfig.title}
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Typography variant='body2'>
                                {modalConfig.body}
                            </Typography>
                            {modalConfig.userInputs && (
                                <Box sx={{pt: 4}}>
                                    {modalConfig.userInputs.map(({
                                                                     label,
                                                                     key,
                                                                     required,
                                                                     inputProps
                                                                 }) => (
                                        <FormInputText
                                            control={form.control}
                                            formState={form.formState}
                                            name={key}
                                            controllerProps={{rules: {required: required && 'To pole jest wymagane'}}}
                                            key={key}
                                            label={label}
                                            inputProps={inputProps}
                                        />
                                    ))}
                                </Box>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Box sx={{
                                display: 'grid',
                                gap: 3,
                                width: '100%',
                                justifyItems: 'stretch',
                                justifyContent: 'stretch'
                            }}>
                                {modalConfig.buttons.map(({buttonProps, action, label, blockedByForm}, index) => {
                                    const onClick = () => action.decision ? onConfirm(action.actionType) : onCancel(action.actionType);
                                    return <Button
                                        disabled={blockedByForm && !form.formState.isValid}
                                        key={index}
                                        {...buttonProps}
                                        onClick={onClick}
                                    >
                                        {label}
                                    </Button>
                                })}
                            </Box>
                        </DialogActions>
                    </Box>
                )}
            </Dialog>
        </ConfirmationModalContext.Provider>
    );
};

const useConfirmationModalContext = () => useContext<ConfirmationModalContextType>(ConfirmationModalContext);

export default useConfirmationModalContext;
