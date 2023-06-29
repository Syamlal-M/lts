import { Badge as MuiBadge, BadgeProps as MuiBadgeProps } from "@mui/material";

type BadgeProps = MuiBadgeProps;

const Badge = (props: BadgeProps) => {
  const { ...rest } = props;

  return <MuiBadge {...rest} />;
};

export { Badge };
