import {
    ListItemText as MuiListItemText,
    ListItemTextProps as MuiListItemTextProps
} from "@mui/material";

type ListItemTextProps = MuiListItemTextProps;

const ListItemText = (props: ListItemTextProps) => {
    const { ...rest } = props;

    return (
        <MuiListItemText {...rest} />
    );
}
export { ListItemText };