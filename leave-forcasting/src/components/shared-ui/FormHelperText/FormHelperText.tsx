import {
  FormHelperText as MuiFormHelperText,
  FormHelperTextProps as MuiFormHelperTextProps
} from "@mui/material";

type FormHelperTextProps = MuiFormHelperTextProps;

const FormHelperText = (props: FormHelperTextProps) => {
  const { ...rest } = props;

  return <MuiFormHelperText {...rest} />;
};

export { FormHelperText };
