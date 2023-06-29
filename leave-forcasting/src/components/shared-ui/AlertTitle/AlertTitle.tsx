import { AlertTitle as MuiAlertTitle, AlertTitleProps as MuiAlertTitleProps } from "@mui/material";

type AlertTitleProps = MuiAlertTitleProps;

const AlertTitle = (props: AlertTitleProps) => {
  const { ...rest } = props;

  return <MuiAlertTitle {...rest} />;
};

export { AlertTitle };
