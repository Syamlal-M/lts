import { Tooltip as MuiTooltip, TooltipProps as MuiTooltipProps } from "@mui/material";

type TooltipProps = MuiTooltipProps;

const Tooltip = (props: TooltipProps) => {
  const { ...rest } = props;

  return <MuiTooltip {...rest} />;
};
export { Tooltip };
