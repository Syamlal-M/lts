export type LeaveForecastInfo = {
  id: string;
  employeeId: string;
  employeeName: string;
  organizationName: string;
  teamName: string;
  week_1: number;
  week_1_leaveDates?: string;
  week_2: number;
  week_2_leaveDates?: string;
  week_3: number;
  week_3_leaveDates?: string;
  week_4: number;
  week_4_leaveDates?: string;
  week_5: number;
  week_5_leaveDates?: string;
};
