import { Fab as MuiFab, FabProps as MuiFabProps } from "@mui/material";

type FabProps = MuiFabProps;

const Fab = (props: FabProps) => {
  const { ...rest } = props;

  return <MuiFab {...rest} />;
};

export { Fab };
