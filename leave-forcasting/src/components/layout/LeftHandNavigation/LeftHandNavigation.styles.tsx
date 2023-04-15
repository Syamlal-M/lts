import { SxProps } from "@mui/material";
import COLOR from "styles/Color";

const navContainerStyles: SxProps = {
    display: "flex",
    flexDirection: "column",
    height: "100%"
}

const navListStyles: SxProps = {
    ".MuiListItem-root": {
        ".MuiButtonBase-root": {
            borderRadius: 2,
            color: COLOR.grey[600],

            '&:hover': {
                background: COLOR.primary.light,

                ".MuiListItemIcon-root": {
                    color: COLOR.primary.main,
                },

                ".MuiListItemText-root": {
                    color: COLOR.primary.main,
                }
            },
        }
    }
}

const navItemActiveStyles: SxProps = {
    backgroundColor: `${COLOR.primary.main} !important`,

    ".MuiListItemIcon-root": {
        color: `${COLOR.common.white} !important`,
    },

    ".MuiListItemText-root": {
        color: `${COLOR.common.white} !important`,
    }
}

export {
    navContainerStyles,
    navListStyles,
    navItemActiveStyles,
}