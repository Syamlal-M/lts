import {
    FormControlLabel as MuiFormControlLabel,
    FormControlLabelProps as MuiFormControlLabelProps
} from "@mui/material";

type FormControlLabelProps = MuiFormControlLabelProps;

const FormControlLabel = (props: FormControlLabelProps) => {
    const { ...rest } = props;

    return (
        <MuiFormControlLabel {...rest} />
    );
}

export { FormControlLabel };