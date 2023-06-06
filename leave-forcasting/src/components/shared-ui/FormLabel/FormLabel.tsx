import {
    FormLabel as MuiFormLabel,
    FormLabelProps as MuiFormLabelProps
} from "@mui/material";

type FormLabelProps = MuiFormLabelProps;

const FormLabel = (props: FormLabelProps) => {
    const { ...rest } = props;

    return (
        <MuiFormLabel {...rest} />
    );
}

export { FormLabel };