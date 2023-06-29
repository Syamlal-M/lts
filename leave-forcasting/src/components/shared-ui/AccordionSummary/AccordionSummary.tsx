import {
  AccordionSummary as MuiAccordionSummary,
  AccordionSummaryProps as MuiAccordionSummaryProps
} from "@mui/material";

type AccordionSummaryProps = MuiAccordionSummaryProps;

const AccordionSummary = (props: AccordionSummaryProps) => {
  const { ...rest } = props;

  return <MuiAccordionSummary {...rest} />;
};

export { AccordionSummary };
