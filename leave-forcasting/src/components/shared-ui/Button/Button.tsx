import { Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material";

type ButtonProps = MuiButtonProps;

const Button = (props: ButtonProps) => {
  const { ...rest } = props;

  return <MuiButton {...rest} />;
};

export { Button };
