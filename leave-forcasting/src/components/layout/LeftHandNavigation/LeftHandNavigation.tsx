import { useLocation, useNavigate } from "react-router-dom";
import { SxProps } from "@mui/material";
import { NavigationList } from "types/NavigationList";
import { useThemeContext } from "context/ThemeContext";
import {
    Box, Divider, Drawer, Hidden, Icon, IconButton, List, ListItem,
    ListItemButton, ListItemIcon, ListItemText, Typography
} from "components/shared-ui";
import {
    navContainerStyles, navListStyles, navItemActiveStyles
} from "./LeftHandNavigation.styles";
import { hasPermission } from "utils/ApiUtils";

type LeftHandNavigationVariants = "temporary" | "permanent" | "persistent";

interface LeftSideNavigationProps {
    open: boolean,
    onClose: () => void,
    navigationList: NavigationList,
    drawerSx: SxProps
    variant: LeftHandNavigationVariants,
    isAuthenticated: boolean,
    onLogout: () => void,
}

const LeftHandNavigation = (props: LeftSideNavigationProps) => {
    const { open, onClose, navigationList, variant, drawerSx, isAuthenticated, onLogout } = props;
    const { isDarkMode, toggleTheme } = useThemeContext();

    const currentUrlpath = useLocation().pathname;
    const isNavLinkActive = (path: string) => {
        return currentUrlpath === path;
    };

    const navigate = useNavigate();
    const onNavLinkClick = (urlPath: string) => {
        onClose();
        navigate(urlPath);
    };

    const handleLogout = () => {
        onClose();
        onLogout();
    };

    return (
        <Drawer
            open={open}
            onClose={onClose}
            variant={variant}
            sx={drawerSx}
        >
            <Box component="nav" sx={navContainerStyles}>
                <List
                    sx={{ ...navListStyles(isDarkMode), flexGrow: 1 }}
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
                            hasPermission(item.permission) &&
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
                <Hidden mdUp>
                    <Divider />
                    <List sx={navListStyles(isDarkMode)}>
                        <ListItem>
                            <ListItemButton
                                sx={isDarkMode ? navItemActiveStyles : {}}
                                onClick={toggleTheme}
                            >
                                <ListItemIcon>
                                    <Icon>brightness_4</Icon>
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
                </Hidden>
            </Box>
        </Drawer >
    );
}

export { LeftHandNavigation };