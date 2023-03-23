import {
    ListItemSecondaryAction as MuiListItemSecondaryAction,
    ListItemSecondaryActionProps as MuiListItemSecondaryActionProps
} from "@mui/material";

type ListItemSecondaryActionProps = MuiListItemSecondaryActionProps;

const ListItemSecondaryAction = (props: ListItemSecondaryActionProps) => {
    const { ...rest } = props;

    return (
        <MuiListItemSecondaryAction {...rest} />
    );
}
export { ListItemSecondaryAction };