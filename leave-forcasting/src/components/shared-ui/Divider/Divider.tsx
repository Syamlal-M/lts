import { Divider as MuiDivider, DividerProps as MuiDividerProps } from "@mui/material";

type DividerProps = MuiDividerProps;

const Divider = (props: DividerProps) => {
  const { ...rest } = props;

  return <MuiDivider {...rest} />;
};

export { Divider };
