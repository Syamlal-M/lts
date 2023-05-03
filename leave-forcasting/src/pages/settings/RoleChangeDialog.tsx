import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import { settingAvatarStyles } from "components/layout/SettingsTemplate/SettingsTemplate.styles";

import {
  Dialog, DialogTitle, DialogContent, List, ListItem,
  ListItemAvatar, ListItemButton, ListItemText, Icon, IconButton
} from "components/shared-ui";
import { useSelectListContext } from 'context/SelectListContext';

export interface RoleChangeDialogProps {
  isOpen: boolean;
  selectedValue: any;
  onClose: (selectedValue: any, value: string) => void;
}

function RoleChangeDialog(props: RoleChangeDialogProps) {
  const { ROLES } = useSelectListContext();
  const userRoles = ROLES.slice(1).map(role => (role.value));

  const { onClose, selectedValue, isOpen } = props;

  const closeDialog = () => {
    onClose(selectedValue, '');
  };

  const listItemClick = (value: string) => {
    onClose(selectedValue, value);
  };

  return (

    <Dialog
      fullWidth
      maxWidth='sm'
      open={isOpen}
      onClose={closeDialog}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Change User Role
        <IconButton onClick={closeDialog}><Icon>close</Icon></IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <List sx={{ pt: 0 }}>
          {userRoles.map((userRole) => (
            <ListItem disableGutters key={userRole}>
              <ListItemButton onClick={() => listItemClick(userRole)}>
                <ListItemAvatar>
                  <Avatar sx={settingAvatarStyles}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={userRole} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}

export default RoleChangeDialog;