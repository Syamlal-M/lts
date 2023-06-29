import { Alert as MuiAlert, AlertProps as MuiAlertProps } from "@mui/material";

type AlertProps = MuiAlertProps;

const Alert = (props: AlertProps) => {
  const { ...rest } = props;

  return <MuiAlert {...rest} />;
};

export { Alert };
