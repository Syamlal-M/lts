import { IconButton as MuiIconButton, IconButtonProps as MuiIconButtonProps } from "@mui/material";

type IconButtonProps = MuiIconButtonProps;

const IconButton = (props: IconButtonProps) => {
  const { ...rest } = props;

  return <MuiIconButton {...rest} />;
};

export { IconButton };
