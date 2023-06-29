import {
  CssBaseline as MuiCssBaseline,
  CssBaselineProps as MuiCssBaselineProps
} from "@mui/material";

type CssBaselineProps = MuiCssBaselineProps;

const CssBaseline = (props: CssBaselineProps) => {
  const { ...rest } = props;

  return <MuiCssBaseline {...rest} />;
};

export { CssBaseline };
