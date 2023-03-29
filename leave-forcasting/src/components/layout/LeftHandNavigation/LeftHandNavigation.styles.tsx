import { SxProps } from "@mui/material";
import COLOR from "styles/Color";

const navLinkBaseStyle: SxProps = {
    textDecoration: 'none',
    width: "100%",
    color: COLOR.grey[600],

    '&:hover': {
        color: COLOR.primary.main,
        background: COLOR.primary.light,
        borderRadius: 2,

        ".MuiListItemIcon-root": {
            color: COLOR.primary.main,
        }
    }
};

const navLinkActiveStyle: SxProps = {
    ...navLinkBaseStyle,
    backgroundColor: COLOR.primary.main,
    color: COLOR.common.white,
    borderRadius: 2,

    ".MuiListItemIcon-root": {
        color: COLOR.common.white,
    }
}

const navContainerStyles: SxProps = {
    display: "flex",
    flexDirection: "column",
    height: "100%"
}

const navListStyles: SxProps = {
    flexGrow: 1
}

export {
    navLinkBaseStyle,
    navLinkActiveStyle,
    navContainerStyles,
    navListStyles
}