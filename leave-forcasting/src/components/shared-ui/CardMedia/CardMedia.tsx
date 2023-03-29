import {
    CardMedia as MuiCardMedia,
    CardMediaProps as MuiCardMediaProps
} from "@mui/material";

type CardMediaProps = MuiCardMediaProps;

const CardMedia = (props: CardMediaProps) => {
    const { ...rest } = props;

    return (
        <MuiCardMedia {...rest} />
    );
}

export { CardMedia };