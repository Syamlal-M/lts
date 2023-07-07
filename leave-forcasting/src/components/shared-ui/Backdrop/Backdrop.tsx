import { Backdrop as MuiBackdrop, BackdropProps as MuiBackdropProps } from "@mui/material";

type BackdropProps = MuiBackdropProps;

const Backdrop = (props: BackdropProps) => {
  const { ...rest } = props;

  return <MuiBackdrop {...rest} />;
};

export { Backdrop };
