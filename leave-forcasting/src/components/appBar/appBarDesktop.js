import {
  ListItemButton,
  ListItemText,
} from "@mui/material";
import {
  AppbarContainer,
  AppbarHeader,
  MyList,
} from "../../styles/appbar";
import Actions from "./actions";
import { useUIContext } from "../../context/ui";

export default function AppbarDesktop({ matches }) {
  const { setShowSearchBox } = useUIContext();

  return (
    <AppbarContainer>
      <AppbarHeader variant="h4">Leave Forcast System</AppbarHeader>
      <MyList type="row">
        <ListItemText primary="Planning" />
        <ListItemText primary="Home" />
        <ListItemText primary="Reports" />
        <ListItemText primary="Roles" />
        <ListItemButton onClick={() => setShowSearchBox(true)}>
        </ListItemButton>
          </MyList>
       <Actions matches={matches} />
    </AppbarContainer>
  );
}