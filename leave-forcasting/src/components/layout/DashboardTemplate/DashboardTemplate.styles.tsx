import { SxProps } from "@mui/material";

const drawerWidth = 250;

const sideNavigationStyles: SxProps = {
    width: { md: drawerWidth },
    flexShrink: { sm: 0 }
}

const navigationDrawerStylesForXS: SxProps = {
    display: { xs: 'block', md: 'none' },
    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
};
const navigationDrawerStylesForMD: SxProps = {
    display: { xs: 'none', md: 'block' },
    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
};

const mainContainerStyles: SxProps = {
    flexGrow: 1,
    minHeight: "100vh",
    pt: { xs: 7, sm: 8 },
    width: { md: `calc(100% - ${drawerWidth}px)` }
};

export {
    sideNavigationStyles,
    navigationDrawerStylesForXS,
    navigationDrawerStylesForMD,
    mainContainerStyles
}