import { Permission } from "./Route";

export type NavigationListItem = {
  id: number;
  urlPath: string;
  label: string;
  icon: string;
  permission: Permission;
};

export type NavigationList = NavigationListItem[];
