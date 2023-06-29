import {
  CircularProgress as MuiCircularProgress,
  CircularProgressProps as MuiCircularProgressProps
} from "@mui/material";

type CircularProgressProps = MuiCircularProgressProps;

const CircularProgress = (props: CircularProgressProps) => {
  const { ...rest } = props;

  return <MuiCircularProgress {...rest} />;
};

export { CircularProgress };
