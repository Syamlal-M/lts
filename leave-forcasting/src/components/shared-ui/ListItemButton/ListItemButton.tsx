import {
    ListItemButton as MuiListItemButton,
    ListItemButtonProps as MuiListItemButtonProps
} from "@mui/material";

type ListItemButtonProps = MuiListItemButtonProps;

const ListItemButton = (props: ListItemButtonProps) => {
    const { ...rest } = props;

    return (
        <MuiListItemButton {...rest} />
    );
}
export { ListItemButton };