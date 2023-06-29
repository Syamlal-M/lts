import {
  DialogContentText as MuiDialogContentText,
  DialogContentTextProps as MuiDialogContentTextProps
} from "@mui/material";

type DialogContentTextProps = MuiDialogContentTextProps;

const DialogContentText = (props: DialogContentTextProps) => {
  const { ...rest } = props;

  return <MuiDialogContentText {...rest} />;
};

export { DialogContentText };
