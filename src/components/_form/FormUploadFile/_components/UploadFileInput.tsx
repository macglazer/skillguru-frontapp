import React, {type FC} from 'react';
import {ReactComponent as UploadIcon} from '@icons/svg/upload_cloud.svg';
import {Typography} from '@mui/material';
import type {FileRejection} from 'react-dropzone';
import {useDropzone} from 'react-dropzone';
import {StyledIcon, StyledUploadArea} from "./UploadFileInput.styles";


export type Props = {
    onChange: (files: File[]) => void;
    disabled?: boolean;
    name?: string
};

export const MAX_SIZE = 10; // in MB
export const MAX_FILES = 1;

const UploadFileInput: FC<Props> = ({ name, onChange, disabled }) => {
    const onDrop = (newFiles: File[]) => {
        onChange(newFiles);
    };

    const onDropRejected = (fileRejections: FileRejection[]): void => {
        fileRejections.forEach(({errors, file}) => {
            const [fileType] = file.name.split('.').reverse();
            errors.forEach(({code}) => {
                // eslint-disable-next-line default-case
                switch (code) {
                    case 'file-too-large':
                        alert('Plik za duży');
                        break;
                    case 'file-invalid-type':
                        alert('Niepoprawny format pliku')
                        break;
                }
            });
        });
    };

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        onDropRejected,
        maxSize: MAX_SIZE * 1000000,
        maxFiles: MAX_FILES,
        accept: {
            'image/png': ['.jpg', '.jpeg', '.png']
        },
        disabled
    });

    return (
        <StyledUploadArea  {...getRootProps()} disabled={!!disabled}>
            <input {...getInputProps()} name={name} />
            <StyledIcon as={UploadIcon}/>
            <Typography variant='caption' color='primary'>
                {isDragActive ?
                    'Upuść plik tutaj'
                    :
                    <>Naciśnij aby dodać <Typography variant='caption' color='text.secondary' component='span'> lub
                        upuść plik tutaj</Typography></>
                }
            </Typography>
        </StyledUploadArea>
    );
};

export default UploadFileInput;
