import { Toolbar as MuiToolbar, ToolbarProps as MuiToolbarProps } from "@mui/material";

type ToolbarProps = MuiToolbarProps;

const Toolbar = (props: ToolbarProps) => {
  const { ...rest } = props;

  return <MuiToolbar {...rest} />;
};
export { Toolbar };
