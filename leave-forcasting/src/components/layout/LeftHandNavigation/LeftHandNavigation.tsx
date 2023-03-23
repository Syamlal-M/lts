import { useLocation, useNavigate } from "react-router-dom";
import { SxProps } from "@mui/material";
import { NavigationList } from "types/NavigationList";
import {
    Box, Divider, Drawer, Icon, IconButton, Link, List, ListItem,
    ListItemButton, ListItemIcon, ListItemText, Typography
} from "components/shared-ui";
import { navLinkActiveStyle, navLinkBaseStyle } from "./LeftHandNavigation.styles";

type LeftHandNavigationVariants = "temporary" | "permanent" | "persistent";

interface LeftSideNavigationProps {
    open: boolean,
    onClose: () => void,
    navigationList: NavigationList,
    drawerSx: SxProps
    variant: LeftHandNavigationVariants,
}

const LeftHandNavigation = (props: LeftSideNavigationProps) => {
    const { open, onClose, navigationList, variant, drawerSx } = props;

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
            <Box component="nav">
                <List
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
                                <Link
                                    onClick={() => onNavLinkClick(item.urlPath)}
                                    sx={isNavLinkActive(item.urlPath) ?
                                        navLinkActiveStyle : navLinkBaseStyle
                                    }
                                >
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Icon>{item.icon}</Icon>
                                        </ListItemIcon>
                                        <ListItemText>{item.label}</ListItemText>
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        )
                    }
                </List>
            </Box>
        </Drawer >
    );
}

export { LeftHandNavigation };