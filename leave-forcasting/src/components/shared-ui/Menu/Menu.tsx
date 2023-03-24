import {
    Menu as MuiMenu,
    MenuProps as MuiMenuProps
} from "@mui/material";

type MenuProps = MuiMenuProps;

const Menu = (props: MenuProps) => {
    const { ...rest } = props;

    return (
        <MuiMenu {...rest} />
    );
}

export { Menu };