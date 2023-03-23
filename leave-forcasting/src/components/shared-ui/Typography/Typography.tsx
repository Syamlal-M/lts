import {
    Typography as MuiTypography,
    TypographyProps as MuiTypographyProps
} from "@mui/material";

type TypographyProps = MuiTypographyProps;

const Typography = (props: TypographyProps) => {
    const { ...rest } = props;

    return (
        <MuiTypography {...rest} />
    )
}

export { Typography };

