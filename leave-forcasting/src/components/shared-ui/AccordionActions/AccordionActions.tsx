import {
  AccordionActions as MuiAccordionActions,
  AccordionActionsProps as MuiAccordionActionsProps
} from "@mui/material";

type AccordionActionsProps = MuiAccordionActionsProps;

const AccordionActions = (props: AccordionActionsProps) => {
  const { ...rest } = props;

  return <MuiAccordionActions {...rest} />;
};

export { AccordionActions };
