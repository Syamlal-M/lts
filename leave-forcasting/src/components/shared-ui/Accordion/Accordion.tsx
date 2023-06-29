import { Accordion as MuiAccordion, AccordionProps as MuiAccordionProps } from "@mui/material";

type AccordionProps = MuiAccordionProps;

const Accordion = (props: AccordionProps) => {
  const { ...rest } = props;

  return <MuiAccordion {...rest} />;
};

export { Accordion };
