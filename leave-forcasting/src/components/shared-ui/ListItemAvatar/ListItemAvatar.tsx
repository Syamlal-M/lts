import {
    ListItemAvatar as MuiListItemAvatar,
    ListItemAvatarProps as MuiListItemAvatarProps
} from "@mui/material";

type ListItemAvatarProps = MuiListItemAvatarProps;

const ListItemAvatar = (props: ListItemAvatarProps) => {
    const { ...rest } = props;

    return (
        <MuiListItemAvatar {...rest} />
    );
}
export { ListItemAvatar };