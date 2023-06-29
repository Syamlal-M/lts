import { Container as MuiContainer, ContainerProps as MuiContainerProps } from "@mui/material";

type ContainerProps = MuiContainerProps;

const Container = (props: ContainerProps) => {
  const { ...rest } = props;

  return <MuiContainer {...rest} />;
};

export { Container };
