import {
    CardActionArea as MuiCardActionArea,
    CardActionAreaProps as MuiCardActionAreaProps
} from "@mui/material";

type CardActionAreaProps = MuiCardActionAreaProps;

const CardActionArea = (props: CardActionAreaProps) => {
    const { ...rest } = props;

    return (
        <MuiCardActionArea {...rest} />
    );
}

export { CardActionArea };