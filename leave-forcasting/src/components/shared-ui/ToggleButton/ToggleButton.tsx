import {
  ToggleButton as MuiToggleButton,
  ToggleButtonProps as MuiToggleButtonProps
} from "@mui/material";

type ToggleButtonProps = MuiToggleButtonProps;

const ToggleButton = (props: ToggleButtonProps) => {
  const { ...rest } = props;

  return <MuiToggleButton {...rest} />;
};

export { ToggleButton };
