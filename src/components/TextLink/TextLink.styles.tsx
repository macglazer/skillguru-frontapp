import {styled as styledMui} from "@mui/material";
import {Link} from "react-router-dom";

const StyledTextLink = styledMui(Link)(({theme}) => ({
    fontWeight: 700,
    color: theme.palette.text.primary,
    textDecoration: 'none',
    fontSize: 'inherit',
}));

export default StyledTextLink