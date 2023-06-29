import {
  DialogContent as MuiDialogContent,
  DialogContentProps as MuiDialogContentProps
} from "@mui/material";

type DialogContentProps = MuiDialogContentProps;

const DialogContent = (props: DialogContentProps) => {
  const { ...rest } = props;

  return <MuiDialogContent {...rest} />;
};

export { DialogContent };
