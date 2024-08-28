import React, {useMemo} from "react";
import {Control, ControllerProps, FieldValues, FormState, Path} from "react-hook-form";
import Typography from "@mui/material/Typography";

import FormUploadFile from "../_form/FormUploadFile/FormUploadFile";
import {StyledAvatarPreview, StyledAvatarWrapper, StyledWrapper} from "./ProfilePictureEditor.styles";
import FaceIcon from '@mui/icons-material/Face';
import {Button} from "@mui/material";


interface Props<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    formState: FormState<T>;
    imageFile: File | null;
    onRemove: () => void;
    controllerProps?: Omit<ControllerProps<T>, 'name' | 'control' | 'render'>;
}

const ProfilePictureEditor = <T extends FieldValues>({control, name, formState, imageFile, onRemove, controllerProps = {}}: Props<T>) => {

    const imageSrc = useMemo(() => imageFile ? window.URL.createObjectURL(imageFile) : null, [imageFile]);

    return (
        <>
            <Typography variant='body2' sx={{mb: 1}}>Zdjęcie profilowe</Typography>
            <StyledWrapper>
                <StyledAvatarWrapper>
                    <StyledAvatarPreview backgroundSrc={imageSrc}>
                        <FaceIcon fontSize='large'/>
                    </StyledAvatarPreview>
                    <Button onClick={onRemove} sx={{padding: 1}} variant='text' color='primary' size='small'>
                        Usuń
                    </Button>
                </StyledAvatarWrapper>
                <FormUploadFile controllerProps={controllerProps} disabled={!!imageSrc} name={name} control={control} formState={formState}/>
            </StyledWrapper>
        </>
    );
}

export default ProfilePictureEditor;