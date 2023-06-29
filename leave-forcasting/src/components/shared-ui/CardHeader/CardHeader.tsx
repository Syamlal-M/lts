import { CardHeader as MuiCardHeader, CardHeaderProps as MuiCardHeaderProps } from "@mui/material";

type CardHeaderProps = MuiCardHeaderProps;

const CardHeader = (props: CardHeaderProps) => {
  const { ...rest } = props;

  return <MuiCardHeader {...rest} />;
};

export { CardHeader };
