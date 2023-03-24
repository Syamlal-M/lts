import {
    MenuList as MuiMenuList,
    MenuListProps as MuiMenuListProps
} from "@mui/material";

type MenuListProps = MuiMenuListProps;

const MenuList = (props: MenuListProps) => {
    const { ...rest } = props;

    return (
        <MuiMenuList {...rest} />
    );
}

export { MenuList };