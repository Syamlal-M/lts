import { Card as MuiCard, CardProps as MuiCardProps } from "@mui/material";

type CardProps = MuiCardProps;

const Card = (props: CardProps) => {
  const { ...rest } = props;

  return <MuiCard {...rest} />;
};

export { Card };
