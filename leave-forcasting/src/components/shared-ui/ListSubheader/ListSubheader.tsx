import {
    ListSubheader as MuiListSubheader,
    ListSubheaderProps as MuiListSubheaderProps
} from "@mui/material";

type ListSubheaderProps = MuiListSubheaderProps;

const ListSubheader = (props: ListSubheaderProps) => {
    const { ...rest } = props;

    return (
        <MuiListSubheader {...rest} />
    );
}
export { ListSubheader };