import {
    Popover as MuiPopover,
    PopoverProps as MuiPopoverProps
} from "@mui/material";

type PopoverProps = MuiPopoverProps;

const Popover = (props: PopoverProps) => {
    const { ...rest } = props;

    return (
        <MuiPopover {...rest} />
    );
}

export { Popover };