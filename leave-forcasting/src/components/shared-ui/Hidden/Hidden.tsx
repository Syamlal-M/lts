import { Hidden as MuiHidden, HiddenProps as MuiHiddenProps } from "@mui/material";

type HiddenProps = MuiHiddenProps;

const Hidden = (props: HiddenProps) => {
  const { ...rest } = props;

  return <MuiHidden {...rest} />;
};

export { Hidden };
