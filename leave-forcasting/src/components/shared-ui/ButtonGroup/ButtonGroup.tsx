import {
  ButtonGroup as MuiButtonGroup,
  ButtonGroupProps as MuiButtonGroupProps
} from "@mui/material";

type ButtonGroupProps = MuiButtonGroupProps;

const ButtonGroup = (props: ButtonGroupProps) => {
  const { ...rest } = props;

  return <MuiButtonGroup {...rest} />;
};

export { ButtonGroup };
