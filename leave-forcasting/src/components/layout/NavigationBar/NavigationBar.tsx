import { AppBar, Icon, IconButton, Toolbar, Typography } from "components/shared-ui";

interface NavigationBarProps {
    onMenuClick?: () => void
}

const NavigationBar = (props: NavigationBarProps) => {
    const { onMenuClick } = props;

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
                <IconButton
                    color="inherit"
                    aria-label="open left-hand navigation drawer"
                    onClick={onMenuClick}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <Icon>menu</Icon>
                </IconButton>
                <Typography variant="h5" color="common.white" noWrap>Leave Tracker System</Typography>
            </Toolbar>
        </AppBar>
    );
}

export { NavigationBar };