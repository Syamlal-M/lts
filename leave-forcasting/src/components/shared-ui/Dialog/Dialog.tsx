import { Dialog as MuiDialog, DialogProps as MuiDialogProps } from "@mui/material";

type DialogProps = MuiDialogProps;

const Dialog = (props: DialogProps) => {
  const { ...rest } = props;

  return <MuiDialog {...rest} />;
};

export { Dialog };
