import {
    MenuItem as MuiMenuItem,
    MenuItemProps as MuiMenuItemProps
} from "@mui/material";

type MenuItemProps = MuiMenuItemProps;

const MenuItem = (props: MenuItemProps) => {
    const { ...rest } = props;

    return (
        <MuiMenuItem {...rest} />
    );
}

export { MenuItem };