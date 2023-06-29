import { Popper as MuiPopper, PopperProps as MuiPopperProps } from "@mui/material";

type PopperProps = MuiPopperProps;

const Popper = (props: PopperProps) => {
  const { ...rest } = props;

  return <MuiPopper {...rest} />;
};

export { Popper };
