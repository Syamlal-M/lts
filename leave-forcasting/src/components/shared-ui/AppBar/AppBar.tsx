import { AppBar as MuiAppBar, AppBarProps as MuiAppBarProps } from "@mui/material";

type AppBarProps = MuiAppBarProps;

const AppBar = (props: AppBarProps) => {
  const { ...rest } = props;

  return <MuiAppBar {...rest} />;
};

export { AppBar };
