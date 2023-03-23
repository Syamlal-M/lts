import {
    Box as MuiBox,
    BoxProps as MuiBoxProps
} from "@mui/material";

type BoxProps = MuiBoxProps;

const Box = (props: BoxProps) => {
    const { ...rest } = props;

    return (
        <MuiBox {...rest} />
    );
}

export { Box };