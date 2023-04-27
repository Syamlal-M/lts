import { NavigationList } from "types/NavigationList";

const NavigationMenuList: NavigationList = [
	{
		"id": 1,
		"urlPath": "/leave-forecast",
		"label": "Home",
		"icon": "home",
		"permission": "LEAVE_FORCAST",
	},
	{
		"id": 2,
		"urlPath": "/employee-info",
		"label": "Employee Info",
		"icon": "date_range",
		"permission": "EMPLOYEE_SUMMARY"
	},
	{
		"id": 3,
		"urlPath": "/reports",
		"label": "Reports",
		"icon": "assignment_icon",
		"permission": "LEAVE_REPORT"
	},
	{
		"id": 4,
		"urlPath": "/settings",
		"label": "Roles",
		"icon": "account_circle",
		"permission": "EMPLOYEE_MANAGEMENT"
	}
];

export default NavigationMenuList;
