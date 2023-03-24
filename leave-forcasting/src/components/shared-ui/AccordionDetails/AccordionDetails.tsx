import {
    AccordionDetails as MuiAccordionDetails,
    AccordionDetailsProps as MuiAccordionDetailsProps
} from "@mui/material";

type AccordionDetailsProps = MuiAccordionDetailsProps;

const AccordionDetails = (props: AccordionDetailsProps) => {
    const { ...rest } = props;

    return (
        <MuiAccordionDetails {...rest} />
    );
}

export { AccordionDetails };