import { Grid as MuiGrid, GridProps as MuiGridProps } from "@mui/material";

type GridProps = MuiGridProps;

const Grid = (props: GridProps) => {
  const { ...rest } = props;

  return <MuiGrid {...rest} />;
};

export { Grid };
