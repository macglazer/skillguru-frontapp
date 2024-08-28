import React, {FC} from "react";
import {Box, IconButton, Skeleton} from "@mui/material";
import Typography from "@mui/material/Typography";
import {ReactComponent as CopyIcon} from '../../assets/icons/svg/copy.svg'
import {useSnackbar} from "notistack";


type Props = {
    link: string;
    text: string;
    isLoading?: boolean;
}

const LinkWithCopyFunctionality: FC<Props> = ({text, link, isLoading}) => {
    const { enqueueSnackbar} = useSnackbar()

    const onCopy = async () => {
        try {
            await navigator.clipboard.writeText(link);
            enqueueSnackbar('Link skopiowany do schowka', {variant: 'success'});
        } catch (e) {
            enqueueSnackbar('Nie udało się skopiować linku', {variant: 'error'});
        }
    }

    if(isLoading) return <Skeleton />

    return (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center'}}>
            <Typography
                variant='buttonSm'
                sx={{color: 'base.80', textDecoration: 'none'}}
                component='a'
                href={link}
                target='_blank'
            >
                {text}
            </Typography>
            <IconButton onClick={onCopy}>
                <CopyIcon/>
            </IconButton>
        </Box>
    )
}

export default LinkWithCopyFunctionality;