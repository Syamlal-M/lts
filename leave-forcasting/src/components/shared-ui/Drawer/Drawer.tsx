import {
    Drawer as MuiDrawer,
    DrawerProps as MuiDrawerProps
} from "@mui/material";

type DrawerProps = MuiDrawerProps;

const Drawer = (props: DrawerProps) => {
    const { ...rest } = props;

    return (
        <MuiDrawer {...rest} />
    );
}

export { Drawer };