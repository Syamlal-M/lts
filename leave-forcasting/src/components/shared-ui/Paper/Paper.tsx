import { Paper as MuiPaper, PaperProps as MuiPaperProps } from "@mui/material";

type PaperProps = MuiPaperProps;

const Paper = (props: PaperProps) => {
  const { ...rest } = props;

  return <MuiPaper {...rest} />;
};

export { Paper };
