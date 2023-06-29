import {
  AvatarGroup as MuiAvatarGroup,
  AvatarGroupProps as MuiAvatarGroupProps
} from "@mui/material";

type AvatarGroupProps = MuiAvatarGroupProps;

const AvatarGroup = (props: AvatarGroupProps) => {
  const { ...rest } = props;

  return <MuiAvatarGroup {...rest} />;
};

export { AvatarGroup };
