import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";

type LinkProps = MuiLinkProps;

const Link = (props: LinkProps) => {
  const { ...rest } = props;

  return <MuiLink {...rest} />;
};
export { Link };
