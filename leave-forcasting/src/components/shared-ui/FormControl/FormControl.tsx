import {
  FormControl as MuiFormControl,
  FormControlProps as MuiFormControlProps
} from "@mui/material";

type FormControlProps = MuiFormControlProps;

const FormControl = (props: FormControlProps) => {
  const { ...rest } = props;

  return <MuiFormControl {...rest} />;
};

export { FormControl };
