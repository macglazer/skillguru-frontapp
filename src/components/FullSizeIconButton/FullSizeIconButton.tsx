import React, {FC} from "react";
import {ButtonBase, ButtonProps} from "@mui/material";

type Props = ButtonProps

const FullSizeIconButton: FC<Props> = ({children, sx, ...overrides}) => {

    return (
        <ButtonBase
            variant='outlined'
            size='small'
            sx={{
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'base.40',
                borderRadius: '8px',
                padding: '8px 12px',
                ...(sx || {})
            }}
            {...overrides}
        >
            {children}
        </ButtonBase>
    )
};

export default FullSizeIconButton