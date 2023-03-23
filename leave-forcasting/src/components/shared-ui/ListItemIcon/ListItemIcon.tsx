import {
    ListItemIcon as MuiListItemIcon,
    ListItemIconProps as MuiListItemIconProps
} from "@mui/material";

type ListItemIconProps = MuiListItemIconProps;

const ListItemIcon = (props: ListItemIconProps) => {
    const { ...rest } = props;

    return (
        <MuiListItemIcon {...rest} />
    );
}
export { ListItemIcon };