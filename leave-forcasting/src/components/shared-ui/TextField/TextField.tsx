import {
    TextField as MuiTextField,
    TextFieldProps as MuiTextFieldProps
} from "@mui/material"

type TextFieldProps = MuiTextFieldProps;

const TextField = (props: TextFieldProps) => {
    const { ...rest } = props;

    return (
        <MuiTextField {...rest} />
    );
}

export { TextField };