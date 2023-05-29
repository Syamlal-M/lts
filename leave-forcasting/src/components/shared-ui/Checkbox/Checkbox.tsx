import {
    Checkbox as MuiCheckbox,
    CheckboxProps as MuiCheckboxProps
} from "@mui/material";

type CheckboxProps = MuiCheckboxProps;

const Checkbox = (props: CheckboxProps) => {
    const { ...rest } = props;

    return (
        <MuiCheckbox {...rest} />
    );
}

export { Checkbox };