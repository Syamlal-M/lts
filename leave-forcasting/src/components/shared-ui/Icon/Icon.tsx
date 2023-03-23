import {
    Icon as MuiIcon,
    IconProps as MuiIconProps
} from "@mui/material";

type IconProps = MuiIconProps;

const Icon = (props: IconProps) => {
    const { ...rest } = props;

    return (
        <MuiIcon {...rest} />
    );
}

export { Icon };