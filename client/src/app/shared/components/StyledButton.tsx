import { Button, styled, type ButtonProps } from "@mui/material";
import { Link } from "react-router";

type StyledButtonProps = ButtonProps & {
    component?: typeof Link;
    to?: string;
}

const StyledButton = styled(Button)<StyledButtonProps>(({theme}) => ({
    '&.Mui-disabled': {
        backgroundColor: theme.palette.grey[600],
        color: theme.palette.text.disabled
    }
}))

export default StyledButton