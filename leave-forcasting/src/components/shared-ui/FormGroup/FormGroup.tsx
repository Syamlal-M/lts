import {
    FormGroup as MuiFormGroup,
    FormGroupProps as MuiFormGroupProps
} from "@mui/material";

type FormGroupProps = MuiFormGroupProps;

const FormGroup = (props: FormGroupProps) => {
    const { ...rest } = props;

    return (
        <MuiFormGroup {...rest} />
    );
}

export { FormGroup };