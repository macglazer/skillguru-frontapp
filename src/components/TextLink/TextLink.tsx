import React from "react";
import {LinkProps} from "react-router-dom";
import {PathValue} from "../../paths";
import Typography, {TypographyProps} from "@mui/material/Typography";
import StyledTextLink from "./TextLink.styles";

type Props = {
    linkProps: Omit<LinkProps, 'children'> & {
        to: PathValue | { path: PathValue, hash: string }
    },
    typographyProps?: TypographyProps,
    children: React.ReactNode,
}

const TextLink: React.FC<Props> = ({children, linkProps, typographyProps = {}}) => {
    const parsedLinkProps = typeof linkProps.to === 'string' ? linkProps : {...linkProps, to: `${linkProps.to.path}#${linkProps.to.hash}`}

    return (
        <Typography component='span' {...typographyProps}>
            <StyledTextLink {...parsedLinkProps}>
                {children}
            </StyledTextLink>
        </Typography>
    )
}

export default TextLink;