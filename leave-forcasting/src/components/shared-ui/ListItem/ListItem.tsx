import { ListItem as MuiListItem, ListItemProps as MuiListItemProps } from "@mui/material";

type ListItemProps = MuiListItemProps;

const ListItem = (props: ListItemProps) => {
  const { ...rest } = props;

  return <MuiListItem {...rest} />;
};
export { ListItem };
