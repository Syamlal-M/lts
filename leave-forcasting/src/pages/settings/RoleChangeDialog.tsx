import COLOR from "styles/Color";
import { capitalize } from "utils/StringUtils";
import { useSelectListContext } from "context/SelectListContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Icon,
  IconButton,
  Avatar
} from "components/shared-ui";

export interface RoleChangeDialogProps {
  isOpen: boolean;
  selectedValue: any;
  onClose: (selectedValue: any, value: string) => void;
}

function RoleChangeDialog(props: RoleChangeDialogProps) {
  const { ROLES } = useSelectListContext();
  const userRoles = ROLES.slice(1).map((role) => ({
    ...role,
    label: capitalize(role.value.split("_").join(" "))
  }));

  const { onClose, selectedValue, isOpen } = props;

  const closeDialog = () => {
    onClose(selectedValue, "");
  };

  const listItemClick = (value: string) => {
    onClose(selectedValue, value);
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={closeDialog}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        Change User Role
        <IconButton onClick={closeDialog}>
          <Icon>close</Icon>
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <List sx={{ pt: 0 }}>
          {userRoles.map((userRole) => (
            <ListItem disableGutters key={userRole.value}>
              <ListItemButton onClick={() => listItemClick(userRole.value)}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: COLOR.blue[100], color: COLOR.blue[600] }}>
                    <Icon>person</Icon>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={userRole.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}

export default RoleChangeDialog;
