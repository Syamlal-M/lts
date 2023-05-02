import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import { settingAvatarStyles } from "components/layout/SettingsTemplate/SettingsTemplate.styles";

import { Dialog, DialogTitle, DialogContent, List, ListItem,
        ListItemAvatar, ListItemButton, ListItemText, Icon, IconButton } from "components/shared-ui";

const userRoles = ['ADMIN', 'SUPER_ADMIN', 'TEAM_USER', 'USER'];


export interface RoleChangeDialogProps {
  isOpen: boolean;
  selectedValue: any;
  onClose: (selectedValue: any, value: string) => void;
}

function RoleChangeDialog(props: RoleChangeDialogProps) {
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
                      <ListItem disableGutters>
                        <ListItemButton onClick={() => listItemClick(userRole)} key={userRole}>
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