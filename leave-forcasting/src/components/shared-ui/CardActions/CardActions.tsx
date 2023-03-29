import {
    CardActions as MuiCardActions,
    CardActionsProps as MuiCardActionsProps
} from "@mui/material";

type CardActionsProps = MuiCardActionsProps;

const CardActions = (props: CardActionsProps) => {
    const { ...rest } = props;

    return (
        <MuiCardActions {...rest} />
    );
}

export { CardActions };