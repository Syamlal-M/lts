import {
    LinearProgress as MuiLinearProgress,
    LinearProgressProps as MuiLinearProgressProps
} from "@mui/material";

type LinearProgressProps = MuiLinearProgressProps;

const LinearProgress = (props: LinearProgressProps) => {
    const { ...rest } = props;

    return (
        <MuiLinearProgress {...rest} />
    );
}

export { LinearProgress };