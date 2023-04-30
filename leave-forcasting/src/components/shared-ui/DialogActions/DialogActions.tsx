import {
    DialogActions as MuiDialogActions,
    DialogActionsProps as MuiDialogActionsProps
} from "@mui/material";

type DialogActionsProps = MuiDialogActionsProps;

const DialogActions = (props: DialogActionsProps) => {
    const { ...rest } = props;

    return (
        <MuiDialogActions {...rest} />
    );
}

export { DialogActions };