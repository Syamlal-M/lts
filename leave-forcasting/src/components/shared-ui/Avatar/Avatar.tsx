import { Avatar as MuiAvatar, AvatarProps as MuiAvatarProps } from "@mui/material";

type AvatarProps = MuiAvatarProps;

const Avatar = (props: AvatarProps) => {
  const { ...rest } = props;

  return <MuiAvatar {...rest} />;
};

export { Avatar };
