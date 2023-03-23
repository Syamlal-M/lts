import {
    List as MuiList,
    ListProps as MuiListProps
} from "@mui/material";

type ListProps = MuiListProps;

const List = (props: ListProps) => {
    const { ...rest } = props;

    return (
        <MuiList {...rest} />
    );
}
export { List };