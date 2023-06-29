import {
  CardContent as MuiCardContent,
  CardContentProps as MuiCardContentProps
} from "@mui/material";

type CardContentProps = MuiCardContentProps;

const CardContent = (props: CardContentProps) => {
  const { ...rest } = props;

  return <MuiCardContent {...rest} />;
};

export { CardContent };
