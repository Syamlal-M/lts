import {
    Switch as MuiSwitch,
    SwitchProps as MuiSwitchProps
} from "@mui/material";

type SwitchProps = MuiSwitchProps;

const Switch = (props: SwitchProps) => {
    const { ...rest } = props;

    return (
        <MuiSwitch {...rest} />
    );
}

export { Switch };