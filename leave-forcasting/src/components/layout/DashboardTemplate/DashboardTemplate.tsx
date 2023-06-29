import { Outlet } from "react-router-dom";
import { Box } from "components/shared-ui";
import { isAutheticated } from "utils/ApiUtils";
import { useAuthContext } from "context/AuthContext";
import { useThemeContext } from "context/ThemeContext";
import { useMediaQuery, useTheme } from "@mui/material";
import NavigationMenuList from "data/NavigationMenuList";
import NavigationBar from "components/layout/NavigationBar";
import { useNavigationContext } from "context/NavigationContext";
import LeftHandNavigation from "components/layout/LeftHandNavigation";
import {
  mainContainerDarkModeStyles,
  mainContainerStyles,
  navigationDrawerStylesForMD,
  navigationDrawerStylesForXS,
  sideNavigationStyles
} from "./DashboardTemplate.styles";

interface TemplatePageProps {
  children?: React.ReactNode;
}

function DashboardTemplate({ children }: TemplatePageProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const { isDarkMode } = useThemeContext();
  const { onLogout } = useAuthContext();

  const { isNavDrawerOpened, toggleNavDrawerOpened } = useNavigationContext();
  const navigationList = NavigationMenuList;

  const handleLogout = async () => {
    await onLogout();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <NavigationBar
        onMenuClick={toggleNavDrawerOpened}
        isAuthenticated={isAutheticated()}
        onLogout={handleLogout}
      />
      <Box component="aside" sx={sideNavigationStyles}>
        <LeftHandNavigation
          open={isNavDrawerOpened}
          onClose={toggleNavDrawerOpened}
          navigationList={navigationList}
          variant={!isDesktop ? "temporary" : "permanent"}
          drawerSx={!isDesktop ? navigationDrawerStylesForXS : navigationDrawerStylesForMD}
          isAuthenticated={isAutheticated()}
          onLogout={handleLogout}
        />
      </Box>
      <Box component="main" sx={isDarkMode ? mainContainerDarkModeStyles : mainContainerStyles}>
        {children ? children : <Outlet />}
      </Box>
    </Box>
  );
}

export { DashboardTemplate };
