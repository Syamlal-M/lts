import { useLocation, useNavigate } from "react-router-dom";
import { SxProps } from "@mui/material";
import { NavigationList } from "types/NavigationList";
import { useThemeContext } from "context/ThemeContext";
import {
    Box, Divider, Drawer, Icon, IconButton, List, ListItem,
    ListItemButton, ListItemIcon, ListItemText, Typography
} from "components/shared-ui";
import {
    navContainerStyles, navListStyles, navItemActiveStyles
} from "./LeftHandNavigation.styles";

type LeftHandNavigationVariants = "temporary" | "permanent" | "persistent";

interface LeftSideNavigationProps {
    open: boolean,
    onClose: () => void,
    navigationList: NavigationList,
    drawerSx: SxProps
    variant: LeftHandNavigationVariants,
    isAuthenticated: boolean,
    handleLogout: () => void,
}

const LeftHandNavigation = (props: LeftSideNavigationProps) => {
    const { open, onClose, navigationList, variant, drawerSx, isAuthenticated, handleLogout } = props;
    const { isDarkMode, toggleTheme } = useThemeContext();

    const currentUrlpath = useLocation().pathname;
    const isNavLinkActive = (path: string) => {
        return currentUrlpath === path;
    }

    const navigate = useNavigate();
    const onNavLinkClick = (urlPath: string) => {
        onClose();
        navigate(urlPath);
    }

    return (
        <Drawer
            open={open}
            onClose={onClose}
            variant={variant}
            sx={drawerSx}
        >
            <Box component="nav" sx={navContainerStyles}>
                <List
                    sx={{ ...navListStyles, flexGrow: 1 }}
                    subheader={
                        <>
                            <ListItem sx={{ py: { sm: 1.5 } }}>
                                <ListItemText>
                                    <Typography
                                        variant="overline"
                                        color="primary"
                                        noWrap
                                    >
                                        Leave Tracker
                                    </Typography>
                                </ListItemText>
                                <IconButton
                                    onClick={onClose}
                                    sx={{ display: { md: 'none' } }}
                                >
                                    <Icon>close</Icon>
                                </IconButton>
                            </ListItem>
                            <Divider sx={{ mb: 2.5 }} />
                        </>

                    }
                >
                    {
                        navigationList.map(item =>
                            <ListItem key={item.id}>
                                <ListItemButton
                                    onClick={() => onNavLinkClick(item.urlPath)}
                                    sx={isNavLinkActive(item.urlPath) ? navItemActiveStyles : {}}
                                >
                                    <ListItemIcon>
                                        <Icon>{item.icon}</Icon>
                                    </ListItemIcon>
                                    <ListItemText>{item.label}</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        )
                    }
                </List>
                <Divider />
                <List sx={navListStyles}>
                    <ListItem>
                        <ListItemButton
                            sx={isDarkMode ? navItemActiveStyles : {}}
                            onClick={toggleTheme}
                        >
                            <ListItemIcon>
                                <Icon>brightness_4</Icon>
                                <Icon></Icon>
                            </ListItemIcon>
                            <ListItemText>Dark Mode</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    {
                        isAuthenticated &&
                        <ListItem>
                            <ListItemButton onClick={handleLogout}>
                                <ListItemIcon>
                                    <Icon>logout</Icon>
                                </ListItemIcon>
                                <ListItemText>Logout</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    }
                </List>
            </Box>
        </Drawer >
    );
}

export { LeftHandNavigation };