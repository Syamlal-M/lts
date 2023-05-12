import { useMemo, useState } from "react";
import { ListItemButton } from "@mui/material";
import { useThemeContext } from "context/ThemeContext";
import { getToken } from "utils/CookieUtils";
import { capitalize } from "utils/StringUtils";
import {
    AppBar, Avatar, Box, Card, CardHeader, Divider, Hidden, Icon, IconButton, ListItem,
    ListItemIcon, ListItemText, Popover, ToggleButton, ToggleButtonGroup, Toolbar, Typography
} from "components/shared-ui";

interface NavigationBarProps {
    onMenuClick?: () => void
    isAuthenticated: boolean,
    onLogout: () => void,
}

const NavigationBar = (props: NavigationBarProps) => {
    const { onMenuClick, isAuthenticated, onLogout } = props;

    const { isDarkMode, toggleTheme } = useThemeContext();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleThemeChange = (mode: 'dark' | 'light') => {
        if ((mode === 'dark' && !isDarkMode) || (mode === 'light' && isDarkMode)) {
            toggleTheme();
        }
    };


    const getRole = (): string => {
        let role = '';
        role = `${Object.values(JSON.parse(JSON.stringify(getToken('role'))))[0]}`;
        role = capitalize(role.split('_').join(" "));
        return role;
    };

    const avatarFallback = useMemo(() => getToken('username').split()[0][0], []);

    const handleLogout = () => {
        setAnchorEl(null);
        onLogout();
    }

    return (
        <AppBar
            position="fixed"
            color="primary"
            elevation={3}
            sx={{
                zIndex: { md: 1300 }
            }}
        >
            <Toolbar>
                <Hidden mdUp>
                    <IconButton
                        color="inherit"
                        aria-label="open left-hand navigation drawer"
                        onClick={onMenuClick}
                        sx={{ mr: 2 }}
                    >
                        <Icon>menu</Icon>
                    </IconButton>
                </Hidden>
                <Typography variant="h5" color="common.white" noWrap>Leave Tracker System</Typography>
                {
                    isAuthenticated &&
                    <Hidden mdDown>
                        <IconButton sx={{ ml: "auto" }} onClick={handleClick}>
                            <Avatar sx={{ height: 40, width: 40 }}>{avatarFallback}</Avatar>
                        </IconButton>
                        <Popover
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            onClose={handleClick}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <Card sx={{ width: 325 }}>
                                <CardHeader
                                    sx={{
                                        ".MuiCardHeader-content": {
                                            width: 100,
                                            ".MuiCardHeader-title": {
                                                fontSize: "1.4rem"
                                            },
                                            ".MuiCardHeader-subheader": {
                                                fontSize: "1.2rem"
                                            },
                                        },
                                    }}
                                    avatar={<Avatar sx={{ height: 50, width: 50 }}>{avatarFallback}</Avatar>}
                                    title={getToken('username')}
                                    subheader={getRole()}
                                    titleTypographyProps={{ noWrap: true }}
                                    subheaderTypographyProps={{ noWrap: true }}
                                />
                                <Divider />
                                <Box sx={{ paddingY: 1 }}>
                                    <ListItem>
                                        <Typography variant="overline" sx={{ mr: 2 }}>Mode</Typography>
                                        <ToggleButtonGroup
                                            size="small"
                                            fullWidth
                                            exclusive
                                            value={isDarkMode ? 'dark' : 'light'}
                                            color="primary"
                                        >
                                            <ToggleButton value='light' onClick={() => handleThemeChange('light')}>
                                                <Icon sx={{ mr: 1 }}>light_mode</Icon>
                                                Light
                                            </ToggleButton>
                                            <ToggleButton value='dark' onClick={() => handleThemeChange('dark')}>
                                                <Icon sx={{ mr: 1 }}>brightness_4</Icon>
                                                Dark
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    </ListItem>
                                    <ListItemButton onClick={handleLogout}>
                                        <ListItemIcon>
                                            <Icon>logout</Icon>
                                        </ListItemIcon>
                                        <ListItemText>Logout</ListItemText>
                                    </ListItemButton>
                                </Box>
                            </Card>
                        </Popover>
                    </Hidden>
                }
            </Toolbar>
        </AppBar>
    );
}

export { NavigationBar };