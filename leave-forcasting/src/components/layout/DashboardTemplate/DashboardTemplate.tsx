import { Outlet, useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import NavigationMenuList from "data/NavigationMenuList";
import { Box } from "components/shared-ui";
import NavigationBar from "components/layout/NavigationBar";
import LeftHandNavigation from "components/layout/LeftHandNavigation";
import { useNavigationContext } from "context/NavigationContext";
import { useThemeContext } from "context/ThemeContext";
import {
    mainContainerDarkModeStyles, mainContainerStyles, navigationDrawerStylesForMD,
    navigationDrawerStylesForXS, sideNavigationStyles
} from "./DashboardTemplate.styles";
import { isAutheticated } from "utils/ApiUtils";
import { resetToken } from "utils/CookieUtils";
import { getRouteUrl } from "utils/AccessPointUtils";

interface TemplatePageProps {
    children?: React.ReactNode
}

function DashboardTemplate({ children }: TemplatePageProps) {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const { isDarkMode } = useThemeContext();
    const navigate = useNavigate();

    const { isNavDrawerOpened, toggleNavDrawerOpened } = useNavigationContext();
    const navigationList = NavigationMenuList;

    const handleLogout = () => {
        resetToken();
        navigate(getRouteUrl("ROOT"));
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <NavigationBar
                onMenuClick={toggleNavDrawerOpened}
            />
            <Box
                component="aside"
                sx={sideNavigationStyles}
            >
                <LeftHandNavigation
                    open={isNavDrawerOpened}
                    onClose={toggleNavDrawerOpened}
                    navigationList={navigationList}
                    variant={!isDesktop ? "temporary" : "permanent"}
                    drawerSx={
                        !isDesktop ?
                            navigationDrawerStylesForXS :
                            navigationDrawerStylesForMD
                    }
                    isAuthenticated={isAutheticated()}
                    handleLogout={handleLogout}
                />
            </Box>
            <Box
                component="main"
                sx={
                    isDarkMode ?
                        mainContainerDarkModeStyles :
                        mainContainerStyles
                }
            >
                {children ? children : <Outlet />}
            </Box>
        </Box >
    );
}

export { DashboardTemplate };