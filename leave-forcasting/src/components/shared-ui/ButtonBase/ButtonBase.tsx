import { ButtonBase as MuiButtonBase, ButtonBaseProps as MuiButtonBaseProps } from "@mui/material";

type ButtonBaseProps = MuiButtonBaseProps;

const ButtonBase = (props: ButtonBaseProps) => {
  const { ...rest } = props;

  return <MuiButtonBase {...rest} />;
};

export { ButtonBase };
