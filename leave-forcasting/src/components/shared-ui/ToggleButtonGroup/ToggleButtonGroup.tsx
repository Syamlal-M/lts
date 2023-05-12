import {
    ToggleButtonGroup as MuiToggleButtonGroup,
    ToggleButtonGroupProps as MuiToggleButtonGroupProps
} from "@mui/material";

type ToggleButtonGroupProps = MuiToggleButtonGroupProps;

const ToggleButtonGroup = (props: ToggleButtonGroupProps) => {
    const { ...rest } = props;

    return (
        <MuiToggleButtonGroup {...rest} />
    );
}

export { ToggleButtonGroup };