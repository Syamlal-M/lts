import {
    DialogTitle as MuiDialogTitle,
    DialogTitleProps as MuiDialogTitleProps
} from "@mui/material";

type DialogTitleProps = MuiDialogTitleProps;

const DialogTitle = (props: DialogTitleProps) => {
    const { ...rest } = props;

    return (
        <MuiDialogTitle {...rest} />
    );
}

export { DialogTitle };